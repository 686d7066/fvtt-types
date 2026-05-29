import {spawnSync} from "node:child_process";
import {readFileSync} from "node:fs";

type PackageJson = {
  version?: string;
};

function readPackageVersion(): string {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as PackageJson;
  const version = packageJson.version;

  if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`package.json version '${String(version)}' must use x.y.z with numeric parts.`);
  }

  return version;
}

function runGit(args: string[], options: {allowFailure?: boolean} = {}): string {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  if (result.status !== 0 && !options.allowFailure) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    throw new Error(`git ${args.join(" ")} failed with exit code ${String(result.status)}.`);
  }

  return result.stdout;
}

try {
  const version = readPackageVersion();
  const existingTag = runGit(["rev-parse", `refs/tags/${version}`], {allowFailure: true});

  if (existingTag.trim()) {
    console.log(`Tag ${version} already exists.`);
    process.exit(0);
  }

  runGit(["config", "user.name", "github-actions[bot]"]);
  runGit(["config", "user.email", "github-actions[bot]@users.noreply.github.com"]);
  runGit(["tag", version]);
  runGit(["push", "origin", version]);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
