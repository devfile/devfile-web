---
title: Migrating components
description: Migrating components
---

This section describes how to migrate components to devfile v2. There
ARE major changes in the `components` section of the devfile. A
component specified in a v1.0 devfile will NOT work as it is in a
devfile v2.0.

## Procedure

1. Component is a polymophic type

    For a better syntax validation component now is defined as a
    polymorphic type and can be implemented as `container`,
    `kubernetes`, `openshift`, `plugin` or `volume`.

    ```yaml {% title="v2.0" filename="devfile.yaml" %}
    components:
      - container:
            image: maven
            ...
      - container:
            image: nodejs
            ...
      - kubernetes:
            reference: https://.../mongo.yaml
    ```

    See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/4).

2. Shared Volumes Across Components. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/19).

3. Out of Main Pod Compoenents. See [corresponding
    issue](https://github.com/devfile/api/issues/48).

4. Replace Alias with Name. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/9).

5. Renaming dockerimage component type. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/8).

6. Specify sources path for containers. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/17).

7. Specify size of volume for component. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/14).

8. Containers endpoints (routes/ingresses). See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/33).

## Additional Resources

- Component is a polymophic type. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/4).

- Shared Volumes Across Components. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/19).

- Out of Main Pod Compoenents. See [corresponding
    issue](https://github.com/devfile/api/issues/48).

- Replace Alias with Name. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/9).

- Renaming dockerimage component type. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/8).

- Specify sources path for containers. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/17).

- Specify size of volume for component. See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/14).

- Containers endpoints (routes/ingresses). See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/33).
