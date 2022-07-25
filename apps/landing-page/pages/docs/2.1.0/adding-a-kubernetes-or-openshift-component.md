---
title: Adding a kubernetes or openshift component
description: Adding a kubernetes or openshift component
---

You can add either a `kubernetes` or `openshift` component to a devfile.

- [???](#adding-schema-version-to-a-devfile.adoc)

- [???](#adding-a-name-to-a-devfile.adoc)

- [???](#adding-components-to-a-devfile.adoc)

1.  Define a component using the `kubernetes` or `openshift` property.

2.  Provide the content through the `uri` or `inlined` property.

```yaml
components:
  - name: mysql
    openshift:
      uri: petclinic.yaml
components:
- name: myk8deploy
  kubernetes:
    inlined: |
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
```

3.  Specify the endpoint through the endpoint property with `kubernetes`
    or `openshift` components.

4.  By default `kubernetes` or `openshift` components are not going to
    be deployed. Specify `deployByDefault=true` if you want to apply the
    component at start up.

5.  Associate `kubernetes` or `openshift` components with `Apply`
    commands wth `deploy` command group kind. If the `kubernetes` or
    `openshift` component uses an image built by an image component
    defined in the devfile, you can create a composite `deploy` command
    to build the image and deploy the Kubernetes or openshift component.
    For more information on `deploy` commands, see

[???](#adding-a-command-group-to-a-devfile.adoc)
