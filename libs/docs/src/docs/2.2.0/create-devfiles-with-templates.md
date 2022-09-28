---
title: Creating Devfiles With Templates
description: Creating Devfiles With Templates
---

With most dev tools, you can utilize the devfile registry to 
fetch the stacks you need to begin development of your project. 
Sometimes however you might need to create your devfile from 
scratch or create your own template devfile for your stack. This 
guide will run through starting from a minimum devfile and build
into sample templates for common use cases.

## Prerequisites

- [Versions](./versions)
- [Metadata](./metadata)
- [Adding components](./adding-components)
- [Adding commands](./adding-commands)

## Procedure

1. Creating a minimal devfile
    - `schemaVersion` is the only required root element
    - `metadata` is optional but recommend to have in your templates
    ```yaml {% title="Minimal Devfile" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    ```
    ```yaml {% title="Minimal Devfile with Metadata" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: devfile-sample
      version: 2.0.0
    ```
2. Creating a web service
    1. Template Metadata
        - Set the template `name` and `version`
          ```yaml {% filename="devfile.yaml" %}
          schemaVersion: 2.2.0
          metadata:
            name: web-service
            version: 1.0.0
          ```
    2. Setup component
        - A `name` is required for a component
        - If a `container` entity is defined, a `image` must be 
        specified
            ```yaml {% filename="devfile.yaml" %}
            schemaVersion: 2.2.0
            components:
              - name: web
                container:
                  image: quay.io/devfile/golang:latest
            ```
        - Though `endpoints` is optional it is needed to expose 
        the port for web connections, this requires an endpoint `name`
        and `targetPort` to expose (e.g. `8080` if that is your http 
        port)
            ```yaml {% filename="devfile.yaml" %}
            schemaVersion: 2.2.0
            components:
              - name: web
                container:
                  endpoints:
                    - name: http
                      targetPort: 8080
                  image: quay.io/devfile/golang:latest
            ```
    3. Adding commands
        - An `id` to identify the command
        - An `exec` entity must be defined with a `commandLine` string
        and a reference to a `component`. This implies that at least 
        one component entity is defined under the root `components`
        element.
            ```yaml {% filename="devfile.yaml" %}
            commands:
              - id: run
                exec:
                  commandLine: go run main.go
                  component: web
            ```
        - Set the `workingDir` to where the project source is 
        stored
          ```yaml {% filename="devfile.yaml" %}
          commands:
            - id: run
              exec:
                commandLine: go run main.go
                component: web
                workingDir: ${PROJECT_SOURCE}
          ```
        - Command groups can be used to define automation useful
        for executing a web service
          ```yaml {% filename="devfile.yaml" %}
          commands:
            - id: build
              exec:
                commandLine: go build main.go
                component: web
                workingDir: ${PROJECT_SOURCE}
                group:
                  kind: build
                  isDefault: true
            - id: run
              exec:
                commandLine: ./main
                component: web
                workingDir: ${PROJECT_SOURCE}
                group:
                  kind: run
                  isDefault: true
          ```
    4. Starter Project
        ```yaml {% filename="devfile.yaml" %}
        starterProjects:
          - name: web-starter
            git:
              remotes:
                origin: https://github.com/devfile-samples/devfile-stack-go.git
        ```
    ```yaml {% title="Complete Web Service Template" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: web-service
      version: 1.0.0
    components:
      - name: web
        container:
          endpoints:
            - name: http
              targetPort: 8080
          image: quay.io/devfile/golang:latest
    commands:
      - id: build
        exec:
          commandLine: go build main.go
          component: web
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: build
            isDefault: true
      - id: run
        exec:
          commandLine: ./main
          component: web
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: run
            isDefault: true
    starterProjects:
      - name: web-starter
        git:
          remotes:
            origin: https://github.com/devfile-samples/devfile-stack-go.git
    ```


## Additional Resources
