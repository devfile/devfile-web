The following tables describe command properties that you can include in
a devfile:

<table>
<caption>commandObject</caption>
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
<td style="text-align: left;"><p>exec</p></td>
<td style="text-align: left;"><p>execObject</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The exec command to run.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>composite</p></td>
<td style="text-align: left;"><p>compositeObject</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The composite command to run.</p></td>
</tr>
</tbody>
</table>

commandObject

<table>
<caption>execObject</caption>
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
<td style="text-align: left;"><p>id</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The ID of the command.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>commandLine</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The command to run.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>component</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The component to which the action
relates.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>label</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The optional label to describe the
command.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>workingDir</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The working directory where you run the
command.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>group</p></td>
<td style="text-align: left;"><p>groupObject</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The group to which the command
belongs.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>environment</p></td>
<td style="text-align: left;"><p>envObject</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The list of environment variables you
use.</p></td>
</tr>
</tbody>
</table>

execObject

<table>
<caption>compositeObject</caption>
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
<td style="text-align: left;"><p>id</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The ID of the command.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>commands</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The exec commands that constitute the
composite command that chains multiple commands together.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>parallel</p></td>
<td style="text-align: left;"><p>boolean</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The flag that indicates if commands are
run in parallel.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>label</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The optional label to describe the
command.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>group</p></td>
<td style="text-align: left;"><p>groupObject</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The group to which the composite
command belongs. The composite command cannot be of the <code>run</code>
kind.</p></td>
</tr>
</tbody>
</table>

compositeObject

<table>
<caption>groupObject</caption>
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
<td style="text-align: left;"><p>kind</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The group to which the command belongs,
such as: <code>build</code>, <code>run</code>, <code>test</code>, and
<code>debug</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>isDefault</p></td>
<td style="text-align: left;"><p>boolean</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>Identifies whether it is the default
command to run. Only one default command can be defined for each
group.</p></td>
</tr>
</tbody>
</table>

groupObject
