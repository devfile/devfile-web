---
title: Adding kubernetes component
description: Adding kubernetes component
---

This section describes how to add either a `kubernetes` or `openshfit` component to a devfile. You can apply configurations to your devfile with  `kubernetes` or `openshift` components.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

- [Adding components](./adding-components)

## Procedure

1. Define a component using the type `kubernetes` or `openshift`.

2. Provide the content through the `uri` or `inlined` property.

    ```yaml {% title="Adding openshift component using the uri property" filename="devfile.yaml" %}
    components:
    - name: mysql
      openshift:
        uri: petclinic.yaml
    ```

    ```yaml {% title="Adding a kubernetes component using the inlined property" filename="devfile.yaml" %}
    components:
    - name: myk8deploy
        kubernetes:
          inlined: |
            apiVersion: batch/v1
            kind: Job
            metadata:
              name: pi
            spec:
              template:
                spec:
                  containers:
                  - name: job
                    image: myimage
                    command: ["some",  "command"]
                  restartPolicy: Never
    ```

3. Specify the endpoint through the endpoint property with `kubernetes` or `openshift` components.

4. Associate `kubernetes` or `openshift` components with `Apply` commands. If you do not associate `Apply` commands, they are assumed to be applied at start up.
