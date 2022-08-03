---
title: Migrating projects
description: Migrating projects
---

This section describes how to migrate projects to v2.x devfiles.

## Procedure

A new `starterProject` project type can be defined in v2.x devfiles.
Pick only one `starterProject` and use it in interactive mode. With a
`starterProject`, you only need to copy your source code, so you no
longer need to clone your Git repository.

```yaml {% title="starterProjects and projects description" filename="devfile.yaml" %}
starterProjects:
  - name: "kafka-project"
    description: "Use this app to get a nodejs application for working with kafka"
  - name: "simple-project"
    description: "Use this app to get a simple "hello world" nodejs application"
```

## Additional resources

For more information on migrating projects, go to the following GitHub
issue: [starterProjects](https://github.com/devfile/api/issues/42).
