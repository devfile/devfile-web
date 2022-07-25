---
title: Adding a name
description: Adding a name
---

Adding a name to a devfile is mandatory. Use the `name` attribute to
define the name. See the following table for metadata properties in a
devfile:

{% table %}
* Key
* Type
* Required
* Description
---
* name
* string
* yes
* The name of your devfile. This name
links you to the devfile registry if listed.
---
* version
* string
* yes
* The version of your devfile.
{% /table %}

- [???](#adding-schema-version-to-a-devfile.adoc)

1.  To specify a static name for the workspace, define the `name`
    attribute.

Adding a static name to a devfile

```yaml
schemaVersion: 2.2.0
metadata:
  name: devfile-sample
  version: 2.0.0
```

- [???](#api-reference.adoc)
