---
title: Adding a kubernetes or openshift component
description: Adding a kubernetes or openshift component
---

You can add either a `kubernetes` or `openshift` component to a devfile.

## Prerequisites

- [???](/docs/2.1.0/adding-schema-version-to-a-devfile.adoc)

- [???](/docs/2.1.0/adding-a-name-to-a-devfile.adoc)

- [???](/docs/2.1.0/adding-components-to-a-devfile.adoc)

## Procedure

1. Define a component using the `kubernetes` or `openshift` property.

2. Provide the content through the `uri` or `inlined` property.

    ~~~yaml {% title="Adding an openshift component using the `uri` property" filename="devfile.yaml" %}
    components:
      - name: mysql
        openshift:
          uri: petclinic.yaml
    ~~~

    ~~~yaml {% title="Adding a `kubernetes` component using the `inlined` property" filename="devfile.yaml" %}
    components:
    - name: myk8deploy
      kubernetes:
        inlined:
          apiVersion: batch/v1
          kind: Job
          metadata:
            name: pi
          spec:
            template:
              spec:
                containers:
                - name: job
                  image: myimage
                  command: ["some",  "command"]
                restartPolicy: Never
    ~~~

3. Specify the endpoint through the endpoint property with `kubernetes`
    or `openshift` components.

4. By default `kubernetes` or `openshift` components are not going to
    be deployed. Specify `deployByDefault=true` if you want to apply the
    component at start up.

5. Associate `kubernetes` or `openshift` components with `Apply`
    commands wth `deploy` command group kind. If the `kubernetes` or
    `openshift` component uses an image built by an image component
    defined in the devfile, you can create a composite `deploy` command
    to build the image and deploy the Kubernetes or openshift component.
    For more information on `deploy` commands, see

[???](/docs/2.1.0/adding-a-command-group-to-a-devfile.adoc)
