---
title: Adding container component
description: Adding container component
---

A component type that allows to define a container image-based
configuration of a container in a workspace. A devfile can contain one
or more component(s) of the `container` type. The `container` type of
component brings in custom tools into the workspace. The component is
identified by its image.

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

- [Adding components](./adding-components)

## Procedure

1. Define a component using the type `container`.

    ```yaml {% title="A container component" filename="devfile.yaml" %}
    components:
      - name: maven
        container:
          image: eclipse/maven-jdk8:latest
          volumeMounts:
            - name: mavenrepo
              path: /root/.m2
          env:
            - name: ENV_VAR
              value: value
          endpoints:
            - name: maven-server
              targetPort: 3101
              configuration:
                protocol: tcp
                scheme: http
                secure: 'true'
                public: 'true'
                discoverable: 'false'
          memoryLimit: 1536M
          command: ['tail']
          args: ['-f', '/dev/null']
    ```

    ```yaml {% title="A minimal container component" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
        name: MyDevfile
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          command: ['sleep', 'infinity']
    ```

    It specifies the type of the component, `container` and the `image`
    attribute names the image to be used for the component using the
    usual Docker naming conventions, that is, the above `image`
    attribute is equal to `docker.io/library/golang:latest`.

2. Mounting project sources

    For the `container` component to have access to the project sources,
    you must set the `mountSources` attribute to `true`.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
        name: MyDevfile
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
    ```

    The sources is mounted on a location stored in the `PROJECTS_ROOT`
    environment variable that is made available in the running container
    of the image. This location defaults to `/projects`. If
    `sourceMapping` is defined in the container, it overrides the
    *PROJECT\_ROOT* value if present and mounts the source to the path
    defined by `sourceMapping`.

3. Container Entrypoint

    The `command` attribute of the `container` along with other arguments, is used to modify the `entrypoint` command of the container created from the image. In {prod} the container is needed to run indefinitely so that you can connect to it and execute arbitrary commands in it at any time. Because the availability of the `sleep` command and the support for the `infinity` argument for it is different and depends on the base image used in the particular images, {prod-short} cannot insert this behavior automatically on its own. However, you can take advantage of this feature to, for example, start up necessary servers with modified configurations, etc.

## Additional resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
