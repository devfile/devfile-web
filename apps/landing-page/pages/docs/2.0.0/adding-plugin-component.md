---
title: Adding plug-in components
description: Adding plug-in components
---

This section describes how to add a `plugin` component to a devfile.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

- [Adding components](./adding-components)

## Procedure

1. Define a component using the type `plugin`.

2. Define the `id` attribute. It is slash-separated publisher, name and version of plug-in from the
    Plug-in registry. List of available {prod-short} plug-ins and more information about registry can be found in the [{prod-short} plug-in registry](https://github.com/eclipse/che-plugin-registry) GitHub repository.

    ```yaml {% title="A devfile defining a plug-in id" filename="devfile.yaml" %}
    components:
           - name: exec-plugin
             plugin:
              id: machine-exec-plugin/0.0.1
    ```

3. Optionally, specify an alternative component registry using the
    `registryUrl` parameter:

    ```yaml {% title="A devfile defining a plug-in id and an alternative component registry" filename="devfile.yaml" %}
    components:
      - name: exec-plugin
        plugin:
        id: machine-exec-plugin/0.0.1
        registryUrl: https://my-customregistry.com
    ```

4. Optionally, provide a direct link to the component descriptor
    (typically named `meta.yaml`) using the `reference` attribute,
    instead of using the `id`.

    ```yaml {% title="A devfile defining a plug-in with a direct link to the component descriptor" filename="devfile.yaml" %}
    components:
      - name: exec-plugin
        plugin:
        reference: https://raw.githubusercontent.com.../plugin/1.0.1/meta.yaml
    ```

    {% callout title="Note!" %}
    It is impossible to mix the `id` and `reference` fields in a single
    component definition; they are mutually exclusive.
    {% /callout %}

5. Optionally, provide plugin component configuration using the
    `preferences` attribute

    ```yaml {% title="Configuring JVM using plug-in preferences" filename="devfile.yaml" %}
    id: redhat/java/0.38.0
    plugin:
      preferences:
          java.jdt.ls.vmargs: '-noverify -Xmx1G -XX:+UseG1GC -XX:+UseStringDeduplication'
    ```

    ```yaml {% title="Configuring preferences as an array" filename="devfile.yaml" %}
    id: redhat/java/0.38.0
    plugin:
      preferences:
        go.lintFlags: ["--enable-all", "--new"]
    ```

## Additional Resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
