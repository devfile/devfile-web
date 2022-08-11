---
title: Migrating plugins
description: Migrating plugins
---

This section describes how to migrate plugins to a v2.x devfile.

Additionally, v2.x devfiles include the following new features:

- Parents allow users to reuse an existing devfile and partially
    replace plugin functionality.

- Eclipse Che IDEs and their tooling can be specified as attributes in
    a v2.x devfile or in a distinct YAML file, for example:
    `.che/che-editor.yaml` or `.che/che-theia-plugin.yaml`.

## Additional resources

For more information on plugins in v2.x devfiles, go to the following
GitHub issues:

- [Devfile plugins not suited to specify Che-Theia
    plugins](https://github.com/eclipse/che/issues/18669)

- [Che editors and Che-Theia plugins support in v2.x
    devfile](https://github.com/eclipse/che/issues/18668)

- [Plugins' replacement](https://github.com/devfile/api/issues/364)

- [Better plugin mechanism](https://github.com/devfile/api/issues/31)
