This section describes how to migrate the existing schema version to a
v2.x devfile.

1.  To migrate a schema version from a v1.x devfile to a v2.x devfile,
    replace `apiVersion: 1.0.0` with `schemaVersion: 2.2.0`:

```yaml
apiVersion: 1.0.0
metadata:
  name: devfile-sample
```

```yaml
schemaVersion: 2.2.0
metadata:
  name: devfile-sample
```

**Additional resources**

For more information on migrating schema versions, go to the
following GitHub issue: [schemaVersion
attribute](https://github.com/devfile/api/issues/7).
