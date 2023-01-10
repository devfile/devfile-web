---
title: Adding commands
description: Adding commands
---

You can use a devfile to specify commands to run in a workspace. Every
command can contain a subset of actions. The actions in each subset are
related to a specific component.

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

- [Adding a project](./adding-projects)

- [Adding a component](./adding-components)

## Procedure

1. Add a `commands` section to a devfile that contains a list of one or
    more commands.

2. For each command, define a unique value for the mandatory `id`
    attribute.

3. For each command, define a mandatory kind of one of the following
    kinds: `exec`, `apply` or `composite`

    ```yaml {% title="sample command" filename="devfile.yaml" %}
    commands:
    - id: build
        exec:
        component: mysql
        commandLine: mvn clean
        workingDir: /projects/spring-petclinic

    ```

4. [Adding a command group](./adding-a-command-group)

5. [Adding an exec command](./adding-an-exec-command)

6. [Adding an apply command](./adding-an-apply-command)

7. [Adding a composite command](./adding-a-composite-command)

## Additional resources

- [API reference](./devfile-schema)

- [Devfile resources](./resources)
