---
title: Referring to a parent devfile
description: Referring to a parent devfile
---

It is possible to refer to another devfile as a parent to a given
devfile. If a parent is specified, the devfile will inherit all
behaviour from the parent. Part of the content of the parent can be
overridden in the child devfile. That allows refering a devfile (the
parent) from a distinct devfile and makes it possible to reuse in
multiple devfiles the same parent (the stack).

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

## Procedure

1. A parent devfile can be referenced in 3 different ways: `id`, `uri`
    or `kubernetes`.

    - Parent referred by registry

        Using its `id` if it has been published in a registry.

        ```yaml {% filename="devfile.yaml" %}
        schemaVersion: 2.0.0
        metadata:
          name: my-project-dev
        parent:
            id: nodejs
            registryUrl: https://devfile-registry.io/
        ```

    - Parent referred by uri
  
        Using the URI if it has been published on a static http server (like
        gist or pastebin).

        ```yaml {% filename="devfile.yaml" %}
        schemaVersion: 2.0.0
        metadata:
          name: my-project-dev
        parent:
            uri: https://raw.githubusercontent.com/eclipse/che-devfile-registry/master/devfiles/nodejs/devfile.yaml
        ```

    - Parent identified by a Kubernetes resource
  
        Using a Kubernetes resource name, namespace and selector if it has
        been deployed on a Kubernete cluster.

        ```yaml {% filename="devfile.yaml" %}
        schemaVersion: 2.0.0
        metadata:
          name: my-project-dev
        parent:
            kubernetes:
                name: mydevworkspacetemplate
                namespace: mynamespace
        ```

## Additional Resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
