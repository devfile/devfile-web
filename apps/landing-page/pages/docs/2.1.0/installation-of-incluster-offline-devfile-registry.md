A devfile refers to various resources, such as container images and
starter projects. The current devfile registry currently does not store
those supporting resources. Therefore, you must have access to those
resources when using those devfiles.

To support the air gap installation of the devfile registry, the air gap
scenario divides into two stages:

1.  Build a devfile registry based on one or more source repositories so
    that the registry contains all the resources available for offline
    installation.

2.  Install the devfile registry to a cluster to make it available for
    users to access the registry.

# Stage 1: Build and Package a Devfile Registry

The main goal of this stage is:

1.  Pull in resources into the registry as part of the registry build.

2.  Modify the devfile to update references to those offline resources
    as part of the registry build.

- Golang 1.17.x or higher

- Docker 17.05 or higher or Podman 4.0.x or higher

- Git

- Curl

- Archive Tools (such as `unzip`)

## Create Offline Registry

Download / clone the
[devfile/registry](https://github.com/devfile/registry) repository.

- Clone through HTTPS

```bash
git clone https://github.com/devfile/registry.git /path/to/registry
```

- Clone through SSH

```bash
git clone git@github.com:devfile/registry.git /path/to/registry
```

- To create your own registry Git repository, see [Building a custom
  devfile registry](#building-a-custom-devfile-registry.adoc)

## Install Stack Images

You will first need to collect all the image tags used in the stacks
needed for offline access. The image tags collected are to each be
pulled, re-tagged, and installed into the image repository accessible by
the offline cluster. Procedure here will require you to **change the
devfile**.

1.  Use the `docker pull` or the `podman pull` to pull down an image for
    a stack component:

```bash
podman pull registry.access.redhat.com/ubi8/nodejs-16:latest
```

2.  Use the `docker tag` or the `podman tag` to re-tag the image that
    uses the form `<registry_host>:<port>/<project>/<image>`:

```bash
podman tag registry.access.redhat.com/ubi8/nodejs-16:latest \
    <registry_host>:<port>/<project>/nodejs-16:latest
```

3.  Use the `docker push` or `podman push` to push the re-tagged image
    to the image repository at `<registry_host>:<port>`:

```bash
podman push <registry_host>:<port>/<project>/nodejs-16:latest
```

- For more on interacting with the OpenShift Image Registry, see
  [Accessing the
  registry](https://docs.openshift.com/container-platform/4.10/registry/accessing-the-registry.html)

## Packaging Starter Projects

To package starter projects you will need to download them manually then
place them under `/stacks/<stack>/<zip>-offline.zip`. Procedure here
will require you to **change the devfile**.

**Note**: Starter projects must be packaged under an archive with the
suffix `-offline` to be pulled into the registry.

1.  `zip` - Download archive

    Example

```bash
cd /path/to/registry
curl -L https://code.quarkus.io/d?e=io.quarkus%3Aquarkus-resteasy&e=io.quarkus%3Aquarkus-micrometer&e=io.quarkus%3Aquarkus-smallrye-health&e=io.quarkus%3Aquarkus-openshift&cn=devfile \
    -o stacks/java-quarkus/community-offline.zip
```

2.  `git` - Package cloned contents into a directory then archive

    Example

```bash
cd /path/to/registry
git clone https://github.com/odo-devfiles/nodejs-ex.git \
    stacks/nodejs/nodejs-starter-offline
cd stacks/nodejs
zip -r nodejs-starter-offline.zip nodejs-starter-offline
```

## Modify Devfile

Change the devfile so you can update references to those offline
resources as part of the registry build. For all the items pulled into
the registry, update the corresponding devfile entries to reference the
resources within the offline version in the registry:

1.  All location references to `starterProjects` will change to local
    paths relative to the stacks directory.

2.  Stack component image references will change to use the offline
    accessible image repository.

<!-- -->

1.  Under `starterProjects`, find the starter project definition you
    want to make offline.

2.  Under the definition for the starter project find either `git` or
    `zip`:

```yaml
starterProjects:
    - name: nodejs-starter
    git:
        remotes:
        origin: https://github.com/odo-devfiles/nodejs-ex.git
```

3.  Do one of the following depending on the block type:

    - If `git`, replace all of the `git` block with a `zip` block and
      add the `location` to be the path to the local file under the
      stack root directory (`<registry_root>/stacks/<stack>/`).

    - If `zip`, just replace the value of `location` to the local file
      under the stack root directory
      (`<registry_root>/stacks/<stack>/`).

**Verification step**

To confirm you modified your devfile, verify your altered starter
project definition is similar to the following example:

```yaml
starterProjects:
    - name: nodejs-starter
    zip:
        location: nodejs-starter-offline.zip
```

- To learn more about starter projects in devfiles, see [Adding
  projects to a devfile](#adding-projects-to-a-devfile.adoc)

## Build Registry

1.  If not already at the root of the registry, change to the root of
    the registry.

```bash
cd /path/to/registry
```

2.  Build the registry image.

```bash
bash .ci/build.sh
```

- For more information about building your own registry image, see
  [Building a custom devfile
  registry](#building-a-custom-devfile-registry.adoc)

# Stage 2: Install a Devfile Registry to a cluster

In this stage, you will push the container images to a registry
available to the offline cluster.

- Docker 17.05 or higher or Podman 4.0.x or higher

## Install Image into Cluster Image Registry

The process of installing the built images into an offline image
registry depends on which image registry has deployed and which image
registry you have access to.

1.  Use the `docker tag` or the `podman tag` to re-tag the image using
    the form `<registry_host>:<port>/<project>/<image>`:

```bash
podman tag devfile-index <registry_host>:<port>/<project>/devfile-index
```

2.  Use the `docker push` or `podman push` to push the re-tagged image
    to the cluster image registry at `<registry_host>:<port>`:

```bash
podman push <registry_host>:<port>/<project>/devfile-index
```

- For more on interacting with the OpenShift Image Registry, see
  [Accessing the
  registry](https://docs.openshift.com/container-platform/4.10/registry/accessing-the-registry.html)

# Update strategy for refreshing registry contents

Steps to update an already deployed registry in the air gap scenario:

1.  Follow offline registry instructions in the above sections and rerun
    the registry build script to rebuild the devfile registry.

2.  Update the existing offline devfile registry deployment with a newly
    built and updated offline devfile registry image.
