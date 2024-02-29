---
title: Defining endpoints
description: Defining endpoints
---

Components of any type can specify the endpoints that the container exposes. These endpoints can be made accessible to the users if the {prod-short} cluster is running using a Kubernetes ingress or an OpenShift route and to the other components within the workspace. You can create an endpoint for your application or database, if your application or database server is listening on a port and you want to be able to directly interact with it yourself or you want other components to interact with it.

TEMP UPDATE - DOC

## Procedure

1. Specify endpoints properties as shown in the following example:

    ```yaml {% title="Specifying endpoint properties" filename="devfile.yaml" %}
    schemaVersion: 2.1.0
    metadata:
      name: mydevfile
    projects:
      - name: my-go-project
        clonePath: go/src/github.com/acme/my-go-project
        git:
          remotes:
            origin: "https://github.com/acme/my-go-project.git"
    components:
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
          env:
            - name: gopath
              value: $(PROJECTS_ROOT)/go
            - name: gocache
              value: /tmp/go-cache
          endpoints:
          - name: web
            targetPort: 8080
            exposure: public
      - name: postgres
        container:
          image: postgres
          memoryLimit: 512Mi
          env:
            - name: postgres_user
              value: user
            - name: postgres_password
              value: password
            - name: postgres_db
              value: database
          endpoints:
            - name: postgres
              targetPort: 5432
              exposure: none
    ```

Here, there are two container, each defining a single endpoint. Endpoint
is an accessible port that can be made accessible inside the workspace
or publicly from the UI. Each endpoint has a name and port, which is the
port on which certain server running inside the container is listening.
The following are a few attributes that you can set on the endpoint:

- `exposure`: When its value is `public`, the endpoint is accessible outside the workspace. Users can
    access such an endpoint from the {prod-short} user interface and is always exposed on port `80` or `443` depending on whether TLS is enabled in {prod-short}.

- `protocol`: For public endpoints, the protocol is a hint to the UI
    on how to construct the URL for the endpoint access. Typical values
    are `http`, `https`, `ws`, `wss`.

- `secure`: A boolean defaulting to `false` that specifies whether the
    endpoint is put behind a JWT proxy requiring a JWT workspace token
    to grant access. The JWT proxy is deployed in the same Pod as the
    server and assumes the server listens solely on the local loopback
    interface, such as `127.0.0.1`.

    {% callout type="warning" title="Warning!" %}
    Listening on any other interface than the local loopback poses a
    security risk because such server is accessible without the JWT
    authentication within the cluster network on the corresponding IP
    addresses.
    {% /callout %}

- `path`: The URL of the endpoint.

When starting a new server within a component, {prod-short} autodetects this, and the UI offers to automatically expose this port as an `exposure` port. This exposure is useful for debugging a web application. It is impossible to do this for servers that autostart with the container, for example, a database server. For such components, specify the endpoints explicitly.

```yaml {% title="Specifying endpoints for kubernetes or openshift types" filename="devfile.yaml" %}
schemaVersion: 2.1.0
metadata:
  name: mydevfile
components:
  - openshift:
      name: webapp
      uri: webapp.yaml
      endpoints:
      - name: 'web'
        targetPort: 8080
        exposure: public
  - openshift:
      name: mongo
      uri: mongo-db.yaml
      endpoints:
      - name: 'mongo-db'
        targetPort: 27017
        exposure: public
```
