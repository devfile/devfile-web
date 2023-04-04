---
title: Adding a container component
description: Adding a container component
---

To incorporate custom tools into the workspace, define an image-based
configuration of a container in a workspace using the `container` component type.

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
              protocol: https
              secure: 'true'
              exposure: public
          memoryRequest: 256M
          memoryLimit: 1536M
          cpuRequest: 0.1
          cpuLimit: 0.5
          command: ['tail']
          args: ['-f', '/dev/null']
    ```

    ```yaml {% title="A minimal container component" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: mydevfile
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          command: ['sleep', 'infinity']
    ```

    Specify the type of component using the `container` property. Use
    the `image` property to specify the image for the component. When
    defining the `image`, use container naming conventions. For example,
    the `image` property in the preceding example refers to the
    container image, `docker.io/library/golang:latest`.

    Use the `container` component to augment the image with additional
    resources and information. This component allows you to integrate
    the tooling provided by the image with the application that consumes
    the devfile.

2. Mounting project sources

    For the `container` component to have access to the project sources,
    you must set the `mountSources` attribute to `true`.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: mydevfile
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
    ```

    The sources are mounted on a location stored in the `PROJECTS_ROOT`
    environment variable that is made available in the running container
    of the image. This location defaults to `/projects`. If
    `sourceMapping` is defined in the container, it overrides the
    `PROJECT_ROOT` value and mounts the source to the path defined by
    `sourceMapping`.

3. Specify a volume

    For the `container` component to have a shared volume, you must
    define a volume component in the devfile and reference the volume
    using `volumeMount` in container component. For more information on
    volume component, see [adding a volume component](./adding-a-volume-component).

    ```yaml  {% filename="devfile.yaml" %}
    components:
      - name: mycontainer
        container:
          image: java11-maven:next
          memoryLimit: 768Mi
          mountSources: true
          volumeMounts:
            - name: m2
              path: /home/user/.m2
      - name: m2
        volume:
          size: 1Gi
    ```

4. Container Entrypoint

    Use the `command` attribute of the `container` type to modify the
    `entrypoint` command of the container created from the image. The
    availability of the `sleep` command and the support for the
    `infinity` argument depend on the base image used in the particular
    images.

    All tools will respect the specified `command`. When `command`
    is not defined, the container will use the default from the
    image specified. When `command` is defined, it will override
    the one present in the image as intended. Either the
    `command` defined by the image or by the container component
    within the devfile must be non-terminating, such as the case
    of setting `command` to `sleep` with the `infinity` argument.

    ```yaml {% filename="devfile.yaml" %}
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
    ```

## Additional Resources

- [API Reference](./devfile-schema)

- [Devfile resources](./resources)
