# devfile-web
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/8255/badge)](https://www.bestpractices.dev/projects/8255)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/devfile/devfile-web/badge)](https://securityscorecards.dev/viewer/?uri=github.com/devfile/devfile-web)

Monorepo for web related devfile projects

## Getting started

This project uses [`yarn`](https://yarnpkg.com/getting-started/install).

It is highly recommended to download the [Nx Console](https://nx.dev/using-nx/console#download) extension for your IDE if available.

## Workspace commands

Run `yarn install` to download dependencies.

### Specific project commands

- `yarn nx serve <project-name> --configuration=<development | production>`: serves the project's application
- `yarn nx build <project-name> --configuration=<development | production>`: builds the project's application
- `yarn nx run <project-name>:export`: exports the project's application to be static
- `yarn nx test <project-name>`: tests the project's application
- `yarn nx lint <project-name>`: lints the project's application

### Nonspecific project commands

- `yarn create:component <name>`: creates a React component
- `yarn create:hook <name>`: creates a React hook
- `yarn create:function <name>`: creates a function

## landing-page

[Landing Page README](https://github.com/devfile/devfile-web/tree/main/apps/landing-page)

## Contributing

Please see our [contributing.md](./CONTRIBUTING.md).

## License

Apache License 2.0, see [LICENSE](./LICENSE) for details.