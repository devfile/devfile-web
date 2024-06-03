---
title: Adding a command group
description: Adding a command group
---

Create command groups to help automate your devfile.

## Procedure

1. Assign a given command to one or more groups that represent the
    nature of the command.

2. Use the following supported group kinds: `build`, `run`, `test`,
`debug` or `deploy`

3. At most, there can only be one default command for each group kind.
    Set the default command by specifying `isDefault` to `true`.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: mydevfile
    projects:
      - name: my-maven-project
        clonePath: maven/src/github.com/acme/my-maven-project
        git:
          remotes:
            origin: 'https://github.com/acme/my-maven-project.git'
    components:
      - name: maven
        container:
          image: eclipse/maven-jdk8:latest
          mountSources: true
          command: ['tail']
    commands:
      - id: package
        exec:
          component: maven
          commandLine: 'mvn package'
          group:
            kind: build
      - id: install
        exec:
          component: maven
          commandLine: 'mvn install'
          group:
            kind: build
            isDefault: true
    ```

4. Use the `deploy` kind to reference a deploy command for an outerloop
   scenario.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: python
      version: 1.0.0
      provider: Red Hat
      supportUrl: https://github.com/devfile-samples/devfile-support#support-information
      attributes:
        alpha.dockerimage-port: 8081
    parent:
      id: python
      registryUrl: 'https://registry.devfile.io'
    components:
      - name: outerloop-build
        image:
          imageName: python-image:latest
          dockerfile:
            uri: docker/Dockerfile
            buildContext: .
            rootRequired: false
      - name: outerloop-deploy
        kubernetes:
          uri: outerloop-deploy.yaml
    commands:
      - id: build-image
        apply:
          component: outerloop-build
      - id: deployk8s
        apply:
          component: outerloop-deploy
      - id: deploy
        composite:
          commands:
            - build-image
            - deployk8s
          group:
            kind: deploy
            isDefault: true
    ```
