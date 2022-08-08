---
title: Versions
description: Versions
---

The `schemaVersion` attribute is mandatory in a devfile. See the
following table for `schemaVersion` properties in a devfile:

{% table %}
- Key
- Type
- Required
- Description
---
- schemaVersion
- string
- yes
- The version of the devfile schema that the devfile uses.
{% /table %}

## Procedure

- Define the `schemaVersion` attribute in the devfile:

```yaml  {% title="Adding schema version to a devfile" filename="devfile.yaml" %}
schemaVersion: <version>
metadata:
  name: devfile-sample
  version: 2.1.0
```

## Additional resources

- {% versioned-link href="./devfile-schema" text="API Reference" /%}
