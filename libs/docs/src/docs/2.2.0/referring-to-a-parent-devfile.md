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

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

## Procedure

You can refer to a parent devfile in three different ways:

- `id`

- `uri`

- `kubernetes`

### Parent referred by registry

Using the `id` when published in a registry. Provide the `registryUrl`
as well as `version`. `version` can be either the stack version string,
or `latest`. If no `version` is provided, the default version for the
stack will be used.

```yaml {% title="Parent referred by registry" filename="devfile.yaml" %}
schemaVersion: 2.2.0
metadata:
  name: my-project-dev
parent:
  id: nodejs
  registryUrl: https://registry.devfile.io/
  version: 2.0.0
```

### Parent referred by URI

Using the URI when published on a static HTTP server, such as GitHub
Gist or Pastebin.

```yaml {% title="Parent referred by URI" filename="devfile.yaml" %}
schemaVersion: 2.2.0
metadata:
  name: my-project-dev
parent:
  uri: https://raw.githubusercontent.com/devfile/registry/main/stacks/nodejs/devfile.yaml
```

### Parent identified by a Kubernetes resource

Using a Kubernetes resource name and namespace if it has been deployed
on a Kubernete cluster.

```yaml {% title="Parent identified by a Kubernetes resource" filename="devfile.yaml" %}
schemaVersion: 2.2.0
metadata:
  name: my-project-dev
parent:
  kubernetes:
    name: mydevworkspacetemplate
    namespace: mynamespace
```

## Additional resources

For more information about referring to parent devfiles, see:

- [API reference](./devfile-schema)

- [Devfile resources](./resources)
