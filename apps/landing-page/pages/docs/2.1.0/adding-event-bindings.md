This section describes how to add an event to a v2.x devfile. An event
can have three different type of objects:

1.  preStartObject

2.  postStartObject

3.  preStopObject

**preStartObject**

You can execute preStart events as init containers for the project pod
in the order you specify the preStart events. The devfile `commandLine`
and `workingDir` are the commands for the init container. As a result,
the init container overwrites either the devfile or the container image
`command` and `args`. If you use a composite command with
`parallel: true`, the composite command executes as Kubernetes init
containers.

**postStartObject**

When you create the Kubernetes deployment for the `odo` component,
execute the postStart events.

**preStopObject**

Before you delete the Kubernetes deployment for the `odo` component,
execute the preStop events.

See the following list for event properties in a devfile:

<table>
<caption>envObject</caption>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Key</p></td>
<td style="text-align: left;"><p>Type</p></td>
<td style="text-align: left;"><p>Required</p></td>
<td style="text-align: left;"><p>Description</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>name</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The name of the environment
variable.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>value</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The value of the environment
variable.</p></td>
</tr>
</tbody>
</table>

envObject

1.  Add an `events` section in the devfile, containing a list of
    `preStart` and `postStart` commands.

    # v2.0

```yaml
commands:
  - id: init-project
    apply:
      component: tools
  - id: copy-artifacts
    exec:
      component: tools
      commandLine: 'cp files'
      workingDir: $PROJECTS_ROOT
  - id: init-cache
    exec:
      component: tools
      commandLine: 'init cache'
      workingDir: /.m2
  - id: pre-compile-cmd
    composite:
      commands:
        - copy-artifacts
        - init-cache
events:
  preStart:
    - init-project
  postStart:
    - pre-compile-cmd
```

**Additional resources**

For more information on adding event bindings, see: [lifecycle bindings
to bind commands](https://github.com/devfile/api/issues/32).
