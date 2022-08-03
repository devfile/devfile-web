---
title: Migrating plug-ins
description: Migrating plug-ins
---

This section describes how to migrate plug-ins to devfile v2. There ARE
major changes about the definition of plugins in a devfile. Plugins are
now specified using a devfile. A plugin specified in a v1.0 meta.yaml
will NOT work as it is in a devfile v2.0.

## Procedure

1. Plugins are now specified using a devfile. A plugin specified in a
    v1.0 meta.yaml will NOT work as it is in a devfile v2.0.

    ```yaml {% title="v2.0 java8.yaml" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      publisher: redhat
      name: java8
      version: 0.57.0
      displayName: Language Support for Java 8
      title: Language Support for Java(TM) by ...
      description: Java Linting, Intellisense ...
      icon: <https://.../logo-eclipseche.svg>
      repository: <https://github.../vscode-java>
      category: Language
      firstPublicationDate: "2020-02-20"
      pluginType: che-theia-vsx # <== mandatory
                                # for plugins
                          # Valid types:
                          #   che-theia-vsx
                          #   che-editor,
                          #   che-theia-plugin,
                          #   che-theia-ext,
                          #   generic-service,
                          #   generic-ui
    parent:
      id: redhat/theia-vsx-template/latest
      components:
        - container:
           name: vsx-installer
           env:
            - name: VSX_LIST
              value: java-dbg.vsix,java.vsix
    components:
     - kubernetes:
        name: ...
        reference: ...
     - container:
        image: ...che-sidecar-java
        name: vscode-java
        memoryLimit: "1500Mi"
        volumeMounts:
         - path: "/home/theia/.m2"
           name: m2
     - volume:
        name: m2
    ```

2. And then can be referenced from a distinct devfile:

    ```yaml {% title="v2.0 devfile.yaml" filename="devfile.yaml" %}
    components:
    - plugin:
        name: java language server
        id: redhat/java11/0.57.0 # other then by `id`, a plugin
                                 # can be referenced by `uri` and
                                 # `kubernetes`
    ```

## Additional Resources

- See [corresponding
    issue](https://github.com/che-incubator/devworkspace-api/issues/31).
