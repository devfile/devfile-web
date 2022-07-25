Use a `container` component to specify the volumes to be mounted on
specific locations within the container. Volumes mounted in a container
require a volume component with the same name. Volume components can be
shared across container components. Sharing a volume across container
components allows users to share files among these container components.

1.  Specify volumes for `container` type:

```yaml
schemaVersion: 2.2.0
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
