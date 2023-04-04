---
title: Innerloop versus outerloop
description: Innerloop versus outerloop
---

In a devfile spec, there are two scopes of deployment: innerloop and outerloop. Having these scopes is essential for a full development experience as well as ensuring proper integration of the full scope of development tools for Kubernetes and OpenShift projects.

## Prerequisites
- [Adding components](./adding-components)
- [Adding commands](./adding-commands)

## What is innerloop?

**Innerloop** deployments are actions the developer makes within their development environment, such as running tests, debugging, and local deployments before checking into the target source repository.

### Procedure

1. Add the runtime container component for running your project with the `schemaVersion` and `metadata` definitions
    - This example will use `nodejs-18` UBI image

    ```yaml
    schemaVersion: <version>
    metadata:
      name: nodejs
    components:
      - name: runtime
        container:
          image: registry.access.redhat.com/ubi8/nodejs-18:latest
          args: ['tail', '-f', '/dev/null']
          memoryLimit: 1024Mi
          mountSources: true
    ```

2. If your project needs ports to be forwarded like in this example, define the endpoints required for your project
    - ***Note**: If you are using odo v3, you need to create an additional endpoint for the debugging port. See [Odo Spec Support](#odo-spec-support) for more information*
    - The environment variable definition `DEBUG_PORT` is to set the debug port of the node application

    ```yaml
    components:
      - name: runtime
        container:
          image: registry.access.redhat.com/ubi8/nodejs-18:latest
          args: ['tail', '-f', '/dev/null']
          memoryLimit: 1024Mi
          mountSources: true
          env:
            - name: DEBUG_PORT
              value: '5858'
          endpoints:
            - name: http-node
              targetPort: 3000
            - exposure: none
              name: debug
              targetPort: 5858
    ```

3. Now the runtime component has been defined, we need a way of running our project
    1. Add a command to `npm install` our project packages and mark it as our projects build command
    2. Add another command to run the main process or the server process `npm start` in this example and mark it as our projects run command
    3. With these commands you should now be able to run a development deployment of your project, for example `odo dev`

    ```yaml
    commands:
      - id: install
        exec:
          component: runtime
          commandLine: npm install
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: build
            isDefault: true
      - id: run
        exec:
          component: runtime
          commandLine: npm start
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: run
            isDefault: true
    ```

4. For testing and debugging we will also need to define commands for each with the shell commands used to debug and test your project
    - The `kind` of commands will be `debug` and `test` for running your debugging and testing respectively

    ```yaml
    commands:
      - id: install
        exec:
          component: runtime
          commandLine: npm install
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: build
            isDefault: true
      - id: run
        exec:
          component: runtime
          commandLine: npm start
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: run
            isDefault: true
      - id: debug
        exec:
          component: runtime
          commandLine: npm run debug
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: debug
            isDefault: true
      - id: test
        exec:
          component: runtime
          commandLine: npm test
          workingDir: ${PROJECT_SOURCE}
          group:
            kind: test
            isDefault: true
    ```

```yaml {% title="Final innerloop devfile" filename="devfile.yaml" %}
schemaVersion: <version>
metadata:
  name: nodejs
components:
  - name: runtime
    container:
      image: registry.access.redhat.com/ubi8/nodejs-18:latest
      args: ['tail', '-f', '/dev/null']
      memoryLimit: 1024Mi
      mountSources: true
      env:
        - name: DEBUG_PORT
          value: '5858'
      endpoints:
        - name: http-node
          targetPort: 3000
        - exposure: none
          name: debug
          targetPort: 5858
commands:
  - id: install
    exec:
      component: runtime
      commandLine: npm install
      workingDir: ${PROJECT_SOURCE}
      group:
        kind: build
        isDefault: true
  - id: run
    exec:
      component: runtime
      commandLine: npm start
      workingDir: ${PROJECT_SOURCE}
      group:
        kind: run
        isDefault: true
  - id: debug
    exec:
      component: runtime
      commandLine: npm run debug
      workingDir: ${PROJECT_SOURCE}
      group:
        kind: debug
        isDefault: true
  - id: test
    exec:
      component: runtime
      commandLine: npm test
      workingDir: ${PROJECT_SOURCE}
      group:
        kind: test
        isDefault: true
```

The component and commands here allow the developer to build, run, debug, and test their project within a local cluster using a devfile supported development tool (e.g. `odo`).

## What is outerloop?

**Outerloop** deployments are ones done after the development stage once the source is checked into the source repository. Such deployments would include integration testing, full builds or deployments.

### Procedure

1. Add an image component to define the image building process
    1. Label your image tag with `imageName`
    2. Define your `dockerfile` with your file path, build context and if your build requires root privileges

    ```yaml
    components:
      - name: outerloop-build
        image:
          imageName: landingpage-image:latest
          dockerfile:
            uri: docker/Dockerfile
            buildContext: .
            rootRequired: false
    ```

2. Add a command which will instruct your deployment to build the docker image using the `image` component

    ```yaml
    commands:
      - id: build-image
        apply:
          component: outerloop-build
    ```

3. Add a deployment component that best suits your cluster’s runtime environment (`kubernetes`/`openshift`), in this case openshift
    - Provide the file path to your openshift template file with `uri`

    ```yaml
    components:
      - name: outerloop-build
        image:
          imageName: landingpage-image:latest
            dockerfile:
              uri: docker/Dockerfile
              buildContext: .
              rootRequired: false
      - name: outerloop-deploy
        openshift:
          uri: landingpage-template.yaml
    ```

4. As with the image component, we will need to create a command for the openshift component

    ```yaml
    commands:
      - id: build-image
        apply:
          component: outerloop-build
      - id: deploy-openshift
        apply:
          component: outerloop-deploy
    ```

5. To complete the deployment process, combine the two commands into a complete deploy command using composite

    ```yaml
    commands:
      - id: build-image
        apply:
          component: outerloop-build
      - id: deploy-openshift
        apply:
          component: outerloop-deploy
      - id: deploy
        composite:
          commands:
            - build-image
            - deploy-openshift
          group:
            kind: deploy
            isDefault: true
    ```

```yaml {% title="Final outerloop devfile" filename="devfile.yaml" %}
schemaVersion: <version>
metadata:
  name: nodejs
components:
  - name: outerloop-build
    image:
      imageName: landingpage-image:latest
      dockerfile:
        uri: docker/Dockerfile
        buildContext: .
        rootRequired: false
  - name: outerloop-deploy
    openshift:
      uri: landingpage-template.yaml
commands:
  - id: build-image
    apply:
      component: outerloop-build
  - id: deploy-openshift
    apply:
      component: outerloop-deploy
  - id: deploy
    composite:
      commands:
        - build-image
        - deploy-openshift
      group:
        kind: deploy
        isDefault: true
```

With these components and commands, the developer can produce a full build and deployment. In this case, the project has an OpenShift deployment template `landingpage-template.yaml` for a full deploy and docker image build file `docker/Dockerfile` for a full build. These actions can also be used for the requirements of performing integration testing.

## Support list of developer tools

Though the devfile spec does support both [innerloop](#what-is-innerloop) and [outerloop](#what-is-outerloop) deployments, not all developer tools will support these deployments in the same way. This section will list the devfile supported development tools and what deployment scopes they support.

### Developer Tools

| Tool | Innerloop Support | Outerloop Support |
|------|-------------------|-------------------|
| Odo v2 | X | X |
| Odo v3 | X | X |
| Eclipse Che | X | |
| Amazon CodeCatalyst | X | |
| JetBrains Space Cloud Dev | X | X (*image build only*) |
| Red Hat OpenShift Dev Spaces | X | |
| OpenShift Dev Console | | X |
| VSCode OpenShift Toolkit | X | X |
| IntelliJ OpenShift Toolkit | X | X |

## Odo Spec Support

Odo covers the features supported by the devfile 2.2.0 spec with minor requirements for version 3: 
1. In order to debug your project it is required to define a debug port: [https://odo.dev/docs/user-guides/v3-migration-guide#changes-to-the-way-component-debugging-works](https://odo.dev/docs/user-guides/v3-migration-guide#changes-to-the-way-component-debugging-works)
2. By default, odo v3 sets up an underlying persistent volumes rather than setting up ephemeral volumes, this can be toggled back: [https://odo.dev/docs/user-guides/v3-migration-guide#ephemeral-storage](https://odo.dev/docs/user-guides/v3-migration-guide#ephemeral-storage)

More information on how `odo` treats lifecycle events can be found on the [odo v2](https://odo.dev/docs/2.5.0/tutorials/using-devfile-lifecycle-events) page or on the [odo v3](https://odo.dev/docs/user-guides/advanced/using-devfile-lifecycle-events) page.

**OpenShift Toolkit** for both VSCode and IntelliJ IDE use odo v3 to power the core commands, therefore the devfile support should be the same as odo v3.

## Eclipse Che Spec Support

As shown in the previous table Eclipse Che only supports [innerloop](#what-is-innerloop) spec features and is currently working on support for [outerloop](#what-is-outerloop). The Eclipse Che project provides an updated support list of Devfile 2.x in an issue: [https://github.com/eclipse/che/issues/17883](https://github.com/eclipse/che/issues/17883)

**Red Hat OpenShift Dev Spaces** upstreams the Eclipse Che project and therefore should provide the same level of devfile support.

## OpenShift Dev Console Spec Support

OpenShift Dev Console allows the deployment of samples and only supports devfiles defined for [outerloop](#what-is-outerloop) deployments. Additional information about this can be found: [https://docs.openshift.com/container-platform/4.10/applications/creating_applications/odc-creating-applications-using-developer-perspective.html](https://docs.openshift.com/container-platform/4.10/applications/creating_applications/odc-creating-applications-using-developer-perspective.html)

## Amazon CodeCatalyst Spec Support

Amazon CodeCatalyst uses devfile specification 2.1.0 and it therefore does not support features the latest devfile specification provides, such as [outerloop](#what-is-outerloop) deployments. More information about Amazon CodeCatalyst’s utilization of devfiles can be found on their documentation pages: [https://docs.aws.amazon.com/codecatalyst/latest/userguide/devenvironment.html](https://docs.aws.amazon.com/codecatalyst/latest/userguide/devenvironment.html)

## JetBrains Space Cloud Dev Spec Support

JetBrains Space Cloud Dev uses the 2.2.0 devfile specification and supports the use of multiple devfiles in a single project. It uses a custom `space` field under the top level `attributes` to define the setup for the runtime environment to be set up on the platform. An example of a devfile you might see in this environment is shown below:

```yaml {% title="Example of JetBrains Space Cloud Dev devfile setup" filename="devfile.yaml" %}
schemaVersion: 2.2.0
metadata:
  name: 'My custom dev env configuration'
attributes:
  space:
    # regular, large, xlarge
    instanceType: large
    # a default IDE for the project
    editor:
      # (Required) IDE type: Idea, WebStorm, PyCharm,
      # RubyMine, CLion, Fleet, GoLand, PhpStorm
      type: Idea
      version: '2022.1'
      # Space uses JetBrains Toolbox App to install IDEs to a dev environment.
      # updateChannel defines IDE version release stage: Release, EAP
      updateChannel: EAP
      # JVM configuration (appends to the default .vmoptions file)
      vmoptions:
      - '-Xms2048m'
      - '-Xmx4096m'
    # a warm-up snapshot
    warmup:
      # create a snapshot every Sunday (only for main branch)
      startOn:
      - type: schedule
        cron: '0 0 0 ? * SUN *'
      # run additional warmup script (IDE indexes will be built anyway)
      script:
        ./scripts/warmup.sh
    # Parameters and secretes required by a dev environment
    # e.g., credentials to an external service
    requiredParameters:
    # (Required) the name of the environment variable
    # that will be available in the dev environment
    - name: USERNAME
      description: 'Space username'
    requiredSecrets:
    - name: PASSWORD
      description: 'Space permanent token'
components:
- name: dev-container
  # Dev environment container config
  container:
    # use image from a Space Packages registry
    image: mycompany.registry.jetbrains.space/p/myprj/container/my-dev-image:27
    # environment variables
    env:
      - name: API_URL
        value: 'https://my-site/http_api'
      - name: PATH_IMG
        value: './img/'
```

JetBrains Space Cloud Dev also partially supports [outerloop](#what-is-outerloop) via the `image` component to set up `Dockerfile` builds:

```yaml {% title="Example of JetBrains Space Cloud Dev image build devfile setup" filename="devfile.yaml" %}
schemaVersion: 2.2.0
attributes:
  space:
    instanceType: large
    editor:
    type: Idea
components:
- name: image-build
  image:
    # (Required)
    imageName: my-image:latest
    dockerfile:
      # (Optional) path to Docker context relative to projectRoot
      # by default, projectRoot is repository root
      buildContext: docker
      # (Required) path to Dockerfile relative to projectRoot
      uri: docker/Dockerfile
      args:
      - 'ARG1=A'
      - 'ARG2=B'
```

The `image` component build process publishes the built image to a cluster image registry specific to your project workspace. More details about using devfiles with JetBrains Space Cloud Dev can be found here: [https://www.jetbrains.com/help/space/set-up-a-dev-evnvironment.html](https://www.jetbrains.com/help/space/set-up-a-dev-evnvironment.html)

## Additional Resources
- More information on supported developer tools can be found in [Developing with devfiles](./developing-with-devfiles)
- [Standardizing application delivery with OpenShift](https://developers.redhat.com/articles/2022/12/16/standardizing-application-delivery-openshift)