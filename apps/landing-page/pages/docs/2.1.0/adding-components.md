Each component in a single devfile must have a unique name and use one
of the objects: `container`, `kubernetes`, `openshift`, or `volume`. See
the following tables for component properties in a devfile:

<table>
<caption>Component object</caption>
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
<td style="text-align: left;"><p><code>container</code></p></td>
<td style="text-align: left;"><p><code>componentObject</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The list of containers.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>kubernetes</code></p></td>
<td style="text-align: left;"><p><code>componentObject</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The Kubernetes cluster.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>openshift</code></p></td>
<td style="text-align: left;"><p><code>componentObject</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The OpenShift container.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>volume</code></p></td>
<td style="text-align: left;"><p><code>componentObject</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The list of volume components.</p></td>
</tr>
</tbody>
</table>

Component object

<table>
<caption>container object</caption>
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
<td style="text-align: left;"><p><code>name</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The name of your container.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>image</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The image version.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>memoryLimit</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The memory limit that you use with your
container.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>mountSources</code></p></td>
<td style="text-align: left;"><p><code>boolean</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>Choose to mount the source or
not.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>sourceMapping</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The path in the container where you
transfer and mount the project sources. This path is available in the
container through the environment, <code>PROJECTS_ROOT</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>endpoints</code></p></td>
<td style="text-align: left;"><p><code>endpointObject</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The list of endpoints to use.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>volumeMounts</code></p></td>
<td
style="text-align: left;"><p><code>volumeMountsObject</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The list of volumes to mount.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>environment</code></p></td>
<td style="text-align: left;"><p><code>envObject</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The list of environment variables to
use.</p></td>
</tr>
</tbody>
</table>

container object

<table>
<caption>endpoint object</caption>
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
<td style="text-align: left;"><p><code>name</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The name of your endpoint.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>targetPort</code></p></td>
<td style="text-align: left;"><p><code>integer</code></p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The port number that you
target.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>exposure</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>Use the following attributes to
describe how to expose the endpoints on the network:
<code>public</code>, <code>internal</code>, <code>none</code>. If not
specified, the default attribute is <code>public</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>path</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The path to the endpoint URL.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>protocol</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>Use the following attributes to
describe the application and transport protocols of the traffic that
goes through the endpoint: <code>http</code>, <code>https</code>,
<code>ws</code>, <code>wss</code>, <code>tcp</code>, <code>udp</code>.
If not specified, the default attribute is <code>http</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>secure</code></p></td>
<td style="text-align: left;"><p><code>boolean</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>Choose whether to define the endpoint
as secure.</p></td>
</tr>
</tbody>
</table>

endpoint object

<table>
<caption>volumeMount object</caption>
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
<td style="text-align: left;"><p><code>name</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The name of the volume components that
you use.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>path</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The path in the component container
where you mount the volume.</p></td>
</tr>
</tbody>
</table>

volumeMount object

<table>
<caption>volume object</caption>
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
<td style="text-align: left;"><p><code>name</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The name of the volume
component.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>size</code></p></td>
<td style="text-align: left;"><p><code>string</code></p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The size of the storage you
create.</p></td>
</tr>
</tbody>
</table>

volume object

-   [???](#adding-schema-version-to-a-devfile.adoc)

-   [???](#adding-a-name-to-a-devfile.adoc)

1.  Add a `components` section in the devfile, containing a list of one
    or more components.

2.  For each component, define a unique value for the mandatory `name`
    attribute.

3.  For each component, define one of the following types for the
    mandatory `type` attribute: `kubernetes`, `container`, `openshift`,
    or `volume`.

4.  [???](#adding-a-kubernetes-or-openshift-component-to-a-devfile.adoc)

5.  [???](#adding-a-container-component-to-a-devfile.adoc)

6.  [???](#adding-a-volume-component-to-a-devfile.adoc)

7.  [???](#adding-a-image-component-to-a-devfile.adoc)

8.  [???](#specifying-persistent-storage.adoc)

9.  [???](#limiting-resources-usage.adoc)

10. [???](#defining-environment-variables.adoc)

11. [???](#defining-endpoints.adoc)

12. [???](#defining-kubernetes-resources.adoc)

-   [???](#api-reference.adoc)

-   [???](#devfile-resources.adoc)
