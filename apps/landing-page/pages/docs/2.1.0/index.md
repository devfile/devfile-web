**What a devfile does for you**

You can use devfiles to automate and simplify your development process.
With devfiles, you record the instructions for configuring and running
your build environment as a YAML-formatted text file. Then, optionally,
you can distribute those devfiles to other build tools and IDEs that
support devfiles. Finally, to automatically configure and build a
running application from a development project, you run the devfile
instructions. You can also use devfiles to provide consistent build
processes across different languages and tools.

Using the recommended best practices from the devfile, the tools and IDE
can:

- Take in the repository hosting your application source code.

- Build your code.

- Run your application on your local container.

- Deploy your application to cloud-native containers.

**Benefits of devfiles**

With devfiles, you can make workspaces composed of multiple containers.
In these containers, you can create any number of identical workspaces
from the same devfile. If you create multiple workspaces, you can share
your devfile with different teams. By sharing a single devfile across
multiple teams, you can ensure that each team has the same user
experience and build, run, deploy behaviors.

Devfiles include the following features:

- Guidance for using runtime images

- Example code

- Build and CI commands

- Deployment options

Devfiles have the following benefits:

- Reduce the gap between development and deployment

- Find available devfile stacks or samples in a devfile registry

- Produce consistent build and run behaviors

**Roles that use devfiles**

Stack providers use devfiles to develop their runtime stacks once and
then use them across different tools. Therefore, with devfiles, you do
not need to build and maintain custom development tools.

Tool providers use devfiles to build runtime support for each runtime.
The devfile runtime teams create the devfiles for building and running
applications on their servers, giving you more time to work on your
tools.

With devfiles, developers do not need to set up the environment for
building and running their applications. Instead, you have the
flexibility to use different tools, like Che and `odo`.

- To access the devfile stacks so you can begin creating container
    workspaces, see [devfile registry
    stacks](https://github.com/devfile/registry/tree/main/stacks).

- To write a devfile stack so you can begin using devfiles in your
    application development, see [???](/docs/2.1.0/authoring-devfiles.adoc).

- To migrate an existing devfile to the most updated version, see
    [???](/docs/2.1.0/migrating-to-devfile-v2.adoc).

- To understand the schema attributes of devfiles, see
    [???](/docs/2.1.0/api-reference.adoc).

**Additional resources**

To ask questions, view open issues, raise concerns, or communicate
directly with the devfile team, see the [devfile GitHub
repository](https://github.com/devfile/api).
