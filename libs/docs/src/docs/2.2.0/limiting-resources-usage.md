---
title: Limiting resources usage
description: Limiting resources usage
---

This section describes how to limit resource use in devfiles.

## Procedure

1. Specify container memory limit and memory request for components

    To specify a container memory limit for `container`, use the
    `memoryLimit` parameter and for the container memory request, use
    the `memoryRequest` parameter:

    ```yaml {% title="Specify container memory limit and memory request for components" filename="devfile.yaml" %}
    components:
      - name: maven
        container:
          image: eclipse/maven-jdk8:latest
          memoryLimit: 512M
          memoryRequest: 256M
    ```

2. Specify container CPU limit and container CPU request for components

    To specify a container CPU limit for `container`, use the `cpuLimit`
    parameter and for the CPU request, use the `cpuRequest` parameter:

    ```yaml {% title="Specify container CPU limit and CPU request for components" filename="devfile.yaml" %}
    components:
      - name: maven
        container:
          image: eclipse/maven-jdk8:latest
          cpuLimit: 750m
          cpuRequest: 450m
    ```


3. When not specified, the values may or may not be inferred from the
    application that consumes the devfile or from the underlying platform
    (for example, Kubernetes).
