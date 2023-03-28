---
title: Defining variables
description: Defining variables
---

The `variables` object is a map of variable name-value pairs that you can use for string replacement in the devfile. Variables are referenced using the syntax `{{variable-name}}` to insert the corresponding value in string fields in the devfile.

You can define variables at the top level of the devfile or in the `parent` object. String replacement with variables cannot be used for:

* `schemaVersion`, `metadata`, or `parent` source
* Element identifiers such as `command.id`, `component.name`, `endpoint.name`, and  `project.name`
* References to identifiers, for example, when binding commands by name to events, when specifiying a command's component, or when specifying the volume mount name for a container
* String enumerations such as command `group.kind` or `endpoint.exposure`

## Procedure

1. Add a variable definition at the top level in your devfile:

    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: java-maven
      version: 1.1.1
    variables:
      javaVersion: 11
    ```

2. Reference the variable by name later in the devfile:

    ```yaml {% filename="devfile.yaml" %}
    components:
    - name: tools
        container:
        image: quay.io/eclipse/che-java{{javaVersion}}-maven:nightly
    ```

If you reference a variable that is not defined, a non-blocking warning is issued.
