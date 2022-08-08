---
title: Building a custom devfile registry
description: Building a custom devfile registry
---

Provide your developers a devfile registry so they can access devfile
stacks and samples, enabling them to use devfiles to simplify and
improve their containerized application development.

To create a devfile registry for your team’s container development:

1. Create a Git repository.

2. Build a devfile registry.

3. Tag and push the registry container image.

## Creating a Git repository

Set up a Git repository to store the devfile stacks to package into the
devfile registry.

### Procedure

1. Fork the [devfile/registry](https://github.com/devfile/registry)
    repository.

2. Name your forked repository.

3. Add or remove any stacks you need from this repository.

4. Create a `stacks/` directory for storing the devfile stacks. Each
    directory under `stacks/` must correspond to a specific stack, for
    example, `stacks/java-wildfly/`.

5. To package any external devfile stacks or samples in your devfile
    registry, go to the root of your repository and create an
    `extraDevfileEntries.yaml` file.

6. Add your devfile stacks to your `stacks/` directory.

7. Verify every devfile stack contains at least one `devfile.yaml`
    file. Add other required files to the stacks. These files can
    include VSX plug-ins, Dockerfiles, or Kubernetes manifests.

The registry build tool automatically validates your customized
registry.

### Additional resources

- Example of
  [extraDevfileEntries.yaml](https://github.com/devfile/registry/blob/main/extraDevfileEntries.yaml).

- To create devfile stacks, see [creating a devfile stack](./creating-a-devfile-stack).

## Building a custom devfile registry

Make your repository into a devfile registry by building a
`devfile index` container image. Deploy the `devfile index` image to
your cloud or cluster to form the devfile registry.

### Prerequisites

- Golang 1.13.x or higher

- Docker 17.05 or higher

- Git

### Procedure

1. Run `./build_image.sh <path-to-devfile-registry-folder>` to build a
    devfile registry repository.

2. In a multi-stage Docker build, add a Dockerfile to your devfile
    registry repository. Make sure the Dockerfile contains the
    following:

    ```docker {% filename="Dockerfile" %}
    FROM quay.io/openshift-pipeline/golang:1.15-alpine AS builder
    # Install dependencies
    RUN apk add --no-cache git bash
    COPY . /registry
    # Download the registry build tools
    RUN git clone https://github.com/devfile/registry-support.git /registry-support
    # Run the registry build tools
    RUN /registry-support/build-tools/build.sh /registry /build
    FROM quay.io/devfile/devfile-index-base:next
    COPY --from=builder /build/index.json /index.json
    COPY --from=builder /build/stacks /stacks
    ```

3. Run `docker build -t devfile-index` to build the devfile registry
    into a container image.

The build script builds the index generator, generates the `index.json`
file from the specified devfile registry, and builds the stacks and
`index.json` into a devfile index container image. The registry build
process takes the contents of your devfile registry Git repository and:

1. Packages the content of each devfile stack based on the supported
    media types for the devfile registry.

2. Validates the content of the devfile registry repository based on
    the expected registry structure.

3. Generates `index.json` from the stacks in the repository and from
    any extra stacks or samples mentioned in the
    `extraDevfileEntries.yaml` file.

4. Builds a devfile index container image with the devfile stack
    contents and `index.json`.

### Additional resources

- For examples on how to add Dockerfiles to your devfile registry, see
  the [devfile/registry repository’s
  Dockerfile](https://github.com/devfile/registry/blob/master/.ci/Dockerfile).

- To run the registry build outside a container build, see the
  [devfile registry build
  tools](https://github.com/devfile/registry-support/tree/master/build-tools).

## Tagging and pushing a registry container image

Use the devfile index container image to create a container in which you
build, run, and deploy your application.

### Procedure

1. Choose a container registry.

2. Consult the documentation for your container registry and log in to
    the registry with the Docker CLI.

3. Push the devfile index container image to your chosen container
    registry:

    ```shell-session
    $ docker tag -f devfile-index __<registry-hostname>__/__<registry-username>__/devfile-index:latest
    $ docker push __<registry-hostname>__/__<registry-username>__/devfile-index:latest
    ```

4. If your container does not build properly, consult the documentation
    for your container registry.

### Additional resources

- For information on deploying the devfile index container image, see
  [Deploying a devfile registry](./deploying-a-devfile-registry).
