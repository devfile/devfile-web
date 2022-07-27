---
title: Adding apply commands
description: Adding apply commands
---

Use the the `apply` command to apply a given component definition,
usually a `kubernetes`, `openshift` or an `image` component. Apply
commands are also typically bound to `preStart` and `postStop` events.

1. Define the `apply` command to apply a given component. In the
    following example, two apply commands reference an `image` component
    and a `kubernetes` component to build a docker image and to apply
    the deployment YAML for an outerloop scenario.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: python
      version: 1.0.0
      provider: Red Hat
      supportUrl: https://github.com/devfile-samples/devfile-support#support-information
      attributes:
        alpha.dockerimage-port: 8081
    parent:
      id: python
      registryUrl: 'https://registry.devfile.io'
    components:
      - name: outerloop-build
        image:
          imageName: python-image:latest
          dockerfile:
            uri: docker/Dockerfile
            buildContext: .
            rootRequired: false
      - name: outerloop-deploy
        kubernetes:
          uri: outerloop-deploy.yaml
    commands:
      - id: build-image
        apply:
          component: outerloop-build
      - id: deployk8s
        apply:
          component: outerloop-deploy
      - id: deploy
        composite:
          commands:
            - build-image
            - deployk8s
          group:
            kind: deploy
            isDefault: true
    ```
