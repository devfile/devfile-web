---
title: Adding components
description: Adding components
---

Each component in a single devfile must have a unique name and use one
of the objects: `container`, `kubernetes`, `openshift`, `image` or `volume`.

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

## Procedure

1. Add a `components` section in the devfile, containing a list of one
    or more components.

2. For each component, define a unique value for the mandatory `name`
    property.

3. Define one of the following types for the
    component: `kubernetes`, `container`, `openshift`, `image`,
    or `volume`.

4. [Adding a kubernetes or openshift component](./adding-a-kubernetes-or-openshift-component)

5. [Adding a container component](./adding-a-container-component)

6. [Adding an image component](./adding-an-image-component)

7. [Adding a volume component](./adding-a-volume-component)

8. [Limiting resources usage](./limiting-resources-usage)

9.  [Defining environment variables](./defining-environment-variables)

10. [Defining endpoints](./defining-endpoints)

11. [Defining kubernetes resources](./defining-kubernetes-resources)

## Additional resources

- [API reference](./devfile-schema)

- [Devfile resources](./resources)
