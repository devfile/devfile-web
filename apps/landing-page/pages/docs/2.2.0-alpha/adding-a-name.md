---
title: Metadata
description: Metadata
---

Adding a name to a devfile is mandatory. Use the `name` attribute to
define the name. See the following table for metadata properties in a
devfile:

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `name`
- `string`
- yes
- The name of your devfile. This name
links you to the devfile registry if listed.
---
- `version`
- `string`
- yes
- The version of your devfile.
{% /table %}

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

## Additional Resources

- [API Reference](./devfile-schema)
