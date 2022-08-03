---
title: Adding commands
description: Adding commands
---

A devfile allows to specify commands to be available for execution in a
workspace. Every command can contain a subset of actions, which are
related to a specific component in whose container it will be executed.

## Prerequisites

- [Adding schema version](./adding-schema-version)

- [Adding a name](./adding-a-name)

- [Adding projects](./adding-projects)

## Procedure

1. Add a `commands` section in the devfile, containing a list of one or
    more commands.

2. For each command, define an unique value for the mandatory `id`
    attribute.

3. For each command, define a mandatory type of one of the following
    types: `exec`, `apply`, `composite`, or `vscode-tasks`.

    ```yaml {% title="Sample command" filename="devfile.yaml" %}
    commands:
      - id: build
        exec:
        component: mysql
        commandLine: mvn clean
        workingDir: /projects/spring-petclinic
    ```

4. Define attributes for the `exec` command to run using the default
    shell in the container.

    - A `commandLine` attribute that is a command to execute.

    - A `component` attribute that specifies the container in which to
        execute the command.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.1.0
    metadata:
      name: mydevfile
    projects:
      - name: my-go-project
        clonePath: go/src/github.com/acme/my-go-project
        git:
          remotes:
            origin: "https://github.com/acme/my-go-project.git"
    components:
      - name: go-cli
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
          env:
            - name: GOPATH
              value: $(PROJECTS_ROOT)/go
            - name: GOCACHE
              value: /tmp/go-cache
    commands:
      - id: compile and run
        exec:
          component: go-cli
          commandLine: "go get -d && go run main.go"
          workingDir: "${PROJECTS_ROOT}/src/github.com/acme/my-go-project"
    ```

    - A command can have only one action, though you can use
        `composite` commands to execute several commands either
        sequentially or in parallel.

5. Command group

    A given command can be assigned to one or more groups that
    represents the nature of the command. The support groups are:
    `build`, `run`, `test` and `debug`. For each of the groups, one
    default command can be defined in each group by specifying the
    `isDefault` value.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.1.0
    metadata:
      name: mydevfile
    projects:
      - name: my-maven-project
        clonePath: maven/src/github.com/acme/my-maven-project
        git:
          remotes:
            origin: "https://github.com/acme/my-maven-project.git"
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
          commandLine: "mvn package"
          group:
            kind: build
      - id: install
        exec:
          component: maven
          commandLine: "mvn install"
          group:
            kind: build
            isDefault: true
    ```

6. Composite command

    A composite command can be defined to chain multiple commands
    together. The individual commands that are called from a composite
    command can be referenced by the `name` of the command. A `parallel`
    boolean can be specified to determine if the commands within a
    composite command are being executed sequentially or in parallel.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.1.0
    metadata:
      name: mydevfile
    projects:
      - name: my-maven-project
        clonePath: maven/src/github.com/acme/my-maven-project
        git:
          remotes:
            origin: "https://github.com/acme/my-maven-project.git"
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
          commandLine: "mvn package"
          group:
            kind: build
      - id: install
        exec:
          component: maven
          commandLine: "mvn install"
          group:
            kind: build
            isDefault: true
      - id: installandpackage
        composite:
          commands:
            - install
            - package
          parallel: false
    ```

## Additional Resources

- [API reference](./api-reference)

- [Devfile resources](./devfile-resources)
