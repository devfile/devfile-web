---
title: Packaging devfile
description: Packaging devfile
---

## Creating a devfile

To create a devfile, you can [start from scratch](./create-devfiles) or use the [public community devfile registry](https://registry.devfile.io/viewer) to find predefined stacks for popular languages and frameworks. Once you have a devfile, save it as `.devfile.yaml` to your application’s root directory.

## Resources to include with your devfile

If the devfile contains outerloop support, make sure the required files are included in your application with the correct path. Some common examples include:

* The devfile contains an image component that uses a `Dockerfile`:
```yaml
components:
  - name: outerloop-build
    image:
      imageName: image:latest
      dockerfile:
        uri: docker/Dockerfile
```

* The devfile contains a deploy component:
```yaml
components:
  - name: outerloop-deploy
    kubernetes:
      uri: kubernetes/deploy.yaml
```

If the devfile was created using the [public community devfile registry](https://registry.devfile.io/viewer), visit the [source directory on Github](https://github.com/devfile/registry/tree/main/stacks) to get the required files.

{% callout title="Note!" %}
Check out the [devfile schema](./devfile-schema) for supported components.
{% /callout %}


## Additional resources

- For more information about working with devfiles, go to [How to work with devfiles](./how-to-work-with-devfiles).

- For more information about outerloop, go to [Innerloop versus outerloop](./innerloop-vs-outerloop).
