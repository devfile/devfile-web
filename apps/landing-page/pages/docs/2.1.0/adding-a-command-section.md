---
title: Adding a command section
description: Adding a command section
---

Specify the commands you want to run in your workspace.

- [???](#adding-schema-version-to-a-devfile.adoc)

- [???](#adding-a-name-to-a-devfile.adoc)

- [???](#adding-projects-to-a-devfile.adoc)

1.  Add a `commands` section to a devfile that contains a list of one or
    more commands.

2.  For each command, define a unique value for the mandatory `id`
    attribute.

3.  For each command, define a mandatory kind of one of the following
    kinds:

    - `exec`

    - `apply`

    - `composite`

Sample command

```yaml
commands:
- id: build
    exec:
    component: mysql
    commandLine: mvn clean
    workingDir: /projects/spring-petclinic

```
