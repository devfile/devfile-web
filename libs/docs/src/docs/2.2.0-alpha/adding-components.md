---
title: Adding components
description: Adding components
---

Each component in a single devfile must have a unique name and use one
of the objects: `container`, `kubernetes`, `openshift`, or `volume`. See
the following tables for component properties in a devfile:

#### Component object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `container`
- `componentObject`
- no
- The list of containers.
---
- `kubernetes`
- `componentObject`
- no
- The Kubernetes cluster.
---
- `openshift`
- `componentObject`
- no
- The OpenShift container.
---
- `volume`
- `componentObject`
- no
- The list of volume components.
---
{% /table %}

#### container object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `name`
- `string`
- yes
- The name of your container.
---
- `image`
- `string`
- yes
- The image version.
---
- `command`
- `Array<string>`
- no
- Modifies the `entrypoint` command of the container created from the image. When not defined, use the default from the image.
---
- `memoryLimit`
- `string`
- no
- The memory limit that you use with your container.
---
- `mountSources`
- `boolean`
- no
- Choose to mount the source or not.
---
- `sourceMapping`
- `string`
- no
- The path in the container where you transfer and mount the project sources. This path is available in the container through the environment, `PROJECTS_ROOT`.
---
- `endpoints`
- `endpointObject`
- no
- The list of endpoints to use.
---
- `volumeMounts`
- `volumeMountsObject`
- no
- The list of volumes to mount.
---
- `environment`
- `envObject`
- no
- The list of environment variables to use.
{% /table %}

#### endpoint object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `name`
- `string`
- yes
- The name of your endpoint.
---
- `targetPort`
- `integer`
- yes
- The port number that you target.
---
- `exposure`
- `string`
- no
- Use the following attributes to describe how to expose the endpoints on the network: `public`, `internal`, `none`. If not specified, the default attribute is `public`.
---
- `path`
- `string`
- no
- The path to the endpoint URL.
---
- `protocol`
- `string`
- no
- Use the following attributes to describe the application and transport protocols of the traffic that goes through the endpoint: `http`, `https`, `ws`, `wss`, `tcp`, `udp`. If not specified, the default attribute is `http`.
---
- `secure`
- `boolean`
- no
- Choose whether to define the endpoint as secure.
{% /table %}

#### volumeMount object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `name`
- `string`
- yes
- The name of the volume components that you use.
---
- `path`
- `string`
- no
- The path in the component container where you mount the volume.
{% /table %}

#### volume object

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `name`
- `string`
- yes
- The name of the volume component.
---
- `size`
- `string`
- no
- The size of the storage you create.
{% /table %}

## Prerequisites

- [Adding schema version](./versions)

- [Adding a name](./metadata)

## Procedure

1. Add a `components` section in the devfile, containing a list of one
    or more components.

2. For each component, define a unique value for the mandatory `name`
    attribute.

3. For each component, define one of the following types for the
    mandatory `type` attribute: `kubernetes`, `container`, `openshift`,
    or `volume`.

4. [Adding a kubernetes or openshift component](./adding-a-kubernetes-or-openshift-component)

5. [Adding a container component](./adding-a-container-component)

6. [Adding a volume component](./adding-a-volume-component)

7. [Adding an image component](./adding-an-image-component)

8. [Specifying persistent storage](./specifying-persistent-storage)

9. [Limiting resources usage](./limiting-resources-usage)

10. [Defining environment variables](./defining-environment-variables)

11. [Defining endpoints](./defining-endpoints)

12. [Defining kubernetes resources](./defining-kubernetes-resources)

## Additional resources

- [API reference](./devfile-schema)

- [Devfile resources](./resources)
