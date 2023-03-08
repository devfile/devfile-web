---
title: Adding projects
description: Adding projects
---

This section describes how to add one or more projects to a devfile.

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

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

## Additional Resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
