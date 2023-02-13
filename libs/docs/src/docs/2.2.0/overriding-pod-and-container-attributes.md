---
title: Extending kubernetes resources
description: Extending kubernetes resources
---

This section describes how you can extend Kubernetes resources for container components through `pod-overrides` and `container-overrides` attributes.

## container-overrides

`container-overrides` attributes allow you to override properties of a container in a pod spec such as `securityContext` and `resources`. However, it restricts from overriding properties such as `image`, `name`, `ports`, `env`, `volumesMounts`, `command`, and `args`.

This attribute can be defined at the component level.

### Procedure
1. Specify "container-overrides" at the component level.
    ```yaml {% title="Specify container-overrides to override security context for container at component level" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    components:
      - name: maven
        attributes:
          container-overrides:
            securityContext:
              runAsUser: 1001
              runAsGroup: 1001
        container:
          image: eclipse/maven-jdk8:latest
    ```

The data inside `container-overrides` can also be specified as a JSON.
```yaml
  container-overrides:
    securityContext: {"runAsUser": 1001, "runAsGroup": 1001}
```

## pod-overrides

`pod-overrides` attribute allow you to override properties of a pod spec such as `securityContext`, `serviceAccountName`, `schedulerName`, etc. However, it restricts overriding properties such as `containers`, `initContainers`, and `volumes`.


This attribute can be defined at the component and devfile attributes levels. If it is defined at both the levels, the attribute at the devfile attributes level will be parsed first and then the component level.[Strategic Merge Patch](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md#basic-patch-format) strategy is used to merge the attributes defined at both the levels.


### Procedure
1. Specify "pod-overrides" at the component level.
    ```yaml {% title="Specify pod-overrides to override security context for container at component level" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    components:
      - name: maven
        attributes:
          pod-overrides:
            spec:
              serviceAccountName: new-service-account
        container:
          image: eclipse/maven-jdk8:latest
    ```

2. Specify "pod-overrides" at the devfile attributes level. It will be defined as a top-level attribute.
    ```yaml {% title="Specify pod-overrides to override resources for container at the devfile level" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    attributes:
      pod-overrides:
        spec:
          serviceAccountName: new-service-account
    components:
      - name: maven
        container:
          image: eclipse/maven-jdk8:latest
    ```

The data inside `pod-overrides` can also be specified as a JSON.
```yaml
  pod-overrides:
    spec: {"serviceAccountName": "new-service-account"}
```

## Additional resources
- [Defining Attributes](./defining-attributes.md)
- [Strategic Merge Patch](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md#basic-patch-format)
