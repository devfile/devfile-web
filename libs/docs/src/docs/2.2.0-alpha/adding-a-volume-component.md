---
title: Adding a volume component
description: Adding a volume component
---

You can use a `volume` component to share files among container
components and collaborate with other teams during the development
process.

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

- [Adding components](./adding-components)

## Procedure

1. Add a `volume` component and specify the size of it.

    ```yaml {% title="Minimal volume example" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: mydevfile
    components:
      - name: mydevfile
        volume:
          size: 200G
    ```

2. If you do not want your `volume` component to persist across
    restarts, specify it as ephemeral.

    ```yaml {% title="Ephemeral volume example" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: mydevfile
    components:
      - name: mydevfile
        volume:
          ephemeral: true
          size: 200G
    ```

{% callout title="Note!" %}
Specifying the size of a `volume` component is dependent on the tools you use and might be subject to the limitations of the tools.
{% /callout %}

## Additional resources

- [API Reference](./devfile-schema)

- [Devfile resources](./resources)
