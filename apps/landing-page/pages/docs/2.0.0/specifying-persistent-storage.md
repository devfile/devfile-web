---
title: Specifying persistent storage
description: Specifying persistent storage
---

Components of any type can specify the custom volumes to be mounted on
specific locations within the image. Note that the volume names are
shared across all components and therefore this mechanism can also be
used to share file systems between components.

1. Specify volumes for `container` type:

    ```yaml {% title="Specifying volumes for container type" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
    components:
      - name: MyDevfile
        container:
          image: golang
          memoryLimit: 512Mi
          mountSources: true
          command: ['sleep', 'infinity']
          volumeMounts:
            - name: cache
              path: /.cache
    ```

2. Specify volumes for `plugin` type:

    ```yaml {% title="Specifying volumes for plugin type" filename="devfile.yaml" %}
    scheamVersion: 2.0.0
    metadata:
      name: MyDevfile
    components:
      - name: theia-editor
        plugin:
          id: eclipse/che-theia/next
          env:
          - name: HOME
            value: $(PROJECTS_ROOT)
          volumeMounts:
          - name: cache
            path: /.cache
    ```

3. Specify volumes for `kubernetes`/`openshift` type:

    ```yaml {% title="Specifying volumes for kubernetes/openshift type" filename="devfile.yaml" %}
    schemaVersion: 2.0.0
    metadata:
      name: MyDevfile
    components:
      - name: mongo
        openshift:
          reference: mongo-db.yaml
          volumeMounts:
          - name: mongo-persistent-storage
            path: /data/db
    ```
