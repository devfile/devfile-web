Use the devfile specification to develop a Node.js “Hello World”
application. Developing this application introduces you to how a devfile
automates and simplifies your development process.

**Prerequisites**

To make developing with the devfile specification easier, consider doing
the following:

- Install [minikube](https://minikube.sigs.k8s.io/docs/start/) to
  create a Kubernetes cluster on your local machine.

- Download
  [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
  to access your namespace.

- Enable [ingress on
  minikube](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)
  to access your devfile project.

- Install the [odo command line interface (CLI)
  tool](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.6/html/cli_tools/developer-cli-odo#installing-odo)
  to execute the devfile specification.

1. View the available devfiles:

```bash
odo catalog list components
```

2. Run `odo create nodejs _<name of your project>_ --starter` to create
    a devfile project.

    - Add the `--starter` parameter to include the starter project
      currently inside the Node.js devfile specification, which makes
      it easier for you to develop an application.

3. Run `minikube IP` to find your cluster IP address.

4. Run
    `odo url create _<name you give the url>_ --ingress --host _<IP address>_.nip.io`.
    Doing so creates an ingress inside your cluster that you can use to
    access your application using the cluster IP address.

    - Example:
      `odo url create myfirstproject --ingress --host 192.168.64.2.nip.io`.

5. Run `odo push` to build the URL.

- To verify that you built your Node.js "Hello World" application
  successfully, view the application in a web browser by copying and
  pasting the URL that was produced by running the `odo push` command.
  Go to the URL and view your "Hello World" application.

**Additional resources**

To continue working with devfiles, go to [Authoring
devfiles](/docs/2.1.0/authoring-devfiles.adoc).
