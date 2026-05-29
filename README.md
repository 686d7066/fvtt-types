# Foundry VTT Types

Unofficial TypeScript declarations for Foundry Virtual Tabletop module development.

This package is generated from a local Foundry VTT installation. It is not published by, endorsed by, or affiliated with Foundry Gaming LLC.

## Install From GitHub

```sh
npm install --save-dev github:686d7066/FoundryVTT_Types
```

If your repository name differs, replace the GitHub spec with the actual owner and repository.

Then add the package to your module project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["foundry-vtt-types"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "skipLibCheck": true
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
4. Commit the updated `dist` folder and version change.
5. Merge the change to `main`.

The GitHub workflow reads `package.json.version` on `main` and creates a matching Git tag if it
does not already exist. For example, version `14.370.1` is tagged as `14.370.1`.

Users can install a specific generated version by pinning that tag:

```sh
npm install --save-dev github:686d7066/FoundryVTT_Types#14.370.1
```

## Notes

- The package is intended for type-checking Foundry modules. It does not provide any runtime code.
- The generated declarations reflect the local Foundry build used at generation time.
- External runtime libraries used by Foundry, such as `pixi.js`, are left as type imports where Foundry exposes them. Use `skipLibCheck` unless your module project also installs those library packages.
