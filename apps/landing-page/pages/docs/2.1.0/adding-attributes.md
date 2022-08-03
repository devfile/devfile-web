---
title: Adding attributes
description: Adding attributes
---

Devfile attributes can be used to configure various features and
properties according to user and tooling needs. Attributes are
implementation-dependant, free-form YAML and can be defined for the
following devfile objects: `metadata`, `components`, `commands`,
`projects`, and `starterProjects`.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

## Procedure

1. Define a custom attribute

    When no editor is specified, a default editor is provided. To
    represent this user-defined example, use the `editorFree` attribute
    as shown in the following example:

    ```yaml {% title="A devfile without an editor" filename="devfile.yaml" %}
    schemaVersion: 2.1.0
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

- [API reference](./api-reference)

- [Devfile resources](./devfile-resources)
