---
title: "Quick start with Eclipse Che"
description: "Quick start with Eclipse Che"
---

This guide will run through creating a simple hello world devfile project using Eclipse Che. The purpose of this guide is to provide a practical introduction to those just starting out with devfiles.

## Prerequisites

- Eclipse Che 7.65.x
- `kubectl` or `oc`
- Access to a Kubernetes or OpenShift cluster

## Procedure

1. Obtain access to Eclipse Che if you do not already have it, as an individual this can be done by setting up a [local instance of Eclipse Che](https://www.eclipse.org/che/docs/stable/administration-guide/installing-che-locally/)
    - You can use `minikube` to run your cluster locally, follow [these](https://minikube.sigs.k8s.io/docs/start/) steps to get started
    - An alternative is to use the [Red Hat Developer Sandbox](https://developers.redhat.com/developer-sandbox/ide), see 
    [Quick start with OpenShift Dev Spaces](../2.1.0/quickstart-sandbox) guide if this method is used

2. For this quick start guide, we will create a simple [hello world Express.js](https://expressjs.com/en/starter/hello-world.html) application

3. In Eclipse Che, create an empty workspace

4. Close and stop the workspace

5. Go to 'Edit the workspace' and view the devfile. The devfile should be populated with content similar to the following
    - The `schemaVersion` of the devfile should be left to what Eclipse Che supports
    - The `metadata.name` field is the name of the workspace for the project
    - The `metadata.namespace` field is the target namespace your project will be deployed in, for our current intent and purposes this can be left alone

        ```yaml {% title="Empty workspace devfile" %}
        schemaVersion: <version>
        metadata:
          name: empty-arh4
          namespace: <user>-che
        attributes:
          controller.devfile.io/devworkspace-config:
            name: devworkspace-config
            namespace: eclipse-che
          controller.devfile.io/storage-type: per-user
        components:
          - attributes:
              controller.devfile.io/merge-contribution: true
            container:
              env:
                - name: CHE_DASHBOARD_URL
                  value: '...'
                - name: CHE_PLUGIN_REGISTRY_URL
                  value: '...'
                - name: CHE_PLUGIN_REGISTRY_INTERNAL_URL
                  value: '...'
                - name: OPENVSX_REGISTRY_URL
                  value: '...'
              image: 'quay.io/devfile/universal-developer-image:ubi8-latest'
              sourceMapping: /projects
            name: universal-developer-image
        ```

        {% callout title="Note!" %}
        Your devfile many differ depending on the version of Che being used.

        Careful when editing and removing fields from the devfile for your workspace,
        a portion of these initial fields are used to configure the workspace itself.
        The following steps will show what changes can be made to meet our goal.
        {% /callout %}

6. Change the value of the `name` field to set the component name to `runtime`

    ```diff {% title="Field change for component name" %}
     components:
       - attributes:
           controller.devfile.io/merge-contribution: true
         container:
           env:
             - name: CHE_DASHBOARD_URL
               value: '...'
             - name: CHE_PLUGIN_REGISTRY_URL
               value: '...'
             - name: CHE_PLUGIN_REGISTRY_INTERNAL_URL
               value: '...'
             - name: OPENVSX_REGISTRY_URL
               value: '...'
           image: 'quay.io/devfile/universal-developer-image:ubi8-latest'
           sourceMapping: /projects
    -    name: universal-developer-image
    +    name: runtime
    ```

7. Change the `sourceMapping` to `/projects/helloworld-example` in the `runtime` component to set the project directory

    ```diff {% title="Field change for project directory" %}
     components:
       - attributes:
           controller.devfile.io/merge-contribution: true
         container:
           env:
             - name: CHE_DASHBOARD_URL
               value: '...'
             - name: CHE_PLUGIN_REGISTRY_URL
               value: '...'
             - name: CHE_PLUGIN_REGISTRY_INTERNAL_URL
               value: '...'
             - name: OPENVSX_REGISTRY_URL
               value: '...'
           image: 'quay.io/devfile/universal-developer-image:ubi8-latest'
    -      sourceMapping: /projects
    +      sourceMapping: /projects/helloworld-example
         name: runtime
    ```

8. The `runtime` container will host the expressjs app which listens on port `3000`, define this port in the component by specifying an entry under 
[`endpoints`](./devfile-schema#components-container-endpoints)
    - Each endpoint has at least a `name` to identify them and the `targetPort` to specify the port number to forward

        ```diff {% title="Endpoints" %}
         components:
           - attributes:
               controller.devfile.io/merge-contribution: true
             container:
               env:
                 - name: CHE_DASHBOARD_URL
                   value: '...'
                 - name: CHE_PLUGIN_REGISTRY_URL
                   value: '...'
                 - name: CHE_PLUGIN_REGISTRY_INTERNAL_URL
                   value: '...'
                 - name: OPENVSX_REGISTRY_URL
                   value: '...'
               image: 'quay.io/devfile/universal-developer-image:ubi8-latest'
               sourceMapping: /projects/helloword-example
        +      endpoints:
        +        - name: http-3000
        +          targetPort: 3000
             name: runtime
        ```

9. Now that the `runtime` container is defined, [`commands`](./devfile-schema#commands) are needed to tell Che what to do during the step of the development runtime. Define the command to install the dependencies needed to run the application (`npm install`)
    - The `id` field identifies the command by a label which can be used to specify which command to run by the dev tool
    - An [`exec`](./devfile-schema#commands-exec) command specifies explicit shell command(s) to run on a given `component`
    - `commandLine` defines the shell command(s) to execute as part of that devfile command
    - The `group` specifies what `kind` of command it is or if it is the default of its kind, `isDefault`
        - `build` commands runs before `run` commands

            ```yaml {% title="Install command" %}
            commands:
              - id: install
                exec:
                  commandLine: npm install
                  component: runtime
                  workingDir: ${PROJECT_SOURCE}
                  group:
                    isDefault: true
                    kind: build
            ```

10. Next, define the command to run the application (`node app.js`)

    ```yaml {% title="Run command" %}
    commands:
      - id: run
        exec:
          commandLine: node app.js
          component: runtime
          workingDir: ${PROJECT_SOURCE}
          group:
            isDefault: true
            kind: run
    ```

11. Now the devfile is ready to be used to run the application with Eclipse Che

    ```yaml {% title="Complete Workspace Devfile" %}
    schemaVersion: <version>
    metadata:
      name: empty-arh4
      namespace: <user>-che
    attributes:
      controller.devfile.io/devworkspace-config:
        name: devworkspace-config
        namespace: eclipse-che
      controller.devfile.io/storage-type: per-user
    components:
      - attributes:
          controller.devfile.io/merge-contribution: true
        container:
          env:
            - name: CHE_DASHBOARD_URL
              value: '...'
            - name: CHE_PLUGIN_REGISTRY_URL
              value: '...'
            - name: CHE_PLUGIN_REGISTRY_INTERNAL_URL
              value: '...'
            - name: OPENVSX_REGISTRY_URL
              value: '...'
          image: 'quay.io/devfile/universal-developer-image:ubi8-latest'
          sourceMapping: /projects/helloworld-example
          endpoints:
            - name: http-3000
              targetPort: 3000
        name: runtime
    commands:
      - id: install
        exec:
          commandLine: npm install
          component: runtime
          workingDir: ${PROJECT_SOURCE}
          group:
            isDefault: true
            kind: build
      - id: run
        exec:
          commandLine: node app.js
          component: runtime
          workingDir: ${PROJECT_SOURCE}
          group:
            isDefault: true
            kind: run
    ```

12. Start and open the workspace

13. Before we can run the devfile, create the files which make up the simple [hello world Express.js](https://expressjs.com/en/starter/hello-world.html) application
    
    ```json {% title="package.json file" filename="package.json" %}
    {
        "name": "helloworld-devfile",
        "version": "1.0.0",
        "description": "",
        "main": "app.js",
        "type": "module",
        "dependencies": {
            "@types/express": "^4.17.17",
            "express": "^4.18.2"
        }
    }
    ```

    ```js {% title="Application source code" filename="app.js" %}
    import express from "express"

    const PORT = 3000
    const app = express()

    app.get("/", (req, res) => {
        res.send("Hello world!")
    })

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}..`)
    })
    ```

14. Run the `install` command by opening the menu, open 'Terminal/Run Task', under the 'Run Task' menu open 'devfile/devfile: install', the task should open
a terminal with the following

    ``` {% title="Output of running the 'install' command in Che" %}
     *  Executing task: devfile: install 


    added 67 packages, and audited 68 packages in 8s

    7 packages are looking for funding
      run `npm fund` for details

    found 0 vulnerabilities
    npm notice 
    npm notice New major version of npm available! 8.3.1 -> 9.6.5
    npm notice Changelog: https://github.com/npm/cli/releases/tag/v9.6.5
    npm notice Run npm install -g npm@9.6.5 to update!
    npm notice 
     *  Terminal will be reused by tasks, press any key to close it. 
    ```

15. Run the application with the `run` command by going through the same steps as `install` but under the 'Run Task' menu open 'devfile/devfile: run', the task should open
    - The `run` command will execute until the user interrupts it, such as killing it with *Ctrl-C*

    ``` {% title="Output of running the 'run' command in Che" %}
     *  Executing task: devfile: run 

    Listening on port 3000..
    ```

16. Under the 'EXPLORER', expand the 'ENDPOINTS' panel and copy the `http-3000` endpoint URL

17. Paste the endpoint URL in a new tab and the response should just show "Hello World!"

18. (Optional) Normally when creating a workspace it is recommended to use a sample under 'Select a Sample' from the embedded devfile registry to 
start your project, a similar devfile project workspace can be created using the 'Node.js Express Web Application' sample

19. Congratulations! You have written your first devfile project with Eclipse Che!

## Additional Resources

- [Devfile Schema](./devfile-schema)
- [Adding components](./adding-components)
- [Adding commands](./adding-commands)
- [Eclipse Che docs](https://www.eclipse.org/che/docs/stable/overview/introduction-to-eclipse-che/)
