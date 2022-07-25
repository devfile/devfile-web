This section describes common problems during the devfile migration and
potential solutions.

Workspace fails to start after the conversion  
Try referencing the [Universal Developer
Image](https://quay.io/repository/devfile/universal-developer-image) as
the only component in the devfile:

```yaml
components:
  - name: tools
    container:
      image: quay.io/devfile/universal-developer-image:ubi8-latest
      memoryLimit: 3Gi
```

[Universal Developer
Image](https://quay.io/repository/devfile/universal-developer-image)
provides runtimes for various languages (including Java, Node.js,
Python, PHP, Golang) and tools (including `curl`, `jq`, `git`) for
development.

Conversion fails with `Error processing devfile: failed to merge DevWorkspace volumes: duplicate volume found in devfile: volume_name`  
This means there are multiple volumes defined in the original devfile
with the same name. Remove the duplicate volumes and proceed with the
conversion.

Conversion fails with `Error provisioning storage: Could not rewrite container volume mounts: volume component 'volume_name' is defined multiple times`  
This means the volume defined in the original devfile conflicts with a
`volumeMount` propagated by an editor or a plug-in. Rename the volume in
the devfile to be the same as the name of the `volumeMount` it conflicts
with, and proceed with the conversion.

Conversion fails with `Unable to resolve theia plugins: ms-vscode/node-debug2/latest is a mandatory plug-in but definition is not found on the plug-in registry. Aborting !`  
This means the deprecated `ms-vscode/node-debug2/latest` plug-in is
included in the original devfile, but the newer plug-in registry
includes the updated plug-in `ms-vscode/js-debug/latest`. Replace
`ms-vscode/node-debug2/latest` with `ms-vscode/js-debug/latest` in the
devfile to allow conversion to proceed.
