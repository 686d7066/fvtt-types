import {existsSync, readFileSync, readdirSync, statSync, writeFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";

type DependencyMap = Record<string, string>;

type FoundryPackage = {
  version?: string;
  dependencies?: DependencyMap;
};

type PackageJson = {
  version?: string;
  dependencies?: DependencyMap;
  peerDependenciesMeta?: Record<string, unknown>;
};

type GeneratorConfig = {
  foundryApp?: string;
};

// Mirror generate-types.ts config resolution so both scripts use the same
// Foundry app location and support the same environment override.
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = join(repoRoot, "package.json");
const distDir = join(repoRoot, "dist");
const configPath = join(repoRoot, "foundry-types.config");
const developmentConfigPath = join(repoRoot, "foundry-types.development.config");
const selectedConfigPath = existsSync(developmentConfigPath)
  ? developmentConfigPath
  : configPath;
const generatorConfig = existsSync(selectedConfigPath)
  ? readGeneratorConfig(selectedConfigPath)
  : {};
const configuredFoundryApp = process.env.FOUNDRY_VTT_APP ?? generatorConfig.foundryApp;

if (!configuredFoundryApp) {
  throw new Error(
    "Set FOUNDRY_VTT_APP or add foundryApp to foundry-types.development.config or foundry-types.config."
  );
}

const foundryPackagePath = join(resolve(configuredFoundryApp), "package.json");

if (!existsSync(foundryPackagePath)) {
  throw new Error(`Could not find Foundry package.json at ${foundryPackagePath}.`);
}

const foundryPackage = JSON.parse(readFileSync(foundryPackagePath, "utf8")) as FoundryPackage;
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageJson;

// Dependency versions are tied to the generated Foundry declarations. Refuse to
// sync from a different Foundry build so package.json and dist cannot diverge.
if (foundryPackage.version !== packageJson.version) {
  throw new Error(
    `Expected Foundry VTT ${String(packageJson.version)}, found ${String(foundryPackage.version)}.`
  );
}

const foundryDependencies = foundryPackage.dependencies ?? {};
const usedDependencies = findUsedDependencies(distDir, foundryDependencies, resolve(configuredFoundryApp));
const syncedDependencies: DependencyMap = {};

for (const dependency of usedDependencies) {
  const version = foundryDependencies[dependency] ?? readInstalledDependencyVersion(resolve(configuredFoundryApp), dependency);

  if (!version) {
    throw new Error(`Could not resolve Foundry dependency version for '${dependency}'.`);
  }

  syncedDependencies[dependency] = version;
}

// Runtime dependencies are derived from the generated declaration surface, so
// rewrite the block instead of keeping stale packages after Foundry changes.
packageJson.dependencies = sortDependencies(syncedDependencies);

// These packages are required for declaration checking, so they are real
// dependencies instead of optional peers.
delete packageJson.peerDependenciesMeta;

writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");

console.log(
  `Synced ${usedDependencies.length} dependency versions from Foundry VTT ${String(foundryPackage.version)}.`
);

function findUsedDependencies(root: string, foundryDependencies: DependencyMap, foundryApp: string): string[] {
  if (!existsSync(root)) {
    throw new Error(`Could not find generated declarations at ${root}. Run npm run generate first.`);
  }

  const files = findDeclarationFiles(root);
  const text = [
    ...files.map((file) => readFileSync(file, "utf8")),
    ...findSourceFilesForDeclarations(files, root, foundryApp).map((file) => readFileSync(file, "utf8"))
  ].join("\n");
  const dependencies = new Set<string>();

  // Generated declarations can contain real imports, dynamic import() types, and
  // preserved JSDoc @import comments. All three forms expose package names.
  for (const specifier of findModuleSpecifiers(text)) {
    const dependency = toPackageName(specifier);
    if (dependency) dependencies.add(dependency);
  }

  // Some Foundry globals are emitted as namespace references without an import,
  // for example jQuery. Infer those by matching identifiers in dist against the
  // direct dependencies declared by Foundry itself.
  const identifiers = findIdentifiers(stripStringLiterals(stripComments(text)));
  for (const dependency of Object.keys(foundryDependencies)) {
    if (dependencies.has(dependency)) continue;

    if (hasDependencyIdentifier(dependency, identifiers)) {
      dependencies.add(dependency);
    }
  }

  // If declarations import a transitive package directly, use the version from
  // Foundry's installed node_modules even when it is not a direct dependency.
  return [...dependencies]
    .filter((dependency) => Boolean(foundryDependencies[dependency] ?? readInstalledDependencyVersion(foundryApp, dependency)))
    .sort((left, right) => left.localeCompare(right));
}

function findSourceFilesForDeclarations(files: string[], root: string, foundryApp: string): string[] {
  const sourceFiles = new Set<string>();

  // Declaration emit can erase external module re-exports from JavaScript
  // sources. Read the matching Foundry source modules too, but only for files
  // that actually produced declarations in dist.
  for (const file of files) {
    const relativePath = file
      .slice(root.length + 1)
      .replaceAll("\\", "/")
      .replace(/\.d\.mts$/, ".mjs")
      .replace(/\.d\.ts$/, ".js");
    const sourceFile = join(foundryApp, ...relativePath.split("/"));

    if (existsSync(sourceFile)) sourceFiles.add(sourceFile);
  }

  return [...sourceFiles].sort((left, right) => left.localeCompare(right));
}

function findDeclarationFiles(root: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      files.push(...findDeclarationFiles(path));
      continue;
    }

    if (path.endsWith(".d.ts") || path.endsWith(".d.mts")) files.push(path);
  }

  return files;
}

