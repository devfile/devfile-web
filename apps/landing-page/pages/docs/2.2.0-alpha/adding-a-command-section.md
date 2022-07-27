---
title: Adding a command section
description: Adding a command section
---

Specify the commands you want to run in your workspace.

## Prerequisites

- [Adding schema version](/docs/2.2.0-alpha/adding-schema-version)

- [Adding a name](/docs/2.2.0-alpha/adding-a-name)

- [Adding projects](/docs/2.2.0-alpha/adding-projects)

## Procedure

1. Add a `commands` section to a devfile that contains a list of one or
    more commands.

2. For each command, define a unique value for the mandatory `id`
    attribute.

3. For each command, define a mandatory kind of one of the following
    kinds:

    - `exec`

    - `apply`

    - `composite`

    ```yaml {% title="sample command" filename="devfile.yaml" %}
    commands:
    - id: build
        exec:
        component: mysql
        commandLine: mvn clean
        workingDir: /projects/spring-petclinic

    ```
