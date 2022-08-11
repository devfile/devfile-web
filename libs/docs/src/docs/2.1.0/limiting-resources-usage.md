---
title: Deploying a devfile registry
description: Deploying a devfile registry
---

## Procedure

1. Specify container memory limit and memory request for components

    To specify a container memory limit for `container`, use the `memoryLimit` parameter, and to specify a container memory request, use the `memoryRequest` parameter:

    ```yaml {% title="Specify container memory limit and memory request for components" filename="devfile.yaml" %}
    components:
      - name: maven
        container:
         image: eclipse/maven-jdk8:latest
         memoryLimit: 512M
         memoryRequest: 256M
    ```

    This limit applies to every container of the given component.

    If they are not specified, the values are undetermined: they may or may not be inferred from the application that consumes the devfile or from Kubernetes.

2. Specify container CPU limit and container CPU request for components

    To specify a container CPU limit for `container`, use the `cpuLimit` parameter, and to specify a container CPU request for `container`, use the `cpuRequest` parameter:

    ```yaml {% title="Specify container CPU limit and CPU request for components" filename="devfile.yaml" %}
    components:
    - name: maven
          container:
          image: eclipse/maven-jdk8:latest
          cpuLimit: 750m
          cpuRequest: 450m
    ```

    This limit applies to every container of the given component.

    If they are not specified, the values are undetermined: they may or may not be inferred from the application that consumes the devfile or from Kubernetes.
