---
title: Overview
description: Authoring devfile - Overview
---

## Creating a minimal devfile

The `schemaVersion` attribute is mandatory in a devfile.

### Procedure

- Define the `schemaVersion` attribute in the devfile and specify a static name for the workspace with the `name` attribute.

    ```yaml {% title="Minimal devfile with schema version and name" filename="devfile.yaml" %}
    schemaVersion: <version>
    metadata:
      name: devfile-sample
      version: 0.0.1
    ```

## Adding to a minimal devfile

See the following documents to help you add to the minimal devfile to suit your development needs:

- [Adding projects](./adding-projects)

- [Adding components](./adding-components)

- [Adding commands](./adding-commands)

- [Defining variables](./defining-variables)

- [Defining attributes](./defining-attributes)

- [Referring to a parent devfile in a devfile](./referring-to-a-parent-devfile)
