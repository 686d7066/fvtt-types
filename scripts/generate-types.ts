import {cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync} from "node:fs";
import {dirname, join, relative, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {spawnSync} from "node:child_process";
import {createRequire} from "node:module";

type FoundryPackage = {
  version?: string;
  release?: {
    generation?: number;
    build?: number;
    channel?: string;
  };
};

type PackageJson = {
  version?: string;
};

type FoundryTsconfig = {
  include?: string[];
  compilerOptions?: Record<string, unknown> & {
    paths?: Record<string, string[]>;
  };
};

type GeneratorConfig = {
  foundryApp?: string;
};

// Load CommonJS-only package entry points, then anchor every generated path to
// the repository root so the script works regardless of the caller's cwd.
const require = createRequire(import.meta.url);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Prefer a local development config when present, falling back to the checked-in
// config. Missing config files are allowed when FOUNDRY_VTT_APP is set.
const configPath = join(repoRoot, "foundry-types.config");
const developmentConfigPath = join(repoRoot, "foundry-types.development.config");
const selectedConfigPath = existsSync(developmentConfigPath)
  ? developmentConfigPath
  : configPath;
const generatorConfig = existsSync(selectedConfigPath)
  ? readGeneratorConfig(selectedConfigPath)
  : {};

// Resolve the Foundry app location from the environment first so temporary
// per-machine overrides do not have to be written into config files.
const configuredFoundryApp = process.env.FOUNDRY_VTT_APP ?? generatorConfig.foundryApp;

if (!configuredFoundryApp) {
  throw new Error(
    "Set FOUNDRY_VTT_APP or add foundryApp to foundry-types.development.config or foundry-types.config."
  );
}

// The path must point at Foundry's resources/app directory, which contains both
// the runtime package metadata and Foundry's own TypeScript configuration.
const foundryApp = resolve(configuredFoundryApp);
const foundryPackagePath = join(foundryApp, "package.json");
const foundryTsconfigPath = join(foundryApp, "tsconfig.json");

if (!existsSync(foundryPackagePath) || !existsSync(foundryTsconfigPath)) {
  throw new Error(
    `Could not find a Foundry VTT app at ${foundryApp}. Set FOUNDRY_VTT_APP to the resources/app directory.`
  );
}

// The generated package tracks exactly one Foundry version, so stop early if the
// configured app does not match this repository's package version.
const foundryPackage = JSON.parse(readFileSync(foundryPackagePath, "utf8")) as FoundryPackage;
const foundryTsconfig = JSON.parse(readFileSync(foundryTsconfigPath, "utf8")) as FoundryTsconfig;
const packageJson = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8")) as PackageJson;

if (foundryPackage.version !== packageJson.version) {
  throw new Error(
    `Expected Foundry VTT ${String(packageJson.version)}, found ${String(foundryPackage.version)} at ${foundryApp}.`
  );
}

// Build all output in a process-specific temporary work directory, then replace
// dist from scratch so stale declarations cannot survive between runs.
const workRoot = join(repoRoot, ".foundry-types-work");
const workDir = join(workRoot, `${String(process.pid)}-${String(Date.now())}`);
const emittedDir = join(workDir, "emitted");
const distDir = join(repoRoot, "dist");
const tempTsconfigPath = join(workDir, "tsconfig.foundry.json");

rmSync(distDir, {recursive: true, force: true});
mkdirSync(emittedDir, {recursive: true});
mkdirSync(distDir, {recursive: true});

// TypeScript config paths are written with forward slashes because tsconfig path
// patterns are more reliable across platforms in that form.
const foundryPath = foundryApp.replaceAll("\\", "/");
const emittedPath = emittedDir.replaceAll("\\", "/");
const foundryIncludes = foundryTsconfig.include ?? [];
const sourceRoots = findIncludedSourceRoots(foundryIncludes, foundryApp);
const globalDeclarationPaths = findIncludedGlobalDeclarations(foundryIncludes, foundryApp);
const aliasTargets = findAliasTargets(foundryTsconfig.compilerOptions?.paths ?? {});

// Emit declarations from Foundry's JavaScript and global declaration inputs.
// allowJs lets tsc read Foundry's .mjs files, emitDeclarationOnly prevents
// JavaScript output, rootDir preserves Foundry's folder layout, and includes
// plus alias paths are inherited from Foundry's own tsconfig.
const tempTsconfig = {
  include: foundryIncludes.map((include) => toAbsoluteTsconfigPattern(include, foundryPath)),
  compilerOptions: {
    ...foundryTsconfig.compilerOptions,
    declaration: true,
    emitDeclarationOnly: true,
    declarationMap: false,
    outDir: emittedPath,
    rootDir: foundryPath,
    types: [],
    baseUrl: foundryPath
  }
};

writeFileSync(tempTsconfigPath, `${JSON.stringify(tempTsconfig, null, 2)}\n`, "utf8");

// Run the local TypeScript compiler through the current Node executable so the
// generator uses this package's pinned dependency instead of a global tsc.
const tscBin = require.resolve("typescript/bin/tsc");
const emit = spawnSync(
  process.execPath,
  [
    tscBin,
    "-p",
    tempTsconfigPath
  ],
  {
    cwd: foundryApp,
    encoding: "utf8",
    stdio: "pipe"
  }
);

// Preserve compiler output on failure, then fail the generator instead of
// publishing a partial dist directory.
if (emit.status !== 0) {
  process.stderr.write(emit.stdout);
  process.stderr.write(emit.stderr);
  throw new Error(`TypeScript declaration emit failed with exit code ${String(emit.status)}.`);
}

// Copy only the Foundry source roots that were actually emitted.
for (const folder of sourceRoots) {
  const from = join(emittedDir, folder);
  if (existsSync(from)) cpSync(from, join(distDir, folder), {recursive: true});
}

// Preserve Foundry's ambient global declarations verbatim alongside the emitted
// module declarations because they are referenced by the package entry point.
for (const source of globalDeclarationPaths) {
  const target = join(distDir, relative(foundryApp, source));
  mkdirSync(dirname(target), {recursive: true});
  cpSync(source, target);
}

// Normalize emitted declarations so consumers can import them without Foundry's
// source aliases or TypeScript's private-name declaration artifacts leaking out.
postProcessDeclarations(distDir, aliasTargets);

// Publish one root entry point that exposes Foundry's global declarations and
// the module roots that exist in the generated output.
const index = buildIndex(sourceRoots, globalDeclarationPaths, foundryApp, distDir);

writeFileSync(join(distDir, "index.d.ts"), index, "utf8");

// Record the exact Foundry build information used for this generation run.
const metadata = {
  foundryVersion: foundryPackage.version,
  generation: foundryPackage.release?.generation,
  build: foundryPackage.release?.build,
  channel: foundryPackage.release?.channel,
  generatedAt: new Date().toISOString()
};

writeFileSync(join(distDir, "foundry-version.json"), `${JSON.stringify(metadata, null, 2)}\n`, "utf8");

console.log(`Generated Foundry VTT ${String(foundryPackage.version)} declarations in ${distDir}`);

function postProcessDeclarations(root: string, aliasTargets: Map<string, string>): void {
  // Walk the generated dist tree recursively because declarations are emitted in
  // the same nested folder structure as Foundry's source files.
  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      postProcessDeclarations(path, aliasTargets);
      continue;
    }

    // Only declaration files are rewritten; copied assets or metadata are left
    // untouched if they ever appear under dist.
    if (!path.endsWith(".d.mts") && !path.endsWith(".d.ts")) continue;

    const before = readFileSync(path, "utf8");
    const after = before
      // Private class names emitted from JavaScript cannot be named by package
      // consumers, so degrade those references to Function.
      .replaceAll(
        /typeof\s+[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\.__#\d+@#[A-Za-z_$][\w$]*/g,
        "Function"
      )
      // Some generated declarations contain an invalid "extends class" shape.
      // Replace it with a broad abstract constructor constraint.
      .replaceAll(/\bextends class\b/g, "extends abstract new (...args: any) => any")
      // Convert Foundry's internal path aliases to relative paths that work for
      // consumers of the published dist folder.
      .replaceAll(/(["'])@([^/"']+)\/([^"']+)\1/g, (match, quote: string, alias: string, target: string) => {
        const targetRoot = aliasTargets.get(alias);
        if (!targetRoot) return match;

        let rewritten = relative(dirname(path), join(distDir, targetRoot, target)).replaceAll("\\", "/");
        if (!rewritten.startsWith(".")) rewritten = `./${rewritten}`;
        return `${quote}${rewritten}${quote}`;
      });

    if (after !== before) writeFileSync(path, after, "utf8");
  }
}

