---
title: Adding components
description: Adding components
---

Each component in a single devfile must have a unique name.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

## Procedure

1. Add a `components` section in the devfile, containing a list of one
    or more components.

2. For each component, define an unique value for the mandatory `name`
    attribute.

3. For each component, define a mandatory type of one of the following
    types: `kubernetes`, `container` or `volume`.

4. [Adding kubernetes component](./adding-kubernetes-component)

5. [Adding container component](./adding-container-component)

6. [Specifying persistent storage](./specifying-persistent-storage)

7. [Limiting resources usage](./limiting-resources-usage)

8. [Defining environment variables](./defining-environment-variables)

9. [Defining endpoints](./defining-endpoints)

10. [Defining kubernetes resources](./defining-kubernetes-resources)

## Additional Resources

- [API reference](./devfile-schema)

- [Devfile resources](./devfile-resources)
