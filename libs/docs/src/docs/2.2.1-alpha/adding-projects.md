---
title: Adding projects
description: Adding projects
---

This section describes how to add one or more projects to a devfile.
Each starter project can contain either a `git` or `zip` object. See the
following tables for project properties in a devfile:

#### starterProject object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `name`
- `string`
- yes
- The name of your devfile.
---
- `description`
- `string`
- no
- The description of your starterProject.
---
- `clonePath`
- `string`
- no
- The path relative to the root of your projects. Clone your projects into this path.
{% /table %}

#### git object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `checkoutFrom`
- `string`
- no
- The location of your git repository.
---
- `remotes`
- `string`
- yes
- The branch that you use.
{% /table %}

#### zip object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `location`
- `string`
- no
- The location of your zip.
{% /table %}

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

## Procedure

1. Add a `projects` section in the devfile, containing a list of one or
    more projects.

    ```yaml {% title="A minimal devfile with one single project" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: petclinic-dev-environment
      version: 1.0.0
    projects:
      - name: petclinic
        git:
          remotes:
            origin: 'https://github.com/spring-projects/spring-petclinic.git'
          checkoutFrom:
            revision: main
    ```

    ```yaml {% title="A devfile with multiple projects" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: example-devfile
      version: 1.0.0
    projects:
      - name: frontend
        git:
          remotes:
            origin: 'https://github.com/acmecorp/frontend.git'
      - name: backend
        git:
          remotes:
            origin: 'https://github.com/acmecorp/backend.git'
    ```

2. For each project, define an unique value for the mandatory `name`
    attribute.

3. For each project, define a mandatory source of either the `git` or
    `zip` type.

    Projects with sources in Git. `checkoutFrom` refers to the branch
    being used.

    ```yaml {% title="Project-source type: git" filename="devfile.yaml" %}
    projects:
      - name: my-project1
        git:
          remotes:
            origin: 'https://github.com/my-org/project1.git'
          checkoutFrom:
            revision: main
    ```

    Projects with sources in a ZIP archive. `location` refers to the URL
    of a ZIP file.

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
    schemaVersion: 2.2.0
    metadata:
      name: my-project-dev
      version: 2.0.0
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

- [Api reference](./devfile-schema)

- [Devfile resources](./resources)
