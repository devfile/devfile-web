---
title: Defining starter projects
description: Defining starter projects
---

Starter projects provide a starting point when bootstrapping new projects, for example, when using interactive tools like `odo init`. Users can select a base project from the list of starters in the devfile. 

Each starter project requires a `name`, and a definition for either a `git` or  `zip` object to set the location for the starter source code.

```yaml {% title="A devfile with git and zip starter projects" %}
schemaVersion: 2.1.0
starterProjects:
- name: nodejs-starter
  git:
    remotes:
      origin: https://github.com/odo-devfiles/nodejs-ex.git
  
- name: nodejs-zip-starter
  zip:
    location: https://github.com/odo-devfiles/nodejs-ex/archive/refs/tags/0.0.2.zip
```


```yaml {% title="A devfile with multiple git starter projects" filename="devfile.yaml" %}
schemaVersion: 2.1.0
metadata:
  name: example-devfile
  version: 1.0.0
starterProjects:
  - name: frontend
    git:
      remotes:
        origin: 'https://github.com/acmecorp/frontend.git'
  - name: backend
    git:
      remotes:
        origin: 'https://github.com/acmecorp/backend.git'
```

For a Git source in a starter project, a single remote must be specified. You can checkout from a specific branch name, tag or commit id. The default branch is used if the revision is not specified, or if the specified revision is not found.

With the optional `subDir` field, you can specify a subdirectory in the project to be used as root for the starter project. The path must be relative to the source location. The default value is `.` or the full source directory.


```yaml {% title="A starter project specifying revision and subDir" %}
schemaVersion: 2.1.0
starterProjects:
- name: demo-starter
  git:
    remotes:
      origin: <git-repo>
      checkoutFrom:
        revision: 1.1.0Final
    
    subDir: demo
```

A starter project may include a devfile within its contents. If so, the tool will use that devfile going forward. If no devfile is included, the tool will continue using the original devfile it used to fetch the starter project.
