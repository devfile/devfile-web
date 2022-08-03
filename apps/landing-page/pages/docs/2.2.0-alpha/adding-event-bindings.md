---
title: Adding event bindings
description: Adding event bindings
---

This section describes how to add an event to a v2.x devfile. An event
can have three different type of objects:

1. preStartObject

2. postStartObject

3. preStopObject

## preStartObject

You can execute preStart events as init containers for the project pod
in the order you specify the preStart events. The devfile `commandLine`
and `workingDir` are the commands for the init container. As a result,
the init container overwrites either the devfile or the container image
`command` and `args`. If you use a composite command with
`parallel: true`, the composite command executes as Kubernetes init
containers.

## postStartObject

When you create the Kubernetes deployment for the `odo` component,
execute the postStart events.

## preStopObject

Before you delete the Kubernetes deployment for the `odo` component,
execute the preStop events.

See the following list for event properties in a devfile:

#### envObject

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- name
- string
- yes
- The name of the environment variable.
---
- value
- string
- yes
- The value of the environment variable.
{% /table %}

1. Add an `events` section in the devfile, containing a list of
    `preStart` and `postStart` commands.

```yaml
commands:
  - id: init-project
    apply:
      component: tools
  - id: copy-artifacts
    exec:
      component: tools
      commandLine: 'cp files'
      workingDir: $PROJECTS_ROOT
  - id: init-cache
    exec:
      component: tools
      commandLine: 'init cache'
      workingDir: /.m2
  - id: pre-compile-cmd
    composite:
      commands:
        - copy-artifacts
        - init-cache
events:
  preStart:
    - init-project
  postStart:
    - pre-compile-cmd
```

## Additional resources

For more information on adding event bindings, see [lifecycle bindings
to bind commands](https://github.com/devfile/api/issues/32).
