---
title: "Quick start with OpenShift Dev Spaces"
description: "Quick start with OpenShift Dev Spaces"
---

This guide will run through creating a simple hello world devfile project using Red Hat OpenShift Dev Spaces (Red Hat hosted Eclipse Che). The purpose of this guide is to provide a practical introduction to those just starting out with devfiles.

## Procedure

1. Sign in / Sign up with a free Red Hat account and use the [Red Hat Developer Sandbox](https://developers.redhat.com/developer-sandbox/ide)

2. For this quick start guide, we will create a simple [hello world Express.js](https://expressjs.com/en/starter/hello-world.html) application

3. Create an empty workspace

4. Close and stop the workspace

5. Go to 'Edit the workspace' and view the devfile. The devfile should be populated with content similar to the following
    - The `schemaVersion` of the devfile should be left to what Red Hat OpenShift Dev Spaces supports
    - The `metadata.name` field is the name of the workspace for the project
    - The `metadata.namespace` field is the target namespace your project will be deployed in, for our current intent and purposes this can be left alone

        ```yaml {% title="Empty workspace devfile" %}
        schemaVersion: <version>
        metadata:
          name: empty-wcsr
          namespace: project-namespace
        attributes:
          controller.devfile.io/devworkspace-config:
            name: devworkspace-config
            namespace: crw
          controller.devfile.io/scc: container-build
          controller.devfile.io/storage-type: common
        components:
          - attributes:
              che-code.eclipse.org/contribute-cpuLimit: true
              che-code.eclipse.org/contribute-cpuRequest: true
              che-code.eclipse.org/contribute-endpoint/che-code: 3100
              che-code.eclipse.org/contribute-endpoint/code-redirect-1: 13131
              che-code.eclipse.org/contribute-endpoint/code-redirect-2: 13132
              che-code.eclipse.org/contribute-endpoint/code-redirect-3: 13133
              che-code.eclipse.org/contribute-entry-point: true
              che-code.eclipse.org/contribute-memoryLimit: true
              che-code.eclipse.org/contribute-memoryRequest: true
              che-code.eclipse.org/contribute-volume-mount/checode: /checode
              che-code.eclipse.org/contributed-container: universal-developer-image
            container:
              command:
                - /checode/entrypoint-volume.sh
              cpuLimit: 500m
              cpuRequest: 30m
              endpoints:
                - attributes:
                    contributed-by: che-code.eclipse.org
                    cookiesAuthEnabled: true
                    discoverable: false
                    type: main
                    urlRewriteSupported: true
                  exposure: public
                  name: che-code
                  protocol: https
                  secure: false
                  targetPort: 3100
                - attributes:
                    contributed-by: che-code.eclipse.org
                    discoverable: false
                    urlRewriteSupported: false
                  exposure: public
                  name: code-redirect-1
                  protocol: http
                  targetPort: 13131
                - attributes:
                    contributed-by: che-code.eclipse.org
                    discoverable: false
                    urlRewriteSupported: false
                  exposure: public
                  name: code-redirect-2
                  protocol: http
                  targetPort: 13132
                - attributes:
                    contributed-by: che-code.eclipse.org
                    discoverable: false
                    urlRewriteSupported: false
                  exposure: public
                  name: code-redirect-3
                  protocol: http
                  targetPort: 13133
              env:
                - name: CHE_DASHBOARD_URL
                  value: '...'
                - name: CHE_PLUGIN_REGISTRY_URL
                  value: '...'
                - name: CHE_PLUGIN_REGISTRY_INTERNAL_URL
                  value: '...'
                - name: OPENVSX_REGISTRY_URL
                  value: '...'
              image: 'quay.io/devfile/universal-developer-image:ubi8-38da5c2'
              memoryLimit: 1024Mi
              memoryRequest: 256Mi
              sourceMapping: /projects
              volumeMounts:
                - name: checode
                  path: /checode
            name: universal-developer-image
        ```

        {% callout title="Note!" %}
        Careful when editing and removing fields from the devfile for your workspace,
        a portion of these initial fields are used to configure the workspace itself.
        The following steps will show what changes can be made to meet our goal.
        {% /callout %}

6. Change the value following component fields to set the component name to `runtime`
    - `name` is the identifier used to refer to the component
    - `che-code.eclipse.org/contributed-container` is a OpenShift Dev Spaces specific field for referring to the contributed container component
    by the `name`

        ```diff {% title="Field changes for changing the component name" %}
         components:
           - attributes:
               ...
        -      che-code.eclipse.org/contributed-container: universal-developer-image
        +      che-code.eclipse.org/contributed-container: runtime
             ...
        -    name: universal-developer-image
        +    name: runtime
        ```

7. Change the `sourceMapping` to `/projects/helloworld-example` in the `runtime` component to set the project directory

    ```diff {% title="Field change for project directory" %}
     components:
       - ...
         container:
           ...
    -      sourceMapping: /projects
    +      sourceMapping: /projects/helloworld-example
           ...
         name: runtime
    ```

8. The `runtime` container will host the expressjs app which listens on port `3000`, define this port in the component by specifying an entry under 
[`endpoints`](./devfile-schema#components-container-endpoints)
    - Each endpoint has at least a `name` to identify them and the `targetPort` to specify the port number to forward

        ```diff {% title="Endpoints" %}
         components:
           - ...
             container:
               ...
        +      endpoints:
        +        - name: http-3000
        +          targetPort: 3000
                 ...
             name: runtime
        ```

9. Now that the `runtime` container is defined, [`commands`](./devfile-schema#commands) are needed to tell OpenShift Dev Spaces what to do during the step of the development runtime. Define the command to install the dependencies needed to run the application (`npm install`)
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

11. Now the devfile is ready to be used to run the application with OpenShift Dev Spaces

    ```yaml {% title="Complete Workspace Devfile" %}
    schemaVersion: <version>
    metadata:
      name: empty-wcsr
      namespace: project-namespace
    attributes:
      controller.devfile.io/devworkspace-config:
        name: devworkspace-config
        namespace: crw
      controller.devfile.io/scc: container-build
      controller.devfile.io/storage-type: common
    components:
      - attributes:
          che-code.eclipse.org/contribute-cpuLimit: true
          che-code.eclipse.org/contribute-cpuRequest: true
          che-code.eclipse.org/contribute-endpoint/che-code: 3100
          che-code.eclipse.org/contribute-endpoint/code-redirect-1: 13131
          che-code.eclipse.org/contribute-endpoint/code-redirect-2: 13132
          che-code.eclipse.org/contribute-endpoint/code-redirect-3: 13133
          che-code.eclipse.org/contribute-entry-point: true
          che-code.eclipse.org/contribute-memoryLimit: true
          che-code.eclipse.org/contribute-memoryRequest: true
          che-code.eclipse.org/contribute-volume-mount/checode: /checode
          che-code.eclipse.org/contributed-container: runtime
        container:
          command:
            - /checode/entrypoint-volume.sh
          cpuLimit: 500m
          cpuRequest: 30m
          endpoints:
            - name: http-3000
              targetPort: 3000
            - attributes:
                contributed-by: che-code.eclipse.org
                cookiesAuthEnabled: true
                discoverable: false
                type: main
                urlRewriteSupported: true
              exposure: public
              name: che-code
              protocol: https
              secure: false
              targetPort: 3100
            - attributes:
                contributed-by: che-code.eclipse.org
                discoverable: false
                urlRewriteSupported: false
              exposure: public
              name: code-redirect-1
              protocol: http
              targetPort: 13131
            - attributes:
                contributed-by: che-code.eclipse.org
                discoverable: false
                urlRewriteSupported: false
              exposure: public
              name: code-redirect-2
              protocol: http
              targetPort: 13132
            - attributes:
                contributed-by: che-code.eclipse.org
                discoverable: false
                urlRewriteSupported: false
              exposure: public
              name: code-redirect-3
              protocol: http
              targetPort: 13133
          env:
            - name: CHE_DASHBOARD_URL
              value: '...'
            - name: CHE_PLUGIN_REGISTRY_URL
              value: '...'
            - name: CHE_PLUGIN_REGISTRY_INTERNAL_URL
              value: '...'
            - name: OPENVSX_REGISTRY_URL
              value: '...'
          image: 'quay.io/devfile/universal-developer-image:ubi8-38da5c2'
          memoryLimit: 1024Mi
          memoryRequest: 256Mi
          sourceMapping: /projects/helloworld-example
          volumeMounts:
            - name: checode
              path: /checode
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

    ``` {% title="Output of running the 'install' command" %}
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

    ``` {% title="Output of running the 'run' command" %}
     *  Executing task: devfile: run 

    Listening on port 3000..
    ```

16. Under the 'EXPLORER', expand the 'ENDPOINTS' panel and copy the `http-3000` endpoint URL

17. Paste the endpoint URL in a new tab and the response should just show "Hello World!"

18. (Optional) Normally when creating a workspace it is recommended to use a sample under 'Select a Sample' from the embedded devfile registry to 
start your project, a similar devfile project workspace can be created using the 'Node.js Express Web Application' sample

19. Congratulations! You have written your first devfile project with Red Hat OpenShift Dev Spaces!

## Additional Resources

- [Devfile Schema](./devfile-schema)
- [Adding components](./adding-components)
- [Adding commands](./adding-commands)
- [Quick start with Eclipse Che](../2.2.0/quickstart-che)
- [Eclipse Che docs](https://www.eclipse.org/che/docs/stable/overview/introduction-to-eclipse-che/)