function toAbsoluteTsconfigPattern(pattern: string, root: string): string {
  const normalized = pattern.replaceAll("\\", "/").replace(/^\.\//, "");
  if (normalized.startsWith("/") || /^[A-Za-z]:\//.test(normalized)) return normalized;
  return `${root}/${normalized}`;
}

function findIncludedSourceRoots(includes: string[], foundryApp: string): string[] {
  const roots = new Set<string>();

  // Foundry's include patterns determine which top-level source folders can
  // emit declarations. Missing folders are ignored because Foundry may carry
  // stale include patterns for older app layouts.
  for (const include of includes) {
    const root = include.replaceAll("\\", "/").replace(/^\.\//, "").split("/")[0];
    if (root && !root.includes("*") && existsSync(join(foundryApp, root))) roots.add(root);
  }

  return [...roots].sort((left, right) => left.localeCompare(right));
}

function findIncludedGlobalDeclarations(includes: string[], foundryApp: string): string[] {
  const globals = new Set<string>();

  // Global declarations are copied from the source app instead of the emitted
  // output so package consumers receive Foundry's ambient declarations exactly.
  for (const include of includes) {
    const normalized = include.replaceAll("\\", "/").replace(/^\.\//, "");
    if (normalized.includes("*") || !normalized.endsWith("global.d.mts")) continue;

    const path = join(foundryApp, normalized);
    if (existsSync(path)) globals.add(path);
  }

  return [...globals].sort((left, right) => left.localeCompare(right));
}

function findAliasTargets(paths: Record<string, string[]>): Map<string, string> {
  const aliases = new Map<string, string>();

  // Foundry uses aliases like @common/* -> ./common/*. Keep the alias name and
  // its target root so post-processing stays aligned with Foundry's tsconfig.
  for (const [aliasPattern, targetPatterns] of Object.entries(paths)) {
    const alias = aliasPattern.match(/^@([^/*]+)\/\*$/)?.[1];
    const target = targetPatterns[0]?.replaceAll("\\", "/").replace(/^\.\//, "").replace(/\/\*$/, "");

    if (alias && target) aliases.set(alias, target);
  }

  return aliases;
}

function buildIndex(sourceRoots: string[], globalDeclarationPaths: string[], foundryApp: string, distDir: string): string {
  const references = globalDeclarationPaths
    .map((path) => relative(distDir, join(distDir, relative(foundryApp, path))).replaceAll("\\", "/"))
    .map((path) => `/// <reference path="./${path}" />`);
  const exports = sourceRoots
    .filter((root) => existsSync(join(distDir, root, "_module.d.mts")))
    .map((root) => `export * as ${getRootExportName(root)} from "./${root}/_module.mjs";`);

  return `${[...references, "", ...exports].join("\n")}\n`;
}

function getRootExportName(root: string): string {
  if (root === "client") return "foundry";

  const suffix = root
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("");

  return `foundry${suffix}`;
}

function readGeneratorConfig(path: string): GeneratorConfig {
  const config: GeneratorConfig = {};

  // Parse the small key=value config format by ignoring blank lines and comments
  // and accepting only the keys this generator understands.
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();

    if (key === "foundryApp") config.foundryApp = value;
  }

  return config;
}
