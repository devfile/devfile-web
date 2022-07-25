Use the the `exec` command to automate the container actions.

1.  Define attributes for the `exec` command to run using the default
    shell in the container.

    - A `commandLine` attribute that is a command to run.

    - A `component` attribute that specifies the container in which to
      run the command. The `component` attribute value must correspond
      to an existing container component name.

```yaml
schemaVersion: 2.2.0
metadata:
  name: mydevfile
projects:
  - name: my-go-project
    clonePath: go/src/github.com/acme/my-go-project
    git:
      remotes:
        origin: 'https://github.com/acme/my-go-project.git'
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
      commandLine: 'go get -d && go run main.go'
      workingDir: '${PROJECTS_ROOT}/src/github.com/acme/my-go-project'
```

        A command can have only one action, though you can use
        `composite` commands to run several commands either in sequence
        or in parallel.
