---
title: Adding a registry schema
description: Adding a registry schema
---

To add samples and stacks from other repositories, place the
`extraDevfileEntries.yaml` file under the root of a devfile registry.

#### extraDevfileEntries.yaml schema

{% table %}
- Name {% width="33%" %}
- Type {% width="33%" %}
- Description {% width="33%" %}
---
- `samples`
- `schema[]`
- The sample list.
---
- `stacks`
- `schema`
- The stack list stack or sample attributes.
---
- `name`
- `string`
- The stack name.
---
- `displayName`
- `string`
- The display name of a devfile.
---
- `description`
- `string`
- The description of a devfile.
---
- `tags`
- `string[]`
- The tags associated to a devfile.
---
- `icon`
- `string`
- A devfile icon.
---
- `language`
- `string`
- The project language that is used in a devfile.
---
- `git`
- `git`
- The information of remote repositories.
---
- `versions`
- `version[]`
- The information of each stack or sample version.
{% /table %}

#### version schema

{% table %}
- Name {% width="33%" %}
- Type {% width="33%" %}
- Description {% width="33%" %}
---
- `version`
- `string`
- The stack version.
---
- `schemaVersion`
- `string`
- The devfile schema version.
---
- `default`
- `boolean`
- The default stack version.
---
- `git`
- `git`
- The information of remote repositories.
---
- `description`
- `string`
- The description of the stack version.
---
- `tags`
- `string[]`
- The tags associated to the stack version.
---
- `icon`
- `string`
- Icon of the stack version.
---
- `architectures`
- `string[]`
- The architectures associated to the stack version.
{% /table %}

```yaml {% title="extraDevfileEntries.yaml sample" filename="devfile.yaml" %}
schemaVersion: <version>
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

#### Devfile index schema

{% table %}
- Name {% width="33%" %}
- Type {% width="33%" %}
- Description {% width="33%" %}
---
- `name`
- `string`
- The stack name.
---
- `versions`
- `version[]`
- The information of each stack or sample version.
---
- `attributes`
- `map[string]apiext.JSON`
- Map of implementation-dependant free-form YAML attributes.
---
- `displayName`
- `string`
- The display name of a stack.
---
- `description`
- `string`
- The description of a stack.
---
- `type`
- `DevfileType`
- The type: stack or sample.
---
- `tags`
- `string[]`
- The tags for a stack.
---
- `icon`
- `string`
- A stack icon.
---
- `globalMemoryLimit`
- `string`
- A stack global memory limit.
---
- `projectType`
- `string`
- The project framework that is used in a stack.
{% /table %}

#### version schema

{% table %}
- Name {% width="33%" %}
- Type {% width="33%" %}
- Description {% width="33%" %}
---
- `version`
- `string`
- The stack version.
---
- `schemaVersion`
- `string`
- The devfile schema version.
---
- `default`
- `boolean`
- The default stack version.
---
- `git`
- `git`
- The information of remote repositories.
---
- `description`
- `string`
- The description of the stack version.
---
- `tags`
- `string[]`
- The tags associated to the stack version.
---
- `icon`
- `string`
- Icon of the stack version.
---
- `architectures`
- `string[]`
- The architectures associated to the stack version.
---
- `links`
- `map[string]string`
- Links related to a devfile.
---
- `resources`
- `string[]`
- The file resources that compose a devfile stack
---

- `starterProjects`
- `string[]`
- The project templates that can be used in a devfile.
{% /table %}

```json {% title="Index.json sample" %}
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
