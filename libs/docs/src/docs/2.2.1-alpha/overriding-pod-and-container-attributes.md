---
title: Extending kubernetes resources
description: Extending kubernetes resources
---

This section describes how you can extend Kubernetes resources for container components through `pod-overrides` and `container-overrides` attributes.

These attributes can be defined at the devfile level and component level. [Strategic Merge Patch](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md#basic-patch-format) strategy is used to merge the attributes defined at both levels.


## container-overrides

`container-overrides` attributes allow you to override properties of a container in a pod spec such as `securityContext` and `resources`. However, it restricts from overriding properties such as `image`, `name`, `ports`, `env`, `volumesMounts`, `command`, and `args`.

### Procedure
1. Specify "container-overrides" at the component level.
    ```yaml {% title="Specify container-overrides to override security context for container at component level" filename="devfile.yaml" %}
    ----
    metadata:
      name: java-quarkus
    ...
    components:
      - name: maven
        attributes:
          container-overrides:
            securityContext:
              runAsUser: 1001
              runAsGroup: 1001
        container:
          image: eclipse/maven-jdk8:latest
    ----
    ```
2. Specify "container-overrides" at the devfile level in `metadata` object.
    ```yaml {% title="Specify container-overrides to override resources for container at Devfile level" filename="devfile.yaml" %}
    ----
    metadata:
      name: java-quarkus
      attributes:
        container-overrides:
          resources:
            limits:
              memory: 4Gi
              nvidia.com/gpu: 1 # limiting to 1 GPU
            requests:
              nvidia.com/gpu: 1 # requesting 1 GPU
    ...
    components:
      - name: maven
        container:
          image: eclipse/maven-jdk8:latest
    ----
    ```

## pod-overrides

`pod-overrides` attributes allow you to override properties of a pod spec such as `securityContext`, `serviceAccountName`, `schedulerName`, etc. However, it restricts overriding properties such as `containers`, `initContainers`, and `volumes`.

If the attributes are defined at both devfile and component levels, the attribute at the devfile level will be parsed first and then the component level.

### Procedure
1. Specify "pod-overrides" at the component level.
    ```yaml {% title="Specify container-overrides to override security context for container at component level" filename="devfile.yaml" %}
    ----
    metadata:
      name: java-quarkus
    ...
    components:
      - name: maven
        attributes:
          pod-overrides:
            serviceAccountName: new-service-account
        container:
          image: eclipse/maven-jdk8:latest
    ----
    ```

2. Specify "pod-overrides" at the devfile level in the `metadata` object.
    ```yaml {% title="Specify container-overrides to override resources for container at Devfile level" filename="devfile.yaml" %}
    ----
    metadata:
      name: java-quarkus
      attributes:
        pod-overrides:
          schedulerName: new-scheduler
    ...
    components:
      - name: maven
        container:
          image: eclipse/maven-jdk8:latest
    ----
    ```

## Additional resources
- [Defining Attributes](./defining-attributes.md)
- [Strategic Merge Patch](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md#basic-patch-format)
