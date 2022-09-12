---
title: Creating Devfiles With Templates
description: Creating Devfiles With Templates
---

## Prerequisites

## Procedure

1. Creating a minimal devfile

- `schemaVersion` is the only required root element

```yaml {% title="Minimal Devfile" filename="devfile.yaml" %}
schemaVersion: 2.2.0
```

2. Adding more elements to the devfile

- Adding components
    - A `name` is required for a component
    - If a `container` entity is defined, a `image` must be specified
+
```yaml {% title="Minimal Devfile with Components" filename="devfile.yaml" %}
schemaVersion: 2.2.0
components:
  - name: web
    container:
      image: quay.io/devfile/golang:latest
```
+
    - If a `kubernetes` entity is defined, a `uri` of a 

- Adding commands
    - An `id` to identify the command
    - An `exec` entity must be defined with a `commandLine` string
    and a reference to a `component`. This implies that at least 
    one component entity is defined under the root `components`
    element.

```yaml {% title="Minimal Devfile with Commands" filename="devfile.yaml" %}
schemaVersion: 2.2.0
components:
  - name: web
    container:
      image: quay.io/devfile/golang:latest
commands:
  - id: run
    exec:
      commandLine: go run main.go
      component: web
```

## Additional Resources
