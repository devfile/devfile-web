Use devfile attributes to configure various features and properties
according to user and tooling needs. Attributes are
implementation-dependent and written in free-form YAML. The following
devfile objects can have attributes:

- `metadata`

- `components`

- `commands`

- `projects`

- `starterProjects`

- [???](#adding-schema-version-to-a-devfile.adoc)

- [???](#adding-a-name-to-a-devfile.adoc)

1.  Define a custom attribute

When no editor is specified, a default editor is provided. To
represent this user-defined example, use the `editorFree` attribute
as shown in the following example:

```yaml
schemaVersion: 2.2.0
metadata:
  name: petclinic-dev-environment
  attributes:
    editorFree: true
components:
  - name: myapp
    kubernetes:
      uri: my-app.yaml
```

- [???](#api-reference.adoc)

- [???](#devfile-resources.adoc)
