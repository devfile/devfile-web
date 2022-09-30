---
title: Creating Devfiles With Templates
description: Creating Devfiles With Templates
---

Most dev tools can utilize the devfile registry to 
fetch the stacks needed to begin development on projects. 
Sometimes however there might be a need to create a devfile 
from scratch or create custom devfile template(s). 
This guide will run through starting from a minimum devfile and 
build into sample templates for common use cases.

## Prerequisites

- [Versions](./versions)
- [Metadata](./metadata)
- [Adding components](./adding-components)
- [Adding commands](./adding-commands)

## Procedure

1. Creating a minimal devfile
    - `schemaVersion` is the only required root element
    - `metadata` is optional but recommend to have in your 
    templates
    ```yaml {% title="Minimal Devfile" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    ```
    ```yaml {% title="Minimal Devfile with Metadata" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: devfile-sample
      version: 2.0.0
    ```
2. Creating a web service template
    1. Template `metadata`
        - Set the template `name` and `version`
        - Set a `description` for the template
        - Set the `projectType` and `language` to describe what
        kind of stack is being used
        - Set `provider` to tell who is providing this template
        - Set `tags` to give keyword which describe the elements
        of the stack
        - Set `architectures` to specify the platforms support in 
        the template
        - For improved readability on devfile registries set `displayName` for the title to display for this template and `icon` to tie a stack icon to the template
        ```yaml {% filename="devfile.yaml" %}
          schemaVersion: 2.2.0
          metadata:
            name: web-service
            version: 1.0.0
            description: A web service template.
            projectType: Go
            language: Go
            provider: Red Hat
            tags: [ 'Go', 'Gin', 'pq' ]
            architectures: [ 'amd64' ]
            displayName: Simple Web Service
            icon: https://raw.githubusercontent.com/devfile-samples/devfile-stack-icons/main/golang.svg
          ```
    2. Setup `components`
        - A `name` is required for a component
        - If a `container` entity is defined, a `image` must be 
        specified
        - Though `endpoints` is optional it is needed to expose 
        the port for web connections, this requires an endpoint `name`
        and `targetPort` to expose (e.g. `8080` if that is your http 
        port)
        - The web service might need to connect to a external 
        database using environment variables, in this case 
        environment variable names and values defined for the 
        container component under `env`
        ```yaml {% filename="devfile.yaml" %}
        components:
          - name: web
            container:
              endpoints:
                - name: http
                  targetPort: 8080
              env:
                DATABASE_HOST: db.example.com
                DATABASE_PORT: 5432
                DATABASE_NAME: dev
                DATABASE_USER: devuser
                DATABASE_PASSWORD: devpassword
              image: quay.io/devfile/golang:latest
        ```
    3. Adding `commands`
        - An `id` to identify the command
        - An `exec` entity must be defined with a `commandLine` string
        and a reference to a `component`. This implies that at least 
        one component entity is defined under the root `components`
        element.
        - Set the `workingDir` to where the project source is 
        stored
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
    4. Define starter projects
        - Add a starter project under `starterProjects` which
        includes at least a `name` and remote location, either
        `git` or `zip`
        - It is recommended to include a starter project 
        description
          ```yaml {% filename="devfile.yaml" %}
          starterProjects:
            - name: web-starter
              description: A web service starting point.
              git:
                remotes:
                  origin: https://github.com/devfile-samples/devfile-stack-go.git
          ```
    ```yaml {% title="Complete Web Service Template" filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: web-service
      version: 1.0.0
      description: A web service template.
      projectType: Go
      language: Go
      provider: Red Hat
      tags: [ 'Go', 'Gin', 'pq' ]
      architectures: [ 'amd64' ]
      displayName: Simple Web Service
      icon: https://raw.githubusercontent.com/devfile-samples/devfile-stack-icons/main/golang.svg
    components:
      - name: web
        container:
          endpoints:
            - name: http
              targetPort: 8080
          env:
            DATABASE_HOST: db.example.com
            DATABASE_PORT: 5432
            DATABASE_NAME: dev
            DATABASE_USER: devuser
            DATABASE_PASSWORD: devpassword
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
        description: A web service starting point.
        git:
          remotes:
            origin: https://github.com/devfile-samples/devfile-stack-go.git
    ```


## Additional Resources
