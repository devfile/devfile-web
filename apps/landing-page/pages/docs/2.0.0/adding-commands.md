---
title: Adding commands
description: Adding commands
---

A devfile allows to specify commands to be available for execution in a
workspace. Every command can contain a subset of actions, which are
related to a specific component in whose container it will be executed.

## Prerequisites

- {% docs-link section="Quick start" title="Versions" /%}

- {% docs-link section="Quick start" title="Metadata" /%}

- {% docs-link section="General" title="Adding projects" /%}

## Procedure

1. Add a `commands` section in the devfile, containing a list of one or
    more commands.

2. For each command, define an unique value for the mandatory `id`
    attribute.

3. For each command, define a mandatory type of one of the following
    types: `exec` or `vscode-tasks`.

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
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
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
          runAsUser: root
    ```

    - Any component on which commands are executed must define a
        `name` attribute. This name is used to reference the component
        in the command definition. Example: `name: go-cli` in the
        component definition and `component: go-cli` in the command
        definition.

    - A command can have only one action, though you can use
        `composite` commands to execute several commands either
        sequentially or in parallel.

5. Define attributes for the `vscode-task` or `vscode-launch` command
    to run using the Editor.

    If the editor in the workspace supports it, the devfile can specify
    additional configuration in the editor-specific format. This is
    dependent on the integration code present in the workspace editor
    itself and so is not a generic mechanism.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
    projects:
      - name: my-go-project
        clonePath: go/src/github.com/acme/my-go-project
        git:
          remotes:
            origin: "https://github.com/acme/my-go-project.git"
    commands:
      - id: task
        vscode-task:
          name: tasks
          referenceContent: >
              {
                  "version": "2.0.0",
                  "tasks": [
                      {
                          "label": "create test file",
                          "type": "shell",
                          "command": "touch ${workspaceFolder}/test.file"
                      }
                  ]
              }
    ```

This example shows association of a `tasks.json` file with a devfile.
Notice the `vscode-task` type that instructs the editor to interpret
this command as a tasks definition and `referenceContent` attribute that
contains the contents of the file itself. You can also save this file
separately from the devfile and use `reference` attribute to specify a
relative or absolute URL to it.

1. Command group

    A given command can be assigned to one or more groups that
    represents the nature of the command. The support groups are:
    `build`, `run`, `test` and `debug`. For each of the groups, one
    default command can be defined in each group by specifying the
    `isDefault` value.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
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

2. Composite command

    A composite command can be defined to chain multiple commands
    together. The individual commands that are called from a composite
    command can be referenced by the `name` of the command. A `parallel`
    boolean can be specified to determine if the commands within a
    composite command are being executed sequentially or in parallel.

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
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
      - id: installAndPackage
        composite:
          commands:
            - install
            - package
          parallel: false
    ```

3. Command preview URL

    It is possible to specify a preview URL for commands that expose web
    UI. This URL is offered for opening when the command is executed.

    ```yaml {% filename="devfile.yaml" %}
    commands:
        - id: tasks
          exec:
            previewUrl:
              port: 8080     
              path: /myweb   
            component: go-cli
            commandLine: "go run webserver.go"
            workingDir: ${PROJECTS_ROOT}/webserver
    ```

    - TCP port where the application listens. Mandatory parameter.

    - The path part of the URL to the UI. Optional parameter. The
        default is root (`/`).

The example above opens `++http://__<server-domain>__/myweb++`, where
`_<server-domain>_` is the URL to the dynamically created Kubernetes
Ingress or OpenShift Route.

## Additional resources

- {% docs-link section="API reference" title="Devfile schema" /%}

- {% docs-link section="General" title="Devfile samples" /%}
