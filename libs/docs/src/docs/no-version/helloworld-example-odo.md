---
title: "Hello world example: odo v3"
description: "Hello world example: odo v3"
---

This guide will run through creating a simple hello world devfile project using `odo` version 3. The purpose of this guide is to provide a practical introduction to those just starting out with devfiles.

## Perquisites

- `odo` v3
- `kubectl` or `oc`
- Docker 17.05 or higher
- Access to a Kubernetes or OpenShift cluster

## Procedure

1. Start by creating a directory to store a simple [hello world expressjs](https://expressjs.com/en/starter/hello-world.html) application
    
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

2. Create a devfile with the filename `.devfile.yaml`. Add the [`schemaVersion`](./devfile-schema#schema-version) field with the desired devfile specification version to use

    ```yaml {% filename=".devfile.yaml" %}
    schemaVersion: <version>
    ```

3. Next, create the first component to serve as the runtime for the project, for this use the [`container`](./devfile-schema#components-container) component with the name `runtime` and the `node:18-alpine` image
    - `name` is the identifier used to refer to the component
    - `image` is the container image to use for the component

        ```yaml {% filename=".devfile.yaml" %}
        schemaVersion: <version>
        components:
          - name: runtime
            container:
              image: node:18-alpine
        ```

4. The `runtime` container hosts the expressjs app created which listens on port `3000`, define this port in the component by specifying an entry under [`endpoints`](./devfile-schema#components-container-endpoints)
    - Each endpoint has at least a `name` to identify them and the `targetPort` to specify the port number to forward

        ```yaml {% filename=".devfile.yaml" %}
        schemaVersion: <version>
        components:
          - name: runtime
            container:
              image: node:18-alpine
              endpoints:
                - name: http-3000
                  targetPort: 3000
        ```

5. Now that the `runtime` container is defined, [`commands`](./devfile-schema#commands) are needed to tell `odo` what to do during the step of the [development runtime](https://odo.dev/docs/overview/dev_and_deploy#when-should-i-use-odo-dev) (`odo dev`). Define the command to install the dependencies needed to run the application (`npm install`)
    - The `id` field identifies the command by a label which can be used to specify which command to run by the dev tool
        - Example: `odo dev --build-command install`
    - An [`exec`](./devfile-schema#commands-exec) command specifies explicit shell command(s) to run on a given `component`
    - `commandLine` defines the shell command(s) to execute as part of that devfile command
    - The `group` specifies what `kind` of command it is or if it is the default of its kind, `isDefault`
        - `build` commands runs before `run` commands, for more information see [Adding a command group](./adding-a-command-group)

            ```yaml {% filename=".devfile.yaml" %}
            schemaVersion: <version>
            components:
              - name: runtime
                container:
                  image: node:18-alpine
                  endpoints:
                    - name: http-3000
                      targetPort: 3000
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

6. Next, define the command to run the application (`node app.js`)

    ```yaml {% filename=".devfile.yaml" %}
    schemaVersion: <version>
    components:
      - name: runtime
        container:
          image: node:18-alpine
          endpoints:
            - name: http-3000
              targetPort: 3000
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

7. Now the devfile is ready to be used to run the application with `odo`, with a configured `kubectl` or `oc` installed run `odo dev` and you should see the following output
    
    ``` {% title="odo dev output" %}
     __
    /  \__     Developing using the "helloworld-devfile" Devfile
    \__/  \    Namespace: default
    /  \__/    odo version: v3.9.0
    \__/

    ⚠  You are using "default" namespace, odo may not work as expected in the default namespace.
    ⚠  You may set a new namespace by running `odo create namespace <name>`, or set an existing one by running `odo set namespace <name>`

    ↪ Running on the cluster in Dev mode
    •  Waiting for Kubernetes resources  ...
    ⚠  Pod is Pending
    ✓  Pod is Running
    ✓  Syncing files into the container [401ms]
    ✓  Building your application in container (command: install) [1s]
    •  Executing the application (command: run)  ...
    -  Forwarding from 127.0.0.1:20001 -> 3000


    ↪ Dev mode
    Status:
    Watching for changes in the current directory /path/to/project

    Keyboard Commands:
    [Ctrl+c] - Exit and delete resources from the cluster
        [p] - Manually apply local changes to the application on the cluster
    ```

8. The application port `3000` served in the cluster gets routed to your host on a different port (in this case `20001`). Run `curl http://localhost:20001` and you should see the following output

    ``` {% title="Response content returned by curl" %}
    Hello world!%
    ```

9. (Optional) Normally it is recommended to use `odo init` to start your project from a devfile registry stack, see [Developing with Node.JS](https://odo.dev/docs/user-guides/quickstart/nodejs#step-2-initializing-your-application-odo-init) and [Command Reference: odo init](https://odo.dev/docs/command-reference/init) for details

10. Congratulations! You have written your first devfile project with `odo`!

## Additional Resources

- [Devfile Schema](./devfile-schema)
- [Authoring devfiles](./authoring-overview)
- [Adding components](./adding-components)
- [Adding commands](./adding-commands)
- [odo docs](https://odo.dev/docs/introduction)