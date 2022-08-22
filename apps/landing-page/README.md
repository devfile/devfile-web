# landing-page

Landing Page project for [devfile.io](https://devfile.io/).

## Additional commands

- `yarn nx prebuild landing-page`: builds the docs directory and navigation sidebar
- `yarn nx postexport landing-page`: exports the website's sitemap

## Configuring navigation

- Header

  Header navigation can be configured in [`navigation.ts`](https://github.com/devfile/devfile-web/blob/main/apps/landing-page/navigation.ts).

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

  Footer navigation can be configured in [`navigation.ts`](https://github.com/devfile/devfile-web/blob/main/apps/landing-page/navigation.ts).

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

  The sidebar navigation can be configured under [`navigation/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/navigation).

  Each YAML file under `navigation/` corresponds to a devfile version except `no-version.yaml`, which corresponds to pages that are the same between all versions.

  *Whenever you update the sidebar navigation you **MUST** restart the server or run `yarn nx prebuild landing-page`.*

  Each sidebar section requires a `title` and `links`. Each element in `links` requires a `title` and `href`. Currently, the sidebar only supports navigation one layer deep.
  
  *`no-version.yaml` has an additional top level `top` or `bottom` attribute which corresponds whether the section is on the top or bottom of the sidebar.*

  ```yaml
  - title: Example section 1
    links:
      - title: Element 1
        href: /element1
      - title: Element 2
        href: /element2
  - title: Example section 2
    links:
      - title: Element 3
        href: /element3
      - title: Element 3
        href: /element4
  ```

## Updating documentation

Documentation can be edited or added under [`docs/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/docs). The markdown is converted to html automatically by the [markdoc](https://markdoc.io/) Next.js addon. Instead of using `.mdx`, markdoc extends CommonMark by enclosing snippets in curly brackets.

### Tags

[Built-in tags](https://markdoc.io/docs/tags#built-in-tags)

Custom tags can be found under [`tags.tsx`](https://github.com/devfile/devfile-web/blob/main/apps/landing-page/markdoc/tags.tsx)

- `fence`

  - `title`: optional
  - `filename`: optional

  ````md
  ```yaml
    schemaVersion: 2.2.0
    metadata:
      name: mydevfile
    components:
      - name: mydevfile
        volume:
          size: 200G
  ```
  ````

  ````md
  ```yaml {% title="Example" filename="devfile.yaml" %}
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

  - `title`: required
  - `type`: optional
    - `note` (default)
    - `warning`

  ```md
  {% callout title="Note!" %}
  - All location references to `starterProjects` will change to local
      paths relative to the stacks directory.

  - Stack component image references will change to use the offline
      accessible image repository.
  {% /callout %}
  ```

  ```md
  {% callout type="warning" title="Warning!" %}
  Listening on any other interface than the local loopback poses a
  security risk. Such a server is accessible without the JWT
  authentication within the cluster network on the corresponding IP
  addresses.
  {% /callout %}
  ```

- `figure`

  - `src`: required
  - `alt`: required
  - `caption`: required
  - `hasBackground`: optional
    - `false` (default)
    - `true`

  ```md
  {% figure src="./example" alt="Example" caption="This is an example caption" /%}
  ```

- `quick-link` and `quick-links`

  `quick-link`
  - `title`: required
  - `description`: required
  - `icon`: required
    - `installation`
    - `presets`
    - `plugins`
    - `theming`
    - `lightbulb`
    - `warning`
  - `href`: required

  ```md
  {% quick-links %}

  {% quick-link title="Installation" icon="installation" href="/" description="Step-by-step guides to setting up your system and installing the library." /%}

  {% quick-link title="Architecture guide" icon="presets" href="/" description="Learn how the internals work and contribute." /%}

  {% quick-link title="Plugins" icon="plugins" href="/" description="Extend the library with third-party plugins or write your own." /%}

  {% quick-link title="API reference" icon="theming" href="/" description="Learn to easily customize and modify your app's visual design to fit your brand." /%}

  {% /quick-links %}
  ```

- `current-version`

  The current devfile version selected based on the version dropdown.

  - `beforeVersion`: optional - text to add before the devfile version
  - `afterVersion`: optional - text to add after the devfile version
  - `isCodeblock`: optional - change text to inline codeblock
    - `false` (default)
    - `true`

  ```md
  {% current-version beforeVersion="schemaVersion: " isCodeblock="true" /%}
  ```

### Additional things to note

- Instead of specifying a version for `schemaVersion` when creating a fence for a devfile, `<version>` can access the current devfile version selected based on the version dropdown.

  ```yaml
  schemaVersion: <version>
  metadata:
    name: devfile-sample
  ```

- After any documentation changes, update the sidebar navigation if a new file was added or a filename was changed.

## Releasing a new version

Steps:

1. Edit the possible versions - [`docVersions`](https://github.com/devfile/devfile-web/blob/main/libs/docs/src/types/index.ts)

    The version directories under [`docs/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/docs) **MUST** correspond to possible version.

    The version navigation files under [`navigation/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/navigation) **MUST** correspond to possible version.

    The devfile schemas under [`devfile-schemas/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/devfile-schemas) **MUST** correspond to possible version.

2. Edit the default version - [`defaultVersion`](https://github.com/devfile/devfile-web/blob/main/libs/docs/src/types/index.ts)

    The default version must be a possible version.

3. Create the new version directory under [`docs/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/docs)

    The new version must be a possible version.

    It is suggested to copy and rename the old version directory to the new version directory.

4. Create the new version navigation under [`navigation/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/navigation)

    The filename **MUST** follow the convention `<new-version>.yaml` where new version is a possible version.

    It is suggested to copy and rename the old version navigation to the new version navigation.

5. Create the new version devfile schema under [`devfile-schemas/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/devfile-schemas).

    The new version devfile schema is located in [`schemas/latest/devfile.json`](https://github.com/devfile/api/blob/main/schemas/latest/devfile.json) under [API](https://github.com/devfile/api) Github repository.

    Copy and rename the devfile schema under [`devfile-schemas/*`](https://github.com/devfile/devfile-web/tree/main/libs/docs/src/devfile-schemas).

    The filename **MUST** follow the convention `<new-version>.json` where new version is a possible version.
