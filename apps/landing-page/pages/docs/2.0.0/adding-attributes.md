---
title: Adding attributes
description: Adding attributes
---

Devfile attributes can be used to configure various features.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

## Procedure

1. Define the optional `editorFree` attribute

    When an editor is not specified in a devfile, a default is provided.
    When no editor is needed, use the `editorFree` attribute. The
    default value of `false` means that the devfile requests the
    provisioning of the default editor.

    ```yaml {% title="A devfile without an editor" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: petclinic-dev-environment
    components:
      - name: myApp
        kubernetes:
          local: my-app.yaml
    attributes:
      editorFree: true
    ```

2. Define the optional `persistVolumes` attribute (ephemeral mode)

    By default, volumes and PVCs specified in a devfile are bound to a
    host folder to persist data even after a container restart. To
    disable data persistence to make the workspace faster, such as when
    the volume back end is slow, modify the `persistVolumes` attribute
    in the devfile. The default value is `true`. Set to `false` to use
    `emptyDir` for configured volumes and PVC.

    ```yaml {% title="A devfile with ephemeral mode enabled" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: petclinic-dev-environment
    projects:
      - name: petclinic
        git:
          remotes:
            origin: "https://github.com/che-samples/web-java-spring-petclinic.git"
    attributes:
      persistVolumes: false
    ```

## Additional resources

- [API reference](./api-reference)

- [Devfile samples](./devfile-samples)
