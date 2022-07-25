You can add an `image` component to a devfile.

- [???](#adding-schema-version-to-a-devfile.adoc)

- [???](#adding-a-name-to-a-devfile.adoc)

- [???](#adding-components-to-a-devfile.adoc)

1.  Define a component using the type `image`.

Specify the location of the Dockerfile using the `uri` property.
Specify arguments to be passed during the build with `args`.
`buildContext` is the path of source directory to establish build
context. If `rootRequired` is set to true, a privileged builder pod
is required. The built container will be stored in the image
provided by `imageName`.

**An `image` dockerfile component**

```yaml
components:
  - name: outerloop-build
    image:
      imageName: python-image:latest
      autoBuild: true
      dockerfile:
        uri: docker/Dockerfile
        args:
          - 'MY_ENV=/home/path'
        buildContext: .
        rootRequired: false
```

Alternatively, specify `git` and `devfileRegistry` as the image
source.

When specifying `git`, `fileLocation` refers to the location of the
Dockerfile in the git repository. Specify the `remotes` for the git
repository and a `checkoutFrom` to indicate which `revision` to
check the source from.

**An `image` dockerfile component with git source**

```yaml
components:
  - name: outerloop-build
    image:
      imageName: python-image:latest
      dockerfile:
        git:
          fileLocation: 'uri/Dockerfile'
          checkoutFrom:
            revision: 'main'
            remote: 'origin'
          remotes:
            'origin': 'https://github.com/myorg/myrepo'
        buildContext: .
```

When specifying `devfileRegistry`, `id` refers to the Id in a
devfile registry that contains a Dockerfile. `registryUrl` refers to
the Devfile Registry URL to pull the Dockerfile from

**An `image` dockerfile component with devfileRegistry source**

```yaml
components:
  - name: outerloop-build
    image:
      imageName: python-image:latest
      dockerfile:
        devfileRegistry:
          id: python
          registryUrl: myregistry.devfile.com
        buildContext: .
```
