---
title: Adding schema version
description: Adding schema version
---

The `schemaVersion` attribute is mandatory in a devfile.

## Procedure

- Define the `schemaVersion` attribute in the devfile:

    ```yaml {% title="Adding schema version to a devfile" filename="devfile.yaml" %}
    schemaVersion: 2.1.0
    metadata:
      name: devfile-sample
      version: 2.1.0
    ```

## Additional Resources

- [API reference](./devfile-schema)
