---
title: Adding event bindings
description: Adding event bindings
---

Adding event bindings.

## Procedure

1. Add an `events` section in the devfile, containing a list of
    `preStart` and `postStart` commands.

    ```yaml {% title="v2.0" filename="devfile.yaml" %}
    components:
      - container:
          name: "copier"
          image: ''
      - container:
          name: "maven"
          image: ''
      - plugin:
          id: theia
    Commands:
    containerBuild:
    reference:
    composite:

      - exec:
          name: "copyNeededFiles"
          component: "copier"
          commandLine: "cp somefile"
      - exec:
          name: "buildAll"
          component: "maven"
          commandLine: "mvn ..."
      - vsCodeTask:
          name: "openFile"
          component: "theia"
    events:
      preStart:
        - "copyNeededFiles"
      postStart:
        - "buildAll"
        - "openFile"
    ```

## Additional Resources

- See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/32).
