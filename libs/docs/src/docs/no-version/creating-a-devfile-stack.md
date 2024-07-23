---
title: Creating a devfile stack
description: Creating a devfile stack
---

Create a devfile stack to package into the devfile registry so you can
quickly access, share, and duplicate your different stacks for your
various projects.

## Procedure

1. Create a fork of the [devfile-registry repo](https://github.com/devfile/registry), clone
your fork locally and go to its directory.

2. Within the stacks directory `registry/stacks/`, create a stack folder with a name that matches the stack name. For
    example, `tutorial-stack/`.

3. Create version directories for storing different stack versions.
    Each directory under the stack must correspond to a specific
    version, for example, `tutorial-stack/1.0.3`.

4. Inside the `stacks/tutorial-stack` directory create a file called OWNERS.
There you can include yourself as a reviewer (For more information check the [owners guide](https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md)):
    ```yaml {% filename="OWNERS" %}
    reviewers:
    - your-github-username
    ```

5. Inside the `stacks/tutorial-stack/1.0.3` directory create your devfile (`stacks/tutorial-stack/1.0.3/devfile.yaml`).

6. In your `devfile` you will have to add the `schemaVersion` and your `metadata` sections:
    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
      name: tutorial-stack
      displayName: Tutorial Stack
      description: Test stack based on .Net 8.0
      icon: https://github.com/dotnet/brand/raw/main/logo/dotnet-logo.png
      tags:
        - .NET
      projectType: dotnet
      language: .NET
      version: 1.0.3
    ```

7. Add your `starterProjects`:
    ```yaml {% filename="devfile.yaml" %}
    starterProjects:
    - name: tutorial-example
        git:
        checkoutFrom:
            remote: origin
            revision: dotnet-8.0
        remotes:
            origin: https://github.com/redhat-developer/s2i-dotnetcore-ex
        subDir: app
    ```

8. Add your `Components`:
    ```yaml {% filename="devfile.yaml" %}
    components:
    - name: dotnet
        container:
        image: registry.access.redhat.com/ubi8/dotnet-80:8.0-9
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
            - name: http-dotnet80
            targetPort: 8080
    ```

9. Finally, add the `Commands` inside your `devfile.yaml`:
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

10. The full `devfile.yaml` will be:
    ```yaml {% filename="devfile.yaml" %}
    schemaVersion: 2.2.0
    metadata:
    name: tutorial-stack
    displayName: Tutorial Stack
    description: Test stack based on .Net 8.0
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
            revision: dotnet-8.0
        remotes:
            origin: https://github.com/redhat-developer/s2i-dotnetcore-ex
        subDir: app
    components:
    - name: dotnet
        container:
        image: registry.access.redhat.com/ubi8/dotnet-80:8.0-9
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
            - name: http-dotnet80
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

11. Create a `stacks/tutorial-stack/stack.yaml` file to store the stack information.
    ```yaml {% filename="stack.yaml" %}
    name: tutorial-stack
    displayName: Tutorial Stack
    description: Test stack based on .Net 8.0
    icon: https://github.com/dotnet/brand/raw/main/logo/dotnet-logo.png
    versions:
    - version: 2.2.0
        default: true # should have one and only one default version
    - version: <-another-version->
    ```

12. Verify every devfile stack version contains at least one
    `devfile.yaml` file. Add other required files to the stack version.
    These files can include VSX plug-ins, Dockerfiles, or Kubernetes
    manifests.

13. Create a Pull Request from your fork to the [devfile-registry](https://github.com/devfile/registry).

## Additional resources

- To create `stack.yaml`, see [adding a stack yaml file](./adding-a-stack-yaml-file).

- To create devfiles, see [overview](./overview).
