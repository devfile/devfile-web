---
title: Adding a schema version
description: Adding schema version
---

The `schemaVersion` attribute is mandatory in a devfile. See the
following table for `schemaVersion` properties in a devfile:

{% table %}
* Key
* Type
* Required
* Description 
---
* schemaVersion
* string
* yes
* The version of the devfile schema that the devfile uses.
{% /table %}

- Define the `schemaVersion` attribute in the devfile:

```yaml
schemaVersion: 2.2.0
metadata:
  name: devfile-sample
  version: 2.1.0
```

- [???](#api-reference.adoc)
