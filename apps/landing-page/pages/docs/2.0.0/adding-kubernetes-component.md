---
title: Adding kubernetes component
description: Adding kubernetes component
---

This section describes how to add a `kubernetes` component to a devfile.
A complex component type that allows to apply configuration from a list
of Kubernetes or OpenShift components.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

- [Adding components](./adding-components)

## Procedure

1. Define a component using the type `kubernetes`.

2. The content can be provided through the `reference` attribute, which
    points to the file with the component content.

    ```yaml {% title="Adding kubernetes component using the reference attribute" filename="devfile.yaml" %}
    components:
      - name: mysql
        kubernetes:
          reference: petclinic.yaml
          selector:
            app.kubernetes.io/name: mysql
            app.kubernetes.io/component: database
            app.kubernetes.io/part-of: petclinic
    ```

3. Alternatively, to post a devfile with such components to REST API,
    the contents of the Kubernetes or OpenShift list can be embedded
    into the devfile using the `referenceContent` field:

    ```yaml {% title="Adding kubernetes component using the referenceContent attribute" filename="devfile.yaml" %}
    components:
      - name: mysql
        kubernetes:
          reference: petclinic.yaml
          referenceContent: |
                kind: List
                items:
                -
                  apiVersion: v1
                  kind: Pod
                  metadata:
                  name: ws
                  spec:
                  containers:
                  ... etc
    ```

4. Overriding container entrypoints. As with the [`container`
    component](#adding-container-component.adoc), it is
    possible to override the entrypoint of the containers contained in
    the Kubernetes or OpenShift list using the `command` and `args`
    properties (as
    [understood](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes)
    by Kubernetes).

    There can be more containers in the list (contained in Pods or Pod
    templates of deployments). It is therefore necessary to select which
    containers to apply the entrypoint changes to as follows:

    ```yaml {% title="Overriding container entrypoints" filename="devfile.yaml" %}
    components:
      - name: appDeployment
        kubernetes:
          reference: app-deployment.yaml
          entrypoints:
          - parentName: mysqlServer
            command: ['sleep']
            args: ['infinity']
          - parentSelector:
            app: prometheus
            args: ['-f', '/opt/app/prometheus-config.yaml']
    ```

    The `entrypoints` list contains constraints for picking the
    containers along with the `command` and `args` parameters to apply
    to them. In the example above, the constraint is
    `parentName: mysqlServer`, which will cause the command to be
    applied to all containers defined in any parent object called
    `mysqlServer`. The parent object is assumed to be a top level object
    in the list defined in the referenced file, which is
    `app-deployment.yaml` in the example above.

    Other types of constraints (and their combinations) are possible:

    - `containerName` the name of the container

    - `parentName` the name of the parent object that (indirectly) contains the
        containers to override

    - `parentSelector` the set of labels the parent object needs to have

    A combination of these constraints can be used to precisely locate
    the containers inside the referenced Kubernetes list.

5. Overriding container environment variables

    To provision or override entrypoints in a Kubernetes or OpensShift
    component, configure it in the following way:

    ```yaml {% title="Overriding container environment variables" filename="devfile.yaml" %}
    components:
      - name: appDeployment
        kubernetes:
          reference: app-deployment.yaml
          env:
            - name: ENV_VAR
              value: value
    ```

    This is useful for temporary content or without access to editing
    the referenced content. The specified environment variables are
    provisioned into each init container and containers inside all Pods
    and Deployments.

6. Specifying mount-source option

    To specify a project sources directory mount into container(s), use
    the `mountSources` parameter:

    ```yaml {% title="Specifying mount-source option" filename="devfile.yaml" %}
    components:
      - name: appDeployment
        kubernetes:
          reference: app-deployment.yaml
          mountSources: true
    ```

    If enabled, project sources mounts will be applied to every
    container of the given component. This parameter is also applicable
    for `plugin` type components.
