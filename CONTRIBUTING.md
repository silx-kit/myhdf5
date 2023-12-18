# Contributing

- [Quick start](#quick-start-)
- [Development](#development)
  - [`pnpm` cheat sheet](#pnpm-cheat-sheet)
  - [Dependency management](#dependency-management)
    - [DefinitelyTyped packages](#definitelytyped-packages)
- [Build](#build)
- [Code quality](#sode-quality)
  - [Automatic fixing and formatting](#automatic-fixing-and-formatting)
  - [Editor integration](#editor-integration)
- [Deployment](#deployment)

## Quick start 🚀

```bash
pnpm install
pnpm start
```

## Development

- `pnpm start` - start myHDF5

### `pnpm` cheat sheet

- `pnpm install` - install dependencies
- `pnpm add [-D] <pkg-name>` - [add a dependency](https://pnpm.io/cli/add)
- `pnpm [run] <script> [--<arg>]` - run a script
- `pnpm [exec] <binary>` - run a binary located in `node_modules/.bin`
  (equivalent to `npx <pkg-name>` for a package installed in the workspace)
- `pnpm dlx <pkg-name>` - fetch a package from the registry and run its default
  command binary (equivalent to `npx <pkg-name>`)
- `pnpm why <pkg-name>` - show all packages that depend on the specified package
- `pnpm outdated` - list outdated dependencies
- `pnpm up -L <pkg-name>` - update a package to the latest version

### Dependency management

1. Run `pnpm outdated` to list dependencies that can be upgraded.
1. Read the changelogs and release notes of the dependencies you'd like to
   upgrade. Look for potential breaking changes, and for bug fixes and new
   features that may help improve the codebase.
1. Run `pnpm up -L <pkg-name>` to upgrade a dependency to the latest version.
   Alternatively, you can also edit `package.json` manually and run
   `pnpm install` (but make sure to specify an exact dependency version rather
   than a range – i.e. don't prefix the version with a caret or a tilde).

> If you run into peer dependency warnings and other package resolution issues,
> note that `pnpm` offers numerous solutions for dealing with them, like
> [`pnpm.peerDependencyRules.allowedVersions`](https://pnpm.io/package_json#pnpmpeerdependencyrulesallowedversions).

#### [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) packages

The major versions of `@types/*` packages must be aligned with the major
versions of the packages they provide types for—i.e. `foo@x.y.z` requires
`@types/foo@^x`.

For convenience, `@types` packages can be quickly upgraded to their latest
minor/patch version by running `pnpm up`.

## Build

- `pnpm build` - build myHDF5 for production
- `pnpm preview` - serve production build locally

## Code quality

- `pnpm lint` - run all linting and code formatting commands
- `pnpm lint:eslint` - lint all TS and JS files with ESLint
- `pnpm lint:tsc` - type-check the whole project, test files included
- `pnpm lint:prettier` - check that all files have been formatted with Prettier
- `pnpm analyze` - inspect the size and content of the JS bundles (after
  `pnpm build`)

### Automatic fixing and formatting

- `pnpm lint:eslint --fix` - auto-fix linting issues
- `pnpm lint:prettier --write` - format all files with Prettier

### Editor integration

Most editors support fixing and formatting files automatically on save. The
configuration for VSCode is provided out of the box, so all you need to do is
install the recommended extensions.

## Deployment

- The project's `main` branch is manually deployed to
  [Netlify](https://www.netlify.com/).
