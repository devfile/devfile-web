Create a devfile stack to package into the devfile registry so you can
quickly access, share, and duplicate your different stacks for your
various projects.

1. Create a stack folder with a name that matches the stack name. For
    example, `java-wildfly/`.

2. Create version directories for storing different stack versions.
    Each directory under the stack must correspond to a specific
    version, for example, `java-wildfly/1.0.0`.

3. Create a `stack.yaml` file to store the stack information.

4. Verify every devfile stack version contains at least one
    `devfile.yaml` file. Add other required files to the stack version.
    These files can include VSX plug-ins, Dockerfiles, or Kubernetes
    manifests.

- To create `stack.yaml`, see [???](/docs/2.1.0/adding-a-stack-yaml-file.adoc).

- To create devfiles, see [???](/docs/2.1.0/authoring-devfiles.adoc).
