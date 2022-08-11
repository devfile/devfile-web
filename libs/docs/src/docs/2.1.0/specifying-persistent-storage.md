---
title: Specifying a persistent storage
description: Specifying a persistent storage
---

A `container` component can specify the volumes to be mounted on
specific locations within the image. If the `container` component mounts
the volume, then the volume needs a corresponding volume component of
the same name. Volume names are shared across all components. Shared
volume names can be used to share file systems among components.

1. Specify volumes for `container` type:

    ```yaml {% title="Specifying volumes for container type" filename="devfile.yaml" %}
    schemaVersion: 2.1.0
    metadata:
      name: mydevfile
    components:
      - name: mydevfile
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
          volumeMounts:
            - name: cache
              path: /.cache
      - name: cache
        volume:
          size: 2Gi
    ```
