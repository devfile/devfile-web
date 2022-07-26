You can use a `volume` component to share files among container
components and collaborate with other teams during the development
process.

- [???](/docs/2.1.0/adding-schema-version-to-a-devfile.adoc)

- [???](/docs/2.1.0/adding-a-name-to-a-devfile.adoc)

- [???](/docs/2.1.0/adding-components-to-a-devfile.adoc)

1. Add a `volume` component and specify the size of it.

**Minimal `volume` example**

```yaml
schemaVersion: 2.2.0
metadata:
  name: mydevfile
components:
  - name: mydevfile
    volume:
      size: 200G
```

2. If you do not want your `volume` component to persist across
    restarts, specify it as ephemeral.

**Ephemeral `volume` example**

```yaml
schemaVersion: 2.2.0
metadata:
  name: mydevfile
components:
  - name: mydevfile
    volume:
      ephemeral: true
      size: 200G
```

Specifying the size of a `volume` component is dependent on the tools you use and might be subject to the limitations of the tools.

- [???](/docs/2.1.0/api-reference.adoc)

- [???](/docs/2.1.0/devfile-resources.adoc)
