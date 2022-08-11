---
title: Defining kubernetes resources
description: Defining kubernetes resources
---

Complex deployments can be described using Kubernetes or OpenShift
resource lists that can be referenced in the devfile. This makes them a
part of the workspace

## Procedure

- Because a {prod-short} workspace is internally represented as a single deployment, all resources from
    the Kubernetes or OpenShift list are merged into that single deployment.

- Be careful when designing such lists because this can result in name
    conflicts and other problems.

- Only the following subset of the Kubernetes objects are supported:
    `deployments`, `pods`, `services`, `persistent volume claims`,
    `secrets`, and `config maps`. Kubernetes Ingresses are ignored, but
    OpenShift routes are supported. A workspace created from a devfile
    using any other object types fails to start.

- When running {prod-short} on a Kubernetes cluster, only Kubernetes lists are supported. When running
    {prod-short} on an OpenShift cluster, both Kubernetes and OpenShift lists are supported.

```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.0.0
metadata:
  name: MyDevfile
projects:
  - name: my-go-project
    clonePath: go/src/github.com/acme/my-go-project
    git:
      remotes:
        origin: "https://github.com/acme/my-go-project.git"
components:
  - name: MyDevfile
    kubernetes:
      reference: ../relative/path/postgres.yaml
```

The following is an example of the `postgres.yaml` file.

```yaml {% filename="devfile.yaml" %}
apiVersion: v1
kind: List
items:
  - apiVersion: v1
    kind: Deployment
    metadata:
      name: postgres
      labels:
        app: postgres
    spec:
      template:
        metadata:
          name: postgres
          app:
            name: postgres
        spec:
          containers:
            - image: postgres
              name: postgres
              ports:
                - name: postgres
                  containerPort: 5432
                  volumeMounts:
                    - name: pg-storage
                      mountPath: /var/lib/postgresql/data
          volumes:
            - name: pg-storage
              persistentVolumeClaim:
                claimName: pg-storage
  - apiVersion: v1
    kind: Service
    metadata:
      name: postgres
      labels:
        app: postgres
        name: postgres
    spec:
      ports:
        - port: 5432
          targetPort: 5432
      selector:
        app: postgres
  - apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: pg-storage
      labels:
        app: postgres
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
```

For a basic example of a devfile with an associated Kubernetes or
OpenShift list, see
[web-nodejs-with-db-sample](https://github.com/redhat-developer/devfile/tree/master/samples/web-nodejs-with-db-sample)
on redhat-developer GitHub.

If you use generic or large resource lists from which you will only need
a subset of resources, you can select particular resources from the list
using a selector (which, as the usual Kubernetes selectors, works on the
labels of the resources in the list).

```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.0.0
metadata:
  name: MyDevfile
projects:
  - name: my-go-project
    clonePath: go/src/github.com/acme/my-go-project
    git:
      remotes:
        origin: "https://github.com/acme/my-go-project.git"
components:
  - name: MyDevfile
    kubernetes:
      reference: ../relative/path/postgres.yaml
      selector:
        app: postgres
```

Additionally, it is also possible to modify the entrypoints (command and
arguments) of the containers present in the resource list. For details
of the advanced use case, see the reference (TODO: link).

## Additional resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
