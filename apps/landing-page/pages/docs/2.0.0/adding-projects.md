---
title: Adding projects
description: Adding projects
---

This section describes how to add one or more projects to a devfile.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

## Procedure

1. Add a `projects` section in the devfile, containing a list of one or
    more projects.

    ```yaml {% title="A minimal devfile with one single project" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: petclinic-dev-environment
    projects:
      - name: petclinic
        git:
          remotes:
            origin: 'https://github.com/spring-projects/spring-petclinic.git'
          checkoutFrom:
            revision: master
    ```

    ```yaml {% title="A devfile with multiple projects" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: example-devfile
    projects:
    - name: frontend
      git:
        remotes:
          origin: https://github.com/acmecorp/frontend.git
    - name: backend
      git:
        remotes:
          origin: https://github.com/acmecorp/backend.git
    ```

2. For each project, define an unique value for the mandatory `name`
    attribute.

3. For each project, define a mandatory source of one of the following
    types: `git`, `github` and `zip`.

    - `git`: Projects with sources in Git.

        ```yaml {% title="Project-source type: git" filename="devfile.yaml" %}
        projects:
          - name: my-project1
            git:
              remotes:
                origin: "https://github.com/my-org/project1.git"
              checkoutFrom:
                revision: master           
              tag: 7.2.0
              commitId: 36fe587
              branch: master
        ```

        `startPoint` is the general value for `tag`, `commitId`, and
        `branch`. The `startPoint`, `tag`, `commitId`, and `branch`
        parameters are mutually exclusive. When more than one is
        supplied, the following order is used: `startPoint`, `tag`,
        `commitId`, `branch`.

    - `github`: Same as `git` but for projects hosted on [GitHub](https://github.com/) only. Use `git`
        for projects that do not use GitHub-specific features.

    - `zip`: Projects with sources in a ZIP archive. Location points to a ZIP file.

        ```yaml {% title="Project-source type: zip" filename="devfile.yaml" %}
        source:
            zip:
              location: http://host.net/path/project-src.zip
        ```

4. For each project, define the optional `clonePath` attribute to
    specify the path into which the project is to be cloned. The path
    must be relative to the `/projects/` directory, and it cannot leave
    the `/projects/` directory. The default value is the project name.

    ```yaml {% title="Defining the clonePath attribute" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: my-project-dev
    projects:
      - name: my-project-resource
        clonePath: resources/my-project
        zip:
          location: http://host.net/path/project-res.zip
      - name: my-project2
          git:
            remotes:
              origin: "https://github.com/my-org/project2.git"
            checkoutFrom:
              revision: develop
    ```

5. For each project, define the optional `sparseCheckoutDir` attribute
    to populate the project sparsely with selected directories.

    {% callout title="Note!" %}
    - Set to `/my-module/` to create only the root `my-module`
        directory (and its content).

    - Omit the leading slash (`my-module/`) to create all `my-module`
        directories that exist in the project. Including, for example,
        `/addons/my-module/`.

        The trailing slash indicates that only directories with the
        given name (including their content) are created.

    - Use wildcards to specify more than one directory name. For
        example, setting `module-*` checks out all directories of the
        given project that start with `module-`.

    For more information, see [Sparse checkout in Git
    documentation](https://git-scm.com/docs/git-read-tree#_sparse_checkout).
    {% /callout %}

## Additional Resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
