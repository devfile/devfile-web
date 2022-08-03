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
- `schema[]`
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
{% /table %}

```yaml {% title="extraDevfileEntries.yaml sample" filename="devfile.yaml" %}
schemaVersion: 1.0.0
samples:
  - name: nodejs-basic
    displayName: Basic NodeJS
    description: A simple Hello World Node.js application
    icon: https://github.com/maysunfaisal/node-bulletin-board-2/blob/main/nodejs-icon.png
    tags: ["NodeJS", "Express"]
    projectType: nodejs
    language: nodejs
    git:
      remotes:
        origin: https://github.com/redhat-developer/devfile-sample.git
  - name: code-with-quarkus
    displayName: Basic Quarkus
    description: A simple Hello World Java application using Quarkus
    icon: .devfile/icon/quarkus.png
    tags: ["Java", "Quarkus"]
    projectType: quarkus
    language: java
    git:
      remotes:
        origin: https://github.com/elsony/devfile-sample-code-with-quarkus.git
  - name: java-springboot-basic
    displayName: Basic Spring Boot
    description: A simple Hello World Java Spring Boot application using Maven
    icon: .devfile/icon/spring-logo.png
    tags: ["Java", "Spring"]
    projectType: springboot
    language: java
    git:
      remotes:
        origin: https://github.com/elsony/devfile-sample-java-springboot-basic.git
  - name: python-basic
    displayName: Basic Python
    description: A simple Hello World application using Python
    icon: .devfile/icon/python.png
    tags: ["Python"]
    projectType: python
    language: python
    git:
      remotes:
        origin: https://github.com/elsony/devfile-sample-python-basic.git
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
- `version`
- `string`
- The stack version.
---
- `attributes`
- `map[string]apiext.JSON`
- Map of implementation-dependant free-form YAML attributes.
---
- `displayName`
- `string`
- The display name of a devfile.
---
- `description`
- `string`
- The description of a devfile.
---
- `type`
- `DevfileType`
- The type of a devfile that currently supports stacks and samples.
---
- `tags`
- `string[]`
- The tags for a devfile.
---
- `icon`
- `string`
- A devfile icon.
---
- `globalMemoryLimit`
- `string`
- A devfile global memory limit.
---
- `projectType`
- `string`
- The project framework that is used in a devfile.
---
- `language`
- `string`
- The project language that is used in a devfile.
---
- `links`
- `map[string]string`
- Links related to a devfile.
---
- `resources`
- `string[]`
- The file resources that compose a devfile stack.
---
- `tarterProjects`
- `string[]`
- The project templates that can be used in a devfile.
---
- `git`
- `git`
- The information of remote repositories.
{% /table %}

```json {% title="Index.json sample" %}
[
  {
    "name": "java-maven",
    "version": "1.1.0",
    "displayName": "Maven Java",
    "description": "Upstream Maven and OpenJDK 11",
    "type": "stack",
    "tags": [
      "Java",
      "Maven"
    ],
    "projectType": "maven",
    "language": "java",
    "links": {
      "self": "devfile-catalog/java-maven:latest"
    },
    "resources": [
      "devfile.yaml"
    ],
    "starterProjects": [
      "springbootproject"
    ]
  },
  {
    "name": "java-openliberty",
    "version": "0.5.0",
    "displayName": "Open Liberty",
    "description": "Java application stack using Open Liberty runtime",
    "type": "stack",
    "projectType": "docker",
    "language": "java",
    "links": {
      "self": "devfile-catalog/java-openliberty:latest"
    },
    "resources": [
      "devfile.yaml"
    ],
    "starterProjects": [
      "user-app"
    ]
  }
]
```
