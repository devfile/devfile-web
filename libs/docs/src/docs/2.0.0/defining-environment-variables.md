---
title: Defining environment variables
description: Defining environment variables
---

Environment variables are supported by the following component types:
`container`, `plugin`, `kubernetes`, `openshift`. If the component has
multiple containers, environment variables will be provisioned for each
container.

1. Specify environment variables for `container` components

    ```yaml {% title="Specify environment variables for a container components" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
          env:
            - name: GOPATH
              value: $(PROJECTS_ROOT)/go
    ```

2. Specify environment variables for `plugin` components

    ```yaml {% title="Specify environment variables for plugin components" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
      - name: theia-editor
        plugin:
          id: eclipse/che-theia/next
          memoryLimit: 2Gi
          env:
          - name: HOME
            value: $(CHE_PROJECTS_ROOT)
    ```

    {% callout title="Note!" %}
    - The variable expansion works between the environment variables, and
        it uses the Kubernetes convention for the variable references.

    - The predefined variables are available for use in custom
        definitions.
    {% /callout %}

## Additional resources

- {% docs-link section="API reference" title="Devfile schema" /%}

- {% docs-link section="General" title="Devfile samples" /%}
