This section describes how to add one or more projects to a devfile.
Each starter project can contain either a `git` or `zip` object. See the
following tables for project properties in a devfile:

<table>
<caption>starterProject object</caption>
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
<td style="text-align: left;"><p>The name of your devfile.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>description</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The description of your
starterProject.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>clonePath</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The path relative to the root of your
projects. Clone your projects into this path.</p></td>
</tr>
</tbody>
</table>

starterProject object

<table>
<caption>git object</caption>
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
<td style="text-align: left;"><p>checkoutFrom</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The location of your git
repository.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>remotes</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>yes</p></td>
<td style="text-align: left;"><p>The branch that you use.</p></td>
</tr>
</tbody>
</table>

git object

<table>
<caption>zip object</caption>
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
<td style="text-align: left;"><p>location</p></td>
<td style="text-align: left;"><p>string</p></td>
<td style="text-align: left;"><p>no</p></td>
<td style="text-align: left;"><p>The location of your zip.</p></td>
</tr>
</tbody>
</table>

zip object

- [???](/docs/2.1.0/adding-schema-version-to-a-devfile.adoc)

- [???](/docs/2.1.0/adding-a-name-to-a-devfile.adoc)

1. Add a `projects` section in the devfile, containing a list of one or
    more projects.

\+ .A minimal devfile with one single project

```yaml
schemaVersion: 2.2.0
metadata:
  name: petclinic-dev-environment
  version: 1.0.0
projects:
  - name: petclinic
    git:
      remotes:
        origin: 'https://github.com/spring-projects/spring-petclinic.git'
      checkoutFrom:
        revision: main
```

\+ .A devfile with multiple projects

```yaml
schemaVersion: 2.2.0
metadata:
  name: example-devfile
  version: 1.0.0
projects:
  - name: frontend
    git:
      remotes:
        origin: 'https://github.com/acmecorp/frontend.git'
  - name: backend
    git:
      remotes:
        origin: 'https://github.com/acmecorp/backend.git'
```

1. For each project, define an unique value for the mandatory `name`
    attribute.

2. For each project, define a mandatory source of either the `git` or
    `zip` type.

    `git`  
    Projects with sources in Git. `checkoutFrom` refers to the branch
    being used.

```yaml
projects:
  - name: my-project1
    git:
      remotes:
        origin: 'https://github.com/my-org/project1.git'
      checkoutFrom:
        revision: main
```

    `zip`
    Projects with sources in a ZIP archive. `location` refers to the URL
    of a ZIP file.

```yaml
source:
  zip:
    location: http://host.net/path/project-src.zip
```

3. For each project, define the optional `clonePath` attribute to
    specify the path into which the project is to be cloned. The path
    must be relative to the `/projects/` directory, and it cannot leave
    the `/projects/` directory. The default value is the project name.

```yaml
schemaVersion: 2.2.0
metadata:
  name: my-project-dev
  version: 2.0.0
projects:
  - name: my-project-resource
    clonePath: resources/my-project
    zip:
      location: http://host.net/path/project-res.zip
  - name: my-project2
      git:
        remotes:
          origin: "https://github.com/my-org/project2.git"
        checkoutFrom:
          revision: develop
```

4. For each project, define the optional `sparseCheckoutDir` attribute
    to populate the project sparsely with selected directories.

    - Set the project to `/my-module/` to create only the root
      `my-module` directory along with its content.

    - Omit the leading slash (`my-module/`) to create all `my-module`
      directories that exist in the project. Including, for example,
      `/addons/my-module/`.

      - Add a trailing slash to create only directories with the
        given name (and its content).

    - Use wildcards to specify more than one directory name. For
      example, setting `module-*` checks out all directories of the
      given project that start with `module-`.

    For more information, see [Sparse checkout in Git
    documentation](https://git-scm.com/docs/git-read-tree#_sparse_checkout).

- [???](/docs/2.1.0/api-reference.adoc)

- [???](/docs/2.1.0/devfile-resources.adoc)
