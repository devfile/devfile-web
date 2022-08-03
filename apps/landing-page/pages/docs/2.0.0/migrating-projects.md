---
title: Migrating projects
description: Migrating projects
---

There are NO major changes in the `projects` section of the devfile. A
project specified in a v1.0 devfile will work as it is in a devfile
v2.0.

## Procedure

1. The only major change is the addition of a new kind of project:
    `starterProjects`. Those are supposed to be used in interactive mode
    only (user pick one) and the git repo get not be cloned but only
    source code get copied (kind of what
    `git archive --remote=<repository URL> | tar -t` would do).

    ```yaml {% title="starterProjects and projects description" filename="devfile.yaml" %}
    starterProjects:
      - name: "kafka-project"
        description: "Use this app to get a nodejs application for working with kafka"
      - name: "simple-project"
        description: "Use this app to get a simple "hello world" nodejs application"
    ````

## Additional Resources

- See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/42).
