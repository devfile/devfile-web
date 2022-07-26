Connect multiple commands together by defining a composite command.

- [???](/docs/2.1.0/adding-schema-version-to-a-devfile.adoc)

- [???](/docs/2.1.0/adding-a-name-to-a-devfile.adoc)

- [???](/docs/2.1.0/adding-projects-to-a-devfile.adoc)

1. Reference the individual commands that are called from a composite
    command by using the `name` of the command.

2. Specify whether to run the commands within a composite command in
    sequence or parallel.

3. Define the `parallel` boolean.

```yaml
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
  - id: installandpackage
    composite:
      commands:
        - install
        - package
      parallel: false
```
