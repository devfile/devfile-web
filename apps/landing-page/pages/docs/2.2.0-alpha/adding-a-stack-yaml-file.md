---
title: Adding a stack YAML file
description: Adding a stack YAML file
---

To include multiple stack versions in a particular stack, place the
`stack.yaml` file under the root of the stack folder.

#### stack.yaml schema

{% table %}
* Name {% width="33%" %}
* Type {% width="33%" %}
* Description {% width="33%" %}
---
* `name`
* `string`
* The stack name.
---
* `displayName`
* `string`
* The display name of a stack.
---
* `description`
* `string`
* The description of a stack.
---
* `versions`
* `version[]`
* The information of each stack version.
---
* `icon`
* `string`
* A stack icon.
{% /table %}

#### version spec

{% table %}
* Name {% width="33%" %}
* Type {% width="33%" %}
* Description {% width="33%" %}
---
* `version`
* `string`
* The stack version.
---
* `default`
* `boolean`
* The default stack version.
{% /table %}

```yaml {% title="extraDevfileEntries.yaml sample" filename="devfile.yaml" %}
name: go
description: Stack with the latest Go version
displayName: Go Runtime
icon: https://raw.githubusercontent.com/devfile-samples/devfile-stack-icons/main/golang.svg
versions:
  - version: 1.1.0
    default: true # should have one and only one default version
  - version: 1.2.0
```
