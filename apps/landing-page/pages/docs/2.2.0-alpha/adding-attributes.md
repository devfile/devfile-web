---
title: Adding attributes
description: Adding attributes
---

Use devfile attributes to configure various features and properties
according to user and tooling needs. Attributes are
implementation-dependent and written in free-form YAML. The following
devfile objects can have attributes:

- `metadata`

- `components`

- `commands`

- `projects`

- `starterProjects`

## Prerequisites

- [Adding schema version](/docs/2.2.0-alpha/adding-schema-version)

- [Adding a name](/docs/2.2.0-alpha/adding-a-name)

## Procedure

1. Define a custom attribute

    When no editor is specified, a default editor is provided. To
    represent this user-defined example, use the `editorFree` attribute
    as shown in the following example:

    ```yaml {% title="A devfile without an editor" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: petclinic-dev-environment
      attributes:
        editorFree: true
    components:
      - name: myapp
        kubernetes:
          uri: my-app.yaml
    ```

## Additional resources

- [API reference](/docs/2.2.0-alpha/devfile-schema)

- [Devfile resources](/docs/2.2.0-alpha/devfile-resources)
