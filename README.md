# Foundry VTT Types

Unofficial TypeScript declarations for Foundry Virtual Tabletop module development.

This package is generated from a local Foundry VTT installation. It is not published by, endorsed by, or affiliated with Foundry Gaming LLC.

## Install From GitHub

This installs the current default branch:

```sh
npm install --save-dev github:686d7066/fvtt-types
```

To install a specific generated version, pin the matching Git tag:

```sh
npm install --save-dev github:686d7066/fvtt-types#14.370.1
```

Available generated versions are listed on the repository's GitHub tags page:
`https://github.com/686d7066/fvtt-types/tags`.

Then add the package to your module project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["fvtt-types"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

## Generate Types

Generating declarations requires an existing local Foundry VTT installation. Set `foundryApp` in
`foundry-types.config` to that installation's application `resources/app` directory, then run:

```sh
npm install
npm run build
```

Example config:

```ini
foundryApp=F:\Path\To\FoundryVTT\App\resources\app
```

You can override the config path with `FOUNDRY_VTT_APP`:

```powershell
$env:FOUNDRY_VTT_APP = "F:\Path\To\FoundryVTT\App\resources\app"
npm run build
```

The generated package entry point is `dist/index.d.ts`.

## Release Workflow

The Foundry VTT client is required to generate declarations, but it is not committed to this
repository. Releases are therefore generated locally and committed as package output:

1. Install the target Foundry VTT version locally.
2. Update `package.json` to the matching Foundry version.
3. Run `npm run build`.
4. Commit the updated `dist` folder, dependency files, and version change.
5. Merge the change to `main`.

The GitHub workflow reads `package.json.version` on `main` and creates a matching Git tag if it
does not already exist. For example, version `14.370.1` is tagged as `14.370.1`.

## Notes

- The package is intended for type-checking Foundry modules. It does not provide any runtime code.
- The generated declarations reflect the local Foundry build used at generation time.
- External runtime libraries used by Foundry, such as `pixi.js`, are installed as dependencies of this package.

## License And Attribution

Foundry Virtual Tabletop is a copyright of Foundry Gaming LLC.

This repository contains types meant to help with local Foundry Virtual Tabletop module development.
Generated declaration files are created from a licensed local Foundry VTT installation.

No affiliation with, endorsement from, or ownership by Foundry Gaming LLC is implied.

Feel free to use the provided types within the limits of what the Foundry Virtual Tabletop license allows.

Code not affiliated directly with Foundry Virtual Tabletop in this repo is provided under the MIT license.
