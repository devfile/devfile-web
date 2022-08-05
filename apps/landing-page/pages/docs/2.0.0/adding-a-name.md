---
title: Adding a name
description: Adding a name
---

Adding a name to a devfile is mandatory. Both `name` and `generateName`
are optional attributes, but at least one of them must be defined.

## Prerequisites

- [Adding schema version](./adding-schema-version)

## Procedure

1. To specify a static name for the workspace, define the `name`
    attribute.

    ```yaml {% title="Adding a static name" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: devfile-sample
      version: 2.0.0
    ```

2. To specify a prefix for automatically generated workspace names,
    define the `generateName` attribute and don’t define the `name`
    attribute. The workspace name will be in the `<generateName>YYYYY`
    format (for example, `devfile-sample-2y7kp`). `Y` is random
    `[a-z0-9]` character.

    ```yaml {% title="Adding a generated name to a devfile" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      generateName: devfile-sample-
    ```

{% callout title="Note!" %}
For workspaces created using a factory, defining `name` or
`generateName` has the same effect. The defined value is used as the
name prefix: `<name>YYYYY` or `<generateName>YYYYY`. When both
`generateName` and `name` are defined, `generateName` takes precedence.
{% /callout %}

## Additional resources

- [API reference](./devfile-schema)
