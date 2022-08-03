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
    types: `plugin`, `kubernetes` or `container`.

4. [Adding plugin component](./adding-plugin-component)

5. [Adding kubernetes component](./adding-kubernetes-component)

6. [Adding container component](./adding-container-component)

7. [Specifying persistent storage](./specifying-persistent-storage)

8. [Limiting resources usage](./limiting-resources-usage)

9. [Defining environment variables](./defining-environment-variables)

10. [Defining endpoints](./defining-endpoints)

11. [Defining kubernetes resources](./defining-kubernetes-resources)

## Additional resources

- [API reference](./api-reference)

- [Devfile samples](./devfile-samples)