function findModuleSpecifiers(text: string): string[] {
  const specifiers = new Set<string>();
  const patterns = [
    /\bfrom\s+["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /^\s*import\s+["']([^"']+)["']/gm,
    /@import\b[^\r\n]*?\bfrom\s+["']([^"']+)["']/g,
    /@import\b\s+["']([^"']+)["']/g
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      specifiers.add(match[1]);
    }
  }

  return [...specifiers];
}

function toPackageName(specifier: string): string | undefined {
  if (
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("#") ||
    specifier.startsWith("node:")
  ) {
    return undefined;
  }

  const parts = specifier.split("/");
  return specifier.startsWith("@")
    ? `${parts[0]}/${parts[1]}`
    : parts[0];
}

function stripComments(text: string): string {
  return text
    .replaceAll(/\/\*[\s\S]*?\*\//g, "")
    .replaceAll(/\/\/.*$/gm, "");
}

function stripStringLiterals(text: string): string {
  return text.replaceAll(/(["'])(?:\\.|(?!\1).)*\1/g, "\"\"");
}

function findIdentifiers(text: string): Set<string> {
  const identifiers = new Set<string>();

  for (const match of text.matchAll(/\b[A-Za-z_$][\w$]*\b/g)) {
    // Bare lowercase identifiers are often ordinary property names like
    // "basis" or "compression"; require a nominal-looking identifier for
    // package inference unless the package was found through an import.
    if (/[A-Z]/.test(match[0])) identifiers.add(normalizeIdentifier(match[0]));
  }

  return identifiers;
}

function hasDependencyIdentifier(dependency: string, identifiers: Set<string>): boolean {
  for (const alias of getDependencyAliases(dependency)) {
    if (identifiers.has(alias)) return true;
  }

  return false;
}

function getDependencyAliases(dependency: string): string[] {
  const unscoped = dependency.startsWith("@")
    ? dependency.split("/").slice(1).join("/")
    : dependency;

  // Dotted package names like socket.io are too easy to confuse with local
  // import aliases such as SocketIO. Require an explicit import for those.
  if (unscoped.includes(".")) return [];

  const finalSegment = unscoped.split(/[/.]/).at(-1) ?? unscoped;
  const aliases = new Set([normalizeIdentifier(unscoped)]);

  // Avoid very short suffixes such as socket.io -> io, which would over-match
  // unrelated namespace aliases in declaration files.
  if (finalSegment.length > 2) aliases.add(normalizeIdentifier(finalSegment));

  return [...aliases];
}

function normalizeIdentifier(value: string): string {
  return value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}

function readInstalledDependencyVersion(foundryApp: string, dependency: string): string | undefined {
  const packageJsonPath = join(foundryApp, "node_modules", ...dependency.split("/"), "package.json");

  if (!existsSync(packageJsonPath)) return undefined;

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {version?: string};
  return packageJson.version;
}

function sortDependencies(dependencies: DependencyMap): DependencyMap {
  return Object.fromEntries(
    Object.entries(dependencies).sort(([left], [right]) => left.localeCompare(right))
  );
}

function readGeneratorConfig(path: string): GeneratorConfig {
  const config: GeneratorConfig = {};

  // Parse the small key=value config format used by generate-types.ts.
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
