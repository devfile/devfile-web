---
title: Adding event bindings
description: Adding event bindings
---

This section describes how to add an event to a v2.x devfile. An event
specified in a v1.x devfile still works in a v2.x devfile.

## Procedure

1. Add an `events` section in the devfile, containing a list of
    `preStart` and `postStart` commands.

    ```yaml {% title="v2" filename="devfile.yaml" %}
    commands:
      - id: init-project
        apply:
          component: tools
      - id: copy-artifacts
        exec:
          component: tools
          commandLine: "cp files"
          workingDir: $PROJECTS_ROOT
      - id: init-cache
        exec:
          component: tools
          commandLine: "init cache"
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

## Additional Resources

For more information on adding event bindings, go to the following
GitHub issue: [lifecycle bindings to bind
commands](https://github.com/devfile/api/issues/32).
