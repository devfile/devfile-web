---
title: Defining environment variables
description: Defining environment variables
---

Environment variables are supported by the `container` component and the
`exec` command. If the component has multiple containers, environment
variables are provisioned for each container.

## Procedure

1. Specify environment variables for `container` components

    ```yaml {% title="Specifying environment variables for a container component" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: mydevfile
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
          env:
            - name: gopath
              value: $(PROJECTS_ROOT)/go
    ```
