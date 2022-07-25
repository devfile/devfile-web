This section describes how to migrate components to v2.x devfiles.

1.  Component is a polymorphic type

    The validation component is now defined as a polymorphic type and
    can be implemented as `container`, `kubernetes`, `openshift`, or
    `volume`.

```yaml
components:
    - name: mydevfile
    - container:
        image: maven
        ...
    - container:
        image: nodejs
        ...
    - kubernetes:
        uri: https://.../mongo.yaml
```

**Additional resources**

For more information on migrating components, go to the following
GitHub issues:

- [Polymorphic component
  type](https://github.com/devfile/api/issues/4)

- [Shared volumes across
  components](https://github.com/devfile/api/issues/19)

- [Out of main pod
  containers](https://github.com/devfile/api/issues/48)

- [Replace alias with
  name](https://github.com/devfile/api/issues/9)

- [Rename dockerimage component
  type](https://github.com/devfile/api/issues/8)

- [Specify source path for
  containers](https://github.com/devfile/api/issues/17)

- [Specify size of volume for
  components](https://github.com/devfile/api/issues/14)

- [Container endpoints: routes and
  ingresses](https://github.com/devfile/api/issues/27)
