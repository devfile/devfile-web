---
title: Adding a registry schema
description: Adding a registry schema
---

To add samples and stacks from other repositories, place the
`extraDevfileEntries.yaml` file under the root of a devfile registry.

## extraDevfileEntries.yaml schema

{% table %}
* Name
* Type
* Description
---
* `samples`
* `schema[]`
* The sample list.
---
* `stacks`
* `schema`
* The stack list stack or sample attributes.
---
* `name`
* `string`
* The stack name.
---
* `displayName`
* `string`
* The display name of a devfile.
---
* `description`
* `string`
* The description of a devfile.
---
* `tags`
* `string[]`
* The tags associated to a devfile.
---
* `icon`
* `string`
* A devfile icon.
---
* `language`
* `string`
* The project language that is used in a devfile.
---
* `git`
* `git`
* The information of remote repositories.
---
* `versions`
* `string[]`
* The information of each stack or sample version.
{% /table %}

## version schema

{% table %}
* Name
* Type
* Description
---
* `version`
* `string`
* The stack version.
---
* `schemaVersion`
* `string`
* The devfile schema version.
---
* `default`
* `boolean`
* The default stack version.
---
* `git`
* `git`
* The information of remote repositories.
---
* `description`
* `string`
* The description of the stack version.
---
* `tags`
* `string[]`
* The tags associated to the stack version.
---
* `icon`
* `string`
* Icon of the stack version.
---
* `architectures`
* `string[]`
* The architectures associated to the stack version.
{% /table %}

```yaml
schemaVersion: 2.0.0
samples:
  - name: nodejs-basic
    displayName: Basic Node.js
    description: A simple Hello World Node.js application
    icon: https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg
    tags: ['NodeJS', 'Express']
    projectType: nodejs
    language: nodejs
    versions:
      - version: 1.1.0
        schemaVersion: 2.2.0
        default: true
        description: nodejs with devfile v2.2.0
        git:
          remotes:
            origin: https://github.com/nodeshift-starters/devfile-sample.git
  - name: code-with-quarkus
    displayName: Basic Quarkus
    description: A simple Hello World Java application using Quarkus
    icon: https://design.jboss.org/quarkus/logo/final/SVG/quarkus_icon_rgb_default.svg
    tags: ['Java', 'Quarkus']
    projectType: quarkus
    language: java
    versions:
      - version: 1.1.0
        schemaVersion: 2.2.0
        default: true
        description: java quarkus with devfile v2.2.0
        git:
          remotes:
            origin: https://github.com/devfile-samples/devfile-sample-code-with-quarkus.git
      - version: 1.0.0
        schemaVersion: 2.0.0
        description: java quarkus with devfile v2.0.0
        git:
          remotes:
            origin: https://github.com/elsony/devfile-sample-code-with-quarkus.git
  - name: java-springboot-basic
    displayName: Basic Spring Boot
    description: A simple Hello World Java Spring Boot application using Maven
    icon: https://spring.io/images/projects/spring-edf462fec682b9d48cf628eaf9e19521.svg
    tags: ['Java', 'Spring']
    projectType: springboot
    language: java
    git:
      remotes:
        origin: https://github.com/devfile-samples/devfile-sample-java-springboot-basic.git
  - name: python-basic
    displayName: Basic Python
    description: A simple Hello World application using Python
    icon: https://www.python.org/static/community_logos/python-logo-generic.svg
    tags: ['Python']
    projectType: python
    language: python
    git:
      remotes:
        origin: https://github.com/devfile-samples/devfile-sample-python-basic.git
```

The `index.json` file contains metadata for the stacks and samples in
the registry. This metadata is also known as the devfile index schema.
From the devfile index schema, you can get the stack and sample generic
information such as name, language, and resources.

