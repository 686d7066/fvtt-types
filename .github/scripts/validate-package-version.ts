import {spawnSync} from "node:child_process";
import {readFileSync} from "node:fs";

type PackageJson = {
  version?: string;
};

function readCurrentPackageVersion(): string {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as PackageJson;
  return validateVersion(packageJson.version, "package.json version");
}

function validateVersion(version: unknown, label: string): string {
  if (typeof version !== "string" || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`${label} '${String(version)}' must use x.y.z with numeric parts.`);
  }

  return version;
}

function isVersionGreater(current: string, base: string): boolean {
  const currentParts = current.split(".").map(Number);
  const baseParts = base.split(".").map(Number);

  return (
    currentParts[0] > baseParts[0] ||
    (currentParts[0] === baseParts[0] && currentParts[1] > baseParts[1]) ||
    (currentParts[0] === baseParts[0] &&
      currentParts[1] === baseParts[1] &&
      currentParts[2] > baseParts[2])
  );
}

function runGit(args: string[], options: {allowFailure?: boolean} = {}): {stdout: string; status: number | null} {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  if (result.status !== 0 && !options.allowFailure) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    throw new Error(`git ${args.join(" ")} failed with exit code ${String(result.status)}.`);
  }

  return {
    stdout: result.stdout,
    status: result.status
  };
}

try {
  const baseBranch = process.env.GITHUB_BASE_REF;
  const current = readCurrentPackageVersion();

  if (!baseBranch) {
    console.log(`No base ref found. Current package.json version '${current}' is valid.`);
    process.exit(0);
  }

  const fetch = runGit(
    ["fetch", "origin", `${baseBranch}:refs/remotes/origin/${baseBranch}`, "--depth=1"],
    {allowFailure: true}
  );

  if (fetch.status !== 0) {
    console.log(`Base branch '${baseBranch}' could not be fetched. Treating this as an initial PR.`);
    process.exit(0);
  }

  const baseRef = `origin/${baseBranch}`;
  const baseRefCheck = runGit(["rev-parse", "--verify", baseRef], {allowFailure: true});

  if (baseRefCheck.status !== 0) {
    console.log(`No base ref found. Current package.json version '${current}' is valid.`);
    process.exit(0);
  }

  const basePackageJson = runGit(["show", `${baseRef}:package.json`], {allowFailure: true});

  if (basePackageJson.status !== 0) {
    console.log(`No package.json found on base branch. Current package.json version '${current}' is valid.`);
    process.exit(0);
  }

  const basePackage = JSON.parse(basePackageJson.stdout) as PackageJson;
  const base = validateVersion(basePackage.version, "Base branch package.json version");

  if (!isVersionGreater(current, base)) {
    throw new Error(`package.json version must increase for every PR. Base: ${base}, current: ${current}.`);
  }

  console.log(`Version increased from ${base} to ${current}.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
