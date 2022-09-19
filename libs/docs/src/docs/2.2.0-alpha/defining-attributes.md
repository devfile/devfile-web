---
title: Defining attributes
description: Defining attributes
---

As a developer, you can use devfile attributes to configure various features and properties according to the needs of users and tools. Attributes are implementation-dependent and written in free-form YAML. 

Attributes can be defined at the top level of the devfile, or in the following objects:

* `components`
* `commands`
* `projects`
* `starterProjects`
* `endpoints`
* `metadata`: Attributes in metadata are deprecated. Use top-level attributes instead.

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

## Procedure

1. Define attributes in a component:

    ```yaml {% title="Java Quarkus example" %}
    ----
    schemaVersion: 2.2.0
    metadata:
      name: java-quarkus
    ...
    components:  
      - name: outerloop-deploy
        attributes:
          deployment/replicas: 1
          deployment/cpuLimit: "100m"
          deployment/cpuRequest: 10m
          deployment/memoryLimit: 250Mi
          deployment/memoryRequest: 100Mi
          deployment/container-port: 8081
        kubernetes:
          uri: outerloop-deploy.yaml
    ----
    ```

1. Define a custom attribute in the `metadata` object.

    When no editor is specified, a default editor is provided. To represent this user-defined example, use the `editorFree` attribute as shown in the following example:

    ```yaml {% title="A devfile without an editor" %}
    ----
    schemaVersion: 2.2.0
    metadata:
      name: petclinic-dev-environment
      attributes:
        editorFree: true
    components:
      - name: myapp
        kubernetes:
          uri: my-app.yaml
    ----


## Additional resources

- [API reference](./devfile-schema)

- [Devfile resources](./resources)
