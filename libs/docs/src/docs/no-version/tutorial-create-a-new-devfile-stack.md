---
title: Creating a devfile stack
description: Creating a devfile stack
---

This tutorial will guide you step-by-step on how you can create a
stack for the devfile registry.

## Prerequisites

* The user must have a basic git knowledge and a github account.

## Tutorial

1. Create a fork of the [devfile-registry repo](https://github.com/devfile/registry) and clone
your fork locally.

2. Create a new directory inside the `stacks/` folder called `tutorial-stack`.

3. Inside the `stacks/tutorial-stack` directory create a file called OWNERS.
There you can include yourself as a reviewer (For more information check the [owners guide](https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md)):
```yaml {% filename="OWNERS" %}
reviewers:
- your-github-username
```

4. Inside the `stacks/tutorial-stack` directory create your devfile (`stacks/tutorial-stack/devfile.yaml`).

5. In your `devfile` you will have to add the `schemaVersion` and your `metadata` sections:
```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.1.0
metadata:
  name: tutorial-stack
  displayName: Tutorial Stack
  description: Test stack based on .Net 6.0
  icon: https://github.com/dotnet/brand/raw/main/logo/dotnet-logo.png
  tags:
    - .NET
  projectType: dotnet
  language: .NET
  version: 1.0.3
```

6. Add your `starterProjects`:
```yaml {% filename="devfile.yaml" %}
starterProjects:
  - name: tutorial-example
    git:
      checkoutFrom:
        remote: origin
        revision: dotnet-6.0
      remotes:
        origin: https://github.com/redhat-developer/s2i-dotnetcore-ex
    subDir: app
```

7. Add your `Components`:
```yaml {% filename="devfile.yaml" %}
components:
  - name: dotnet
    container:
      image: registry.access.redhat.com/ubi8/dotnet-60:6.0
      args: ["tail", "-f", "/dev/null"]
      mountSources: true
      env:
        - name: CONFIGURATION
          value: Debug
        - name: STARTUP_PROJECT
          value: app.csproj
        - name: ASPNETCORE_ENVIRONMENT
          value: Development
        - name: ASPNETCORE_URLS
          value: http://*:8080
      endpoints:
        - name: http-dotnet60
          targetPort: 8080
```

8. Finally, add the `Commands` inside your `devfile.yaml`:
```yaml {% filename="devfile.yaml" %}
commands:
  - id: build
    exec:
      workingDir: ${PROJECT_SOURCE}
      commandLine: kill $(pidof dotnet); dotnet build -c $CONFIGURATION $STARTUP_PROJECT /p:UseSharedCompilation=false
      component: dotnet
      group:
        isDefault: true
        kind: build
  - id: run
    exec:
      workingDir: ${PROJECT_SOURCE}
      commandLine: dotnet run -c $CONFIGURATION --no-build --project $STARTUP_PROJECT --no-launch-profile
      component: dotnet
      group:
        isDefault: true
        kind: run
```

9. The full `devfile.yaml` will be:
```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.1.0
metadata:
  name: tutorial-stack
  displayName: Tutorial Stack
  description: Test stack based on .Net 6.0
  icon: https://github.com/dotnet/brand/raw/main/logo/dotnet-logo.png
  tags:
    - .NET
  projectType: dotnet
  language: .NET
  version: 1.0.3
starterProjects:
  - name: tutorial-example
    git:
      checkoutFrom:
        remote: origin
        revision: dotnet-6.0
      remotes:
        origin: https://github.com/redhat-developer/s2i-dotnetcore-ex
    subDir: app
components:
  - name: dotnet
    container:
      image: registry.access.redhat.com/ubi8/dotnet-60:6.0
      args: ["tail", "-f", "/dev/null"]
      mountSources: true
      env:
        - name: CONFIGURATION
          value: Debug
        - name: STARTUP_PROJECT
          value: app.csproj
        - name: ASPNETCORE_ENVIRONMENT
          value: Development
        - name: ASPNETCORE_URLS
          value: http://*:8080
      endpoints:
        - name: http-dotnet60
          targetPort: 8080
commands:
  - id: build
    exec:
      workingDir: ${PROJECT_SOURCE}
      commandLine: kill $(pidof dotnet); dotnet build -c $CONFIGURATION $STARTUP_PROJECT /p:UseSharedCompilation=false
      component: dotnet
      group:
        isDefault: true
        kind: build
  - id: run
    exec:
      workingDir: ${PROJECT_SOURCE}
      commandLine: dotnet run -c $CONFIGURATION --no-build --project $STARTUP_PROJECT --no-launch-profile
      component: dotnet
      group:
        isDefault: true
        kind: run

```

10. Create an Pull Request from your fork to the [devfile-registry](https://github.com/devfile/registry).