Deploy a devfile registry to allow access to the devfile stacks that
provide templates for containerized development.

To use the devfile Operator to deploy a devfile registry, use:

- Operator Lifecycle Manager (OLM)

- Devfile registry Helm chart

- A built devfile registry container image. To build your own devfile
  registry, see [???](/docs/2.1.0/building-a-custom-devfile-registry.adoc).

- If you do not have publicly signed certificates for your cluster,
  disable TLS for the devfile registry so that you can use the devfile
  registry with `odo`.

# Deploying a devfile registry with Operator Lifecycle Manager

When you have Operator Lifecycle Manager (OLM) installed on your
cluster, use the devfile registry Operator to install and deploy a
devfile registry.

1. Install the devfile registry Operator:

    1. Install
        [OLM](https://github.com/operator-framework/operator-lifecycle-manager).

    2. Download and install the [operator-sdk
        CLI](https://mirror.openshift.com/pub/openshift-v4/clients/operator-sdk/latest/).

    3. Run the `operator-sdk` command to install the devfile registry
        Operator:

            operator-sdk run bundle quay.io/devfile/registry-operator-bundle:next

2. Deploy the devfile registry:

    1. On an OpenShift cluster, run:

```bash
$ cat <<EOF | oc apply -f -
apiVersion: registry.devfile.io/v1alpha1
kind: DevfileRegistry
metadata:
    name: devfile-registry
spec:
    devfileIndexImage: quay.io/devfile/devfile-index:next
EOF
```

    2.  On a Kubernetes cluster, run:

```bash
$ cat <<EOF | kubectl apply -f -
apiVersion: registry.devfile.io/v1alpha1
kind: DevfileRegistry
metadata:
    name: devfile-registry
spec:
    devfileIndexImage: quay.io/devfile/devfile-index:next
        tls:
    enabled: false
    k8s:
    ingressDomain: $INGRESS_DOMAIN
EOF
```

Regardless of the cluster, if you are deploying your own devfile
registry, change the `devfileIndexImage` field to the container image
that you built.

- For information on installing the devfile registry Operator, see
  [devfile registry
  Operator](https://github.com/devfile/registry-operator).

- For information on installing OLM on your Kubernetes cluster, see
  the [OLM quick start
  guide](https://olm.operatorframework.io/docs/getting-started/).

# Deploying a devfile registry with Helm chart

If the Operator Lifecycle Manager (OLM) is not installed on your
Kubernetes cluster, use the devfile registry Helm chart in order to use
the devfile registry Operator to deploy the devfile registry.

1. Clone the repository containing the Helm chart:

```bash
git clone https://github.com/devfile/registry-support
```

2. Navigate to the `deploy/chart/devfile-registry` directory.

3. Open the `values.yaml` file in an editor and make the following
    changes:

    1. Set `devfileIndex.image` to the image containing your devfile
        stacks.

    2. Set `devfileIndex.tag` to the image tag for your devfile index
        image.

    3. If installing on Kubernetes, set `global.Ingress.domain` to the
        Ingress domain of your cluster.

    4. If installing on OpenShift, set `global.isOpenShift` to `true`.

4. Run `helm install devfile-registry ./` to install the Helm chart.

- For information on the devfile registry Helm chart, see the
  [registry Helm chart Git repository
  readme](https://github.com/devfile/registry-support/blob/master/deploy/chart/devfile-registry/README.md).
