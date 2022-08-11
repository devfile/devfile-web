---
title: Defining kubernetes resources
description: Defining kubernetes resources
---

This section explains how to reference Kubernetes or OpenShift resource
lists in devfiles in order to describe complex deployments.

## Procedure

- Because a devfile is internally represented as a single deployment,
  all resources from the Kubernetes or OpenShift list merge into that
  single deployment.

- Avoid name conflicts when designing such lists.

- When running devfiles on a Kubernetes cluster, only Kubernetes lists
  are supported. When running devfiles on an OpenShift cluster, both
  Kubernetes and OpenShift lists are supported:

  - `deployments`

  - `pods`

  - `services`

  - `persistent volume claims`

  - `secrets`

  - `config maps`

Kubernetes Ingresses are ignored, but OpenShift routes are supported. A
workspace created from a devfile using any other object types fails to
start.

- When running devfiles on a Kubernetes cluster, only Kubernetes lists
  are supported. When running devfiles on an OpenShift cluster, both
  Kubernetes and OpenShift lists are supported.

The following component references a file that is relative to the
location of the devfile:

```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.2.0
metadata:
  name: mydevfile
projects:
  - name: my-go-project
    clonePath: go/src/github.com/acme/my-go-project
    git:
      remotes:
        origin: 'https://github.com/acme/my-go-project.git'
components:
  - name: mydevfile
    kubernetes:
      uri: ../relative/path/postgres.yaml
```

The following is an example of the `postgres.yaml` file:

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
[web-nodejs-with-db-sample](https://github.com/redhat-developer/devfile/tree/master/samples/web-nodejs-with-db-sample).
