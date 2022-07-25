This section describes how to define endpoints and specify their
properties.

1.  Specify endpoints properties as shown in the following example:

```yaml
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

This example has two containers that each define an endpoint. An
endpoint has a name and a port that can be made accessible inside the
workspace. The server running inside the container is listening on this
port. See the following attributes that you can set on the endpoint:

- `exposure`: When its value is `public`, the endpoint is accessible
  outside the workspace and is exposed on port `80` or `443` depending
  on whether TLS is enabled in devfiles. Access this endpoint from the
  devfile user interface.

- `protocol`: For public endpoints, the protocol indicates to the
  devfile consumer how to construct the URL for the endpoint access.
  Typical values are `http`, `https`, `ws`, `wss`.

- `secure`: Boolean. The default value is `false`. Setting this value
  to `true` puts the endpoint behind a JWT proxy. When the endpoint is
  secured this way, clients must supply a JWT workspace token to call
  this endpoint. The JWT proxy is deployed in the same Pod as the
  server and assumes the server listens only on the local loopback
  interface, such as `127.0.0.1`.

  Listening on any other interface than the local loopback poses a
  security risk. Such a server is accessible without the JWT
  authentication within the cluster network on the corresponding IP
  addresses.

- `path`: The URL of the endpoint.

**Specifying endpoints for `kubernetes` or `openshift` types:**

```yaml
schemaVersion: 2.2.0
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
