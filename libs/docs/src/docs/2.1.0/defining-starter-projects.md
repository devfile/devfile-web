---
title: Defining starter projects
description: Defining starter projects
---

Starter projects provide a starting point when bootstrapping new projects, for example, when using interactive tools like `odo init`. Users can select a base project from the list of starters in the devfile. 

Each starter project requires a `name`, and a definition for either a `git` or a `zip` object to set the location for the starter source code.


```yaml {% title="A devfile with starter projects" %}
----
schemaVersion: 2.1.0
starterProjects:
- name: nodejs-starter
  git:
    remotes:
      origin: https://github.com/odo-devfiles/nodejs-ex.git
  
- name: nodejs-zip-starter
  zip:
    location: https://github.com/odo-devfiles/nodejs-ex/archive/refs/tags/0.0.2.zip
----
```

For a Git source in a starter project, a single remote must be specified. You can checkout from a specific branch name, tag or commit id. The default branch is used if the revision is not specified, or if the specified revision is not found.

With the optional `subDir` field, you can specify a sub-directory in the project to be used as root for the starter project. 


```yaml {% title="A starter project specifying revision and subDir" %}
----
schemaVersion: 2.2.0
starterProjects:
- name: demo-starter
  git:
    remotes:
      origin: <git-repo>
      checkoutFrom:
        revision: 1.1.0Final
    
    subDir: demo
----
```