<table>
<caption>Devfile index schema</caption>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Name</p></td>
<td style="text-align: left;"><p>Type</p></td>
<td style="text-align: left;"><p>Description</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>name</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The stack name.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>versions</code></p></td>
<td style="text-align: left;"><p><code>version[]</code></p></td>
<td style="text-align: left;"><p>The information of each stack or sample
version.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>attributes</code></p></td>
<td
style="text-align: left;"><p><code>map[string]apiext.JSON</code></p></td>
<td style="text-align: left;"><p>Map of implementation-dependant
free-form YAML attributes.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>displayName</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The display name of a stack.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>description</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The description of a stack.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>type</code></p></td>
<td style="text-align: left;"><p><code>DevfileType</code></p></td>
<td style="text-align: left;"><p>The type: stack or sample.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>tags</code></p></td>
<td style="text-align: left;"><p><code>string[]</code></p></td>
<td style="text-align: left;"><p>The tags for a stack.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>icon</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>A stack icon.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>globalMemoryLimit</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>A stack global memory limit.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>projectType</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The project framework that is used in a
stack.</p></td>
</tr>
</tbody>
</table>

Devfile index schema

<table>
<caption>version schema</caption>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Name</p></td>
<td style="text-align: left;"><p>Type</p></td>
<td style="text-align: left;"><p>Description</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>version</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The stack version.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>schemaVersion</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The devfile schema version.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>default</code></p></td>
<td style="text-align: left;"><p><code>boolean</code></p></td>
<td style="text-align: left;"><p>The default stack version.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>git</code></p></td>
<td style="text-align: left;"><p><code>git</code></p></td>
<td style="text-align: left;"><p>The information of remote
repositories.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>description</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The description of the stack
version.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>tags</code></p></td>
<td style="text-align: left;"><p><code>string[]</code></p></td>
<td style="text-align: left;"><p>The tags associated to the stack
version.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>icon</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>Icon of the stack version.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>architectures</code></p></td>
<td style="text-align: left;"><p><code>string[]</code></p></td>
<td style="text-align: left;"><p>The architectures associated to the
stack version.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>links</code></p></td>
<td style="text-align: left;"><p><code>map[string]string</code></p></td>
<td style="text-align: left;"><p>Links related to a devfile.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>resources</code></p></td>
<td style="text-align: left;"><p><code>string[]</code></p></td>
<td style="text-align: left;"><p>The file resources that compose a
devfile stack.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>starterProjects</code></p></td>
<td style="text-align: left;"><p><code>string[]</code></p></td>
<td style="text-align: left;"><p>The project templates that can be used
in a devfile.</p></td>
</tr>
</tbody>
</table>

version schema

```json
[
  {
    "name": "go",
    "displayName": "Go Runtime",
    "description": "Stack with the latest Go version",
    "type": "stack",
    "tags": ["Go", "testtag"],
    "icon": "https://raw.githubusercontent.com/devfile-samples/devfile-stack-icons/main/golang.svg",
    "projectType": "go",
    "language": "go",
    "provider": "Red Hat",
    "versions": [
      {
        "version": "1.1.0",
        "schemaVersion": "2.0.0",
        "default": true,
        "description": "Stack with the latest Go version with devfile v2.0.0 schema verison",
        "tags": ["Go"],
        "icon": "https://raw.githubusercontent.com/devfile-samples/devfile-stack-icons/main/golang.svg",
        "links": {
          "self": "devfile-catalog/go:1.1.0"
        },
        "resources": ["devfile.yaml"],
        "starterProjects": ["go-starter"]
      },
      {
        "version": "1.2.0",
        "schemaVersion": "2.1.0",
        "description": "Stack with the latest Go version with devfile v2.1.0 schema verison",
        "tags": ["testtag"],
        "icon": "https://raw.githubusercontent.com/devfile-samples/devfile-stack-icons/main/golang.svg",
        "links": {
          "self": "devfile-catalog/go:1.2.0"
        },
        "resources": ["devfile.yaml"],
        "starterProjects": ["go-starter"]
      }
    ]
  },
  {
    "name": "java-maven",
    "displayName": "Maven Java",
    "description": "Upstream Maven and OpenJDK 11",
    "type": "stack",
    "tags": ["Java", "Maven"],
    "architectures": ["amd64", "arm64", "s390x"],
    "projectType": "maven",
    "language": "java",
    "versions": [
      {
        "version": "1.1.0",
        "schemaVersion": "2.1.0",
        "default": true,
        "description": "Upstream Maven and OpenJDK 11",
        "tags": ["Java", "Maven"],
        "architectures": ["amd64", "arm64", "s390x"],
        "links": {
          "self": "devfile-catalog/java-maven:1.1.0"
        },
        "resources": ["devfile.yaml"],
        "starterProjects": ["springbootproject"]
      }
    ]
  }
]
```
