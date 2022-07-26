---
title: Defining endpoints
description: Defining endpoints
---

Components of any type can specify the endpoints that the container exposes. These endpoints can be made accessible to the users if the {prod-short} cluster is running using a Kubernetes ingress or an OpenShift route and to the other components within the workspace. You can create an endpoint for your application or database, if your application or database server is listening on a port and you want to be able to directly interact with it yourself or you want other components to interact with it.

## Procedure

1. Specify endpoints properties as shown in the following example:

    ```yaml {% title="Specify endpoints properties" filename="devfile.yaml" %}
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
      - name: go
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
          env:
            - name: GOPATH
              value: $(PROJECTS_ROOT)/go
            - name: GOCACHE
              value: /tmp/go-cache
          endpoints:
          - name: web
            targetPort: 8080
            exposure: public
            protocol: http
      - name: postgres
        container:
          image: postgres
          memoryLimit: 512Mi
          env:
            - name: POSTGRES_USER
              value: user
            - name: POSTGRES_PASSWORD
              value: password
            - name: POSTGRES_DB
              value: database
          endpoints:
            - name: postgres
              targetPort: 5432
              configuration:
                discoverable: true
                public: false
    ```

Here, there are two container, each defining a single endpoint. Endpoint
is an accessible port that can be made accessible inside the workspace
or publicly (example, from the UI). Each endpoint has a name and port,
which is the port on which certain server running inside the container
is listening. The following are a few attributes that you can set on the
endpoint:

- `exposure`: When its value is `public`, the endpoint is accessible
    outside the workspace. Users can access such an endpoint from the
    devfile user interface, and the endpoint is always exposed on port
    80 or 443 depending on whether TLS is enabled in the devfile.

- `protocol`: For public endpoints the protocol is a hint to the UI on
    how to construct the URL for the endpoint access. Typical values are
    `http`, `https`, `ws`, `wss`.

- `secure`: A boolean (defaulting to `false`) specifying whether the
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

When starting a new server within a component, {prod-short} autodetects this, and the UI offers to automatically expose this port as a `public` port. This is useful for debugging a web application, for example. It is impossible to do this for servers that autostart with the container (for example, a database server). For such components, specify the endpoints explicitly.

Example specifying endpoints for `kubernetes`/`openshift` and `plugin`
types:

```yaml {% filename="devfile.yaml" %}
schemaVersion: 2.0.0
metadata:
  name: MyDevfile
components:
  - name: theia-editor
    plugin:
      id: eclipse/che-theia/next
      endpoints:
      - name: 'theia-extra-endpoint'
        targetPort: 8880
        exposure: public
  - plugin:
      id: redhat/php/latest
      memoryLimit: 1Gi
      endpoints:
      - name: 'php-endpoint'
        targetPort: 7777
  - plugin:
      name: theia-editor
      id: eclipse/che-theia/next
      endpoints:
      - name: 'theia-extra-endpoint'
        targetPort: 8880
        exposure: public
  - openshift:
      name: webapp
      reference: webapp.yaml
      endpoints:
      - name: 'web'
        targetPort: 8080
        exposure: public
        protocol: http
  - openshift:
      name: mongo
      reference: mongo-db.yaml
      endpoints:
      - name: 'mongo-db'
        targetPort: 27017
        exposure: public
```

## Additional resources

- [API reference](./devfile-schema)

- [Devfile samples](./devfile-samples)
