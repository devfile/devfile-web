---
title: Deploying a devfile registry
description: Deploying a devfile registry
---

## Procedure

1. Specify container memory limit for components

    To specify a container(s) memory limit for `container`, `plugin`, use the `memoryLimit` parameter:

    ```yaml {% title="Specify container memory limit for components" filename="devfile.yaml" %}
    components:
    - name: exec-plugin
          plugin:
          id: eclipse/machine-exec-plugin/0.0.1
          memoryLimit: 1Gi
    - name: maven
          container:
          image: eclipse/maven-jdk8:latest
          memoryLimit: 512M
    ```

    This limit will be applied to every container of the given component.

    For `plugin` components, RAM limits can be described in the plug-in descriptor file, typically named `meta.yaml`.

2. Specify container memory request for components

    To specify a container(s) memory request for `plugin` use the `memoryRequest` parameter:

    ```yaml {% title="Specify container memory request for components" filename="devfile.yaml" %}
    components:
    - name: exec-plugin
          plugin:
          id: eclipse/machine-exec-plugin/0.0.1
          memoryLimit: 1Gi
          memoryRequest: 512M
    - name: maven
          container:
          image: eclipse/maven-jdk8:latest
          memoryLimit: 512M
          memoryRequest: 256M
    ```

    This limit will be applied to every container of the given component.

    For `plugin` components, RAM requests can be described in the plug-in descriptor file, typically named `meta.yaml`.

    If they are not specified, the values are undetermined: they may or may not be inferred from the application that consumes the devfile or from Kubernetes.

3. Specify container CPU limit for components

    To specify a container(s) CPU limit for `plugin` or `container` use the `cpuLimit` parameter:

    ```yaml {% title="Specify container CPU limit for components" filename="devfile.yaml" %}
    components:
    - name: exec-plugin
      plugin:
        id: eclipse/machine-exec-plugin/0.0.1
        cpuLimit: 1.5
    - name: maven
      container:
        image: eclipse/maven-jdk8:latest
        cpuLimit: 750m
    ```

    This limit will be applied to every container of the given component.

    For the `plugin` components, CPU limits can be described in the plug-in descriptor file, typically named `meta.yaml`.

    If they are not specified, the values are undetermined: they may or may not be inferred from the application that consumes the devfile or from Kubernetes.

4. Specify container CPU request for components

    To specify a container(s) CPU request for `plugin` or `container` use the `cpuRequest` parameter:

    ```yaml {% title="Specify container CPU request for components" filename="devfile.yaml" %}
    components:
    - name: exec-plugin
      plugin:
        id: eclipse/machine-exec-plugin/0.0.1
        cpuLimit: 1.5
        cpuRequest: 0.225
    - name: maven
      container:
        image: eclipse/maven-jdk8:latest
        cpuLimit: 750m
        cpuRequest: 450m
    ```

    This limit will be applied to every container of the given component.

    For the `plugin` component type, CPU requests can be described in the plug-in descriptor file, typically named `meta.yaml`.

    If they are not specified, the values are undetermined: they may or may not be inferred from the application that consumes the devfile or from Kubernetes.

## Additional resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
