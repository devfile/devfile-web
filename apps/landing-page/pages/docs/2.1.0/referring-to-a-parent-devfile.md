---
title: Referring to a parent devfile
description: Referring to a parent devfile
---

This section describes how to designate a parent devfile to a given
devfile. If you designate a parent devfile, the given devfile inherits
all its behavior from its parent. Still, you can use the child devfile
to override certain content from the parent devfile. If you override the
correct content, you can reuse the same parent devfile in multiple other
devfiles. If you do reuse a parent devfile, the parent turns into a
stack that is used in multiple other devfiles.

- Define the `schemaVersion` to v2.x. If you need to define your
    `schemaVersion`, go to
    [adding schema version](./adding-schema-version).

- Define a name for the devfile. If you need to define a name for your
    devfile, go to [adding a name](./adding-a-name).

## Procedure

You can refer to a parent devfile in three different ways:

- `id`

- `uri`

- `kubernetes`

### Parent referred by registry

Using its `id` if it has been published in a registry.

```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.1.0
metadata:
  name: my-project-dev
parent:
    id: redhat/nodejs
    registryUrl: https://devfile-registry.io/
```

### Parent referred by uri

Using the URI if it has been published on a static http server (like
gist or pastebin).

```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.1.0
metadata:
  name: my-project-dev
parent:
    uri: https://raw.githubusercontent.com/devfile/registry/main/stacks/nodejs/devfile.yaml
```

### Parent identified by a Kubernetes resource

Using a Kubernetes resource name and namespace if it has been deployed
on a Kubernete cluster.

```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.1.0
metadata:
  name: my-project-dev
parent:
    kubernetes:
        name: mydevworkspacetemplate
        namespace: mynamespace
```

## Additional resources

For more information on referring to parent devfiles, go to the
following topics:

- [API reference](./api-reference)

- [Devfile resources](./devfile-resources)
