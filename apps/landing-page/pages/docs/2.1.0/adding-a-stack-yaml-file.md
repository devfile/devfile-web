To include multiple stack versions in a particular stack, place the
`stack.yaml` file under the root of the stack folder.

<table>
<caption>stack.yaml schema</caption>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Name</p></td>
<td style="text-align: left;"><p>Type</p></td>
<td style="text-align: left;"><p>Description</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>name</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The stack name.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>displayName</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The display name of a stack.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>description</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The description of a stack.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>versions</code></p></td>
<td style="text-align: left;"><p><code>version[]</code></p></td>
<td style="text-align: left;"><p>The information of each stack
version.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>icon</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>A stack icon.</p></td>
</tr>
</tbody>
</table>

stack.yaml schema

<table>
<caption>version spec</caption>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Name</p></td>
<td style="text-align: left;"><p>Type</p></td>
<td style="text-align: left;"><p>Description</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>version</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>The stack version.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>default</code></p></td>
<td style="text-align: left;"><p><code>boolean</code></p></td>
<td style="text-align: left;"><p>The default stack version.</p></td>
</tr>
</tbody>
</table>

version spec

```yaml
name: go
description: Stack with the latest Go version
displayName: Go Runtime
icon: https://raw.githubusercontent.com/devfile-samples/devfile-stack-icons/main/golang.svg
versions:
  - version: 1.1.0
    default: true #should have one and only one default version
  - version: 1.2.0
```
