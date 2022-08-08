---
title: Understanding a devfile registry
description: Understanding a devfile registry
---

A devfile registry is a service that stores and provides devfile stacks
to Kubernetes developer tools like `odo`, Eclipse Che, and the OpenShift
Developer Console. Therefore, you can access devfiles through the
devfile registry. Devfile registries are based on the Oracle Cloud
Infrastructure (OCI) Specification, and devfile stacks are stored as OCI
artifacts in the registry.

Each devfile stack corresponds to a specific runtime or framework, such
as Node.js, Quarkus, or WildFly. A devfile stack also contains resources
like a `devfile.yaml` file, logo, and outer loop resources. Outer loop
runs on containers and entails code reviews and integration tests,
typically automated by continuous integration/continuous delivery
(CI/CD) pipelines. These devfile stacks provide developers with
templates to get started developing cloud-native applications.

## Devfile registry components

A devfile registry has two components:

- Devfile index server

- OCI registry server

### Devfile index container

The devfile index container image does the following actions:

- Uses the `index.json` file to obtain metadata about the stacks and
    samples and hosts this metadata in the registry for tools to
    consume.

- Bootstraps the OCI registry with the devfile stacks.

- Provides an API to interact with the OCI registry and to retrieve
    devfile stacks.

### OCI registry

The devfile stacks in a devfile registry are stored in an OCI-compatible
artifact registry. The artifact registry is based on the reference
implementation of an OCI registry.

When a devfile registry is deployed, the stacks belonging to the devfile
registry are pushed to the OCI registry as multi-layer artifacts.

## Types of devfile registries

There are multiple types of devfile registries to access devfile stacks
and tools.

### Public community registry

The public community registry provides stacks for various community
tools to consume, such as Node.js, Quarkus, and Open Liberty.

Locate the source for the stacks in the public community registry in the
[devfile/registry repository](https://github.com/devfile/registry).

### On-cluster devfile registry

Devfile registries can be operated on private Kubernetes clusters,
deployed using either the devfile registry Operator or the devfile
registry Helm Chart.

The on-cluster devfile registries can be configured with custom devfile
stacks suited to the needs of the owner organization.

## Additional resources

- [Building a custom devfile registry](./building-a-custom-devfile-registry).
