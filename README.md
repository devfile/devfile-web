# devfile-web

Monorepo for web related devfile projects

## Getting started

It is highly recommended to download the [Nx Console](https://nx.dev/using-nx/console#download) extension for your IDE if available.

### Workspace commands

Run `yarn install` to download dependencies.

#### Specific project commands

- `yarn nx serve <project-name> --configuration=<development | production>`: serves the project's application
- `yarn nx build <project-name> --configuration=<development | production>`: builds the project's application
- `yarn nx run <project-name>:export`: exports the project's application to be static
- `yarn nx test <project-name>`: tests the project's application
- `yarn nx lint <project-name>`: lints the project's application

#### Nonspecific project commands

- `yarn create:component <name>`: creates a React component
- `yarn create:hook <name>`: creates a React hook
- `yarn create:function <name>`: creates a function

## landing-page

Landing Page project for [devfile.io](https://devfile.io/).

### Configuring navigation

Navigation can be configured on [`navigation.ts`](https://github.com/devfile/devfile-web/blob/main/apps/landing-page/navigation.ts).

- Header

  ```ts
  export const headerNavigation: HeaderNavigation = [
    ...
  ];
  ```

  Each element in `headerNavigation` is as follows:

  ```ts
  [
    { 
      name: 'Example', // the name of the link 
      href: 'https://example.com', // the URI of the link
      image: ExampleIcon, // Optional: the image of the link
    }
  ]
  ```

- Footer

  ```ts
  export const footerNavigation: FooterNavigation = {
    contributors: [
      ...
    ],
    links: [
      ...
    ],
    social: [
      ...
    ],
  };
  ```

  - `contributors`: contributors the the devfile project in alphabetical order
  - `links`: miscellaneous links related to the devfile project
  - `social`: social links for the devfile project

  Each element in `contributors`, `links`, and `social`  is as follows:

  ```ts
  [
    { 
      name: 'Example', // the name of the link 
      href: 'https://example.com', // the URI of the link
      image: ExampleIcon, // Optional: the image of the link
    },
    ...
  ]
  ```

- Sidebar

  To add a new version, you need to update the allowed versions which can be configured on [`use-navigation.tsx`](https://github.com/devfile/devfile-web/blob/main/libs/core/src/hooks/use-navigation/use-navigation.tsx#L28). The allowed versions must be the same name as the directories under [`/docs`](https://github.com/devfile/devfile-web/tree/main/apps/landing-page/pages/docs).

  ```ts
  export type DocVersions = '2.0.0' | '2.1.0' | '2.2.0-alpha';
  ```

  ```ts
  export const overallDocsNavigation: OverallDocsNavigation = {
    versionNonspecific: [
      ...
    ],
    versionSpecific: {
      <version>: [
        ...
      ],
    },
    defaultVersion: <version>,
  };
  ```

  - `versionNonspecific`
  
    `versionNonspecific` is meant for pages not related to any specific version. e.g. A getting started page.

    Each element in `versionNonspecific` is as follows:

    ```ts
    [
      { 
        title: 'Example group', // the title of the navigation group
        links: [ // the children under the navigation group
          {
            title: 'Example child', // the title of a navigation group child
            href: '/docs/<version>/example-child', // the href of a navigation group child
          },
          ...
        ],
      },
      ...
    ]
    ```

    - `versionSpecific`
  
    `versionSpecific` is meant for pages related to a specific version. e.g. A new API documentation page.

    Each element in `versionSpecific` is as follows:

    ```ts
    {
      <version>: [
        { 
          title: 'Example group', // the title of the navigation group
          links: [ // the children under the navigation group
            {
              title: 'Example child', // the title of a navigation group child
              href: '/docs/<version>/example-child', // the href of a navigation group child
            },
            ...
          ],
        },
        ...
      ],
      ...
    },
    ```

### Updating documentation

To update or add documentation, edit or create a markdown file under [`./docs`](https://github.com/devfile/devfile-web/tree/main/apps/landing-page/pages/docs). The markdown is converted to html pages automatically by the [markdoc](https://markdoc.io/) Next.js addon. Instead of using `.mdx`, markdoc extends markdown by enclosing snippets in curly brackets.

- [Built-in tags](https://markdoc.io/docs/tags#built-in-tags)

- Custom tags

  Custom tags can be found under [`./tags.tsx`](https://github.com/devfile/devfile-web/blob/main/apps/landing-page/markdoc/tags.tsx)

  - `fences`

    Curly brackets after specifying the code language is optional.

    ````md
    ```yaml {% title="Optional: Example" filename="Optional: devfile.yaml" %}
      schemaVersion: 2.2.0
      metadata:
        name: mydevfile
      components:
        - name: mydevfile
          volume:
            size: 200G
    ```
    ````

  - `callout`

    The children for `callout` can be any valid markdown or snippet.

    ```md
    {% callout title="Note!" %}
    - All location references to `starterProjects` will change to local
        paths relative to the stacks directory.

    - Stack component image references will change to use the offline
        accessible image repository.
    {% /callout %}
    ```

  - `figure`

    ```md
    {% figure src="./example" alt="Example" caption="This is an example caption" /%}
    ```

  - `quick-link` and `quick-links`

    ```md
    {% quick-links %}

    {% quick-link title="Installation" icon="installation" href="/" description="Step-by-step guides to setting up your system and installing the library." /%}

    {% quick-link title="Architecture guide" icon="presets" href="/" description="Learn how the internals work and contribute." /%}

    {% quick-link title="Plugins" icon="plugins" href="/" description="Extend the library with third-party plugins or write your own." /%}

    {% quick-link title="API reference" icon="theming" href="/" description="Learn to easily customize and modify your app's visual design to fit your brand." /%}

    {% /quick-links %}
    ```

After you update any documentation, update the navigation if you added a new page or changed a file name.
