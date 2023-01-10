---
title: Developing with devfiles
description: Developing with devfiles
---

Use the devfile specification to develop a Node.js “Hello World”
application. Developing this application introduces you to how a devfile
automates and simplifies your development process.

## Prerequisites

To make developing with the devfile specification easier, consider doing
the following:

- Install [minikube](https://minikube.sigs.k8s.io/docs/start/) to
  create a Kubernetes cluster on your local machine.

- Download
  [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
  to access your namespace.

- Install the [odo command line interface (CLI)
  tool](https://odo.dev/docs/overview/installation)
  to execute the devfile specification.

## Procedure

1. Create a Kubernetes namespace:

    ```shell-session
    $ odo create namespace <namespace>
    ```

2. Initialize the application:

    ```shell-session
    $ odo init --name <component name> --devfile nodejs --devfile-registry DefaultDevfileRegistry --starter nodejs-starter
    ```

    {% callout title="Note!" %}
    An interactive mode is available, which makes it easier to browse options.
    To enable, run the command without flags: `$ odo init`.
    For more information about initialization, see the [odo docs](https://odo.dev/docs/command-reference/init).
    {% /callout %}

3. Start the application:

    ```shell-session
    $ odo dev
    ```

## Verification

- To verify that you built your Node.js "Hello World" application
  successfully, view the application in a web browser by copying and
  pasting the URL that was produced by running the `odo dev` command.
  Go to the URL and view your "Hello World" application.

## Additional resources

To continue working with devfiles, go to [overview](./overview).
