---
title: Commands
description: Commands
---

The following tables describe command properties that you can include in
a devfile:

#### commandObject

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `exec`
- `execObject`
- no
- The exec command to run.
---
- `composite`
- `compositeObject`
- no
- The composite command to run.
{% /table %}

#### execObject

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `id`
- `string`
- yes
- The ID of the command.
---
- `commandLine`
- `string`
- yes
- The command to run.
---
- `component`
- `string`
- no
- The component to which the action relates.
---
- `label`
- `string`
- no
- The optional label to describe the command.
---
- `workingDir`
- `string`
- no
- The working directory where you run the command.
---
- `group`
- `groupObject`
- no
- The group to which the command belongs.
---
- `environment`
- `envObject`
- no
- The list of environment variables you use.
{% /table %}

#### compositeObject

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `id`
- `string`
- yes
- The ID of the command.
---
- `commands`
- `string`
- no
- The exec commands that constitute the composite command that chains multiple commands together.
---
- `parallel`
- `boolean`
- no
- The flag that indicates if commands are run in parallel.
---
- `label`
- `string`
- no
- The optional label to describe the command.
---
- `group`
- `groupObject`
- no
- The group to which the composite command belongs. The composite command cannot be of the `run` kind.
{% /table %}

#### groupObject

{% table %}
- Key {% width="25%" %}
- Type {% width="25%" %}
- Required {% width="25%" %}
- Description {% width="25%" %}
---
- `kind`
- `string`
- yes
- The group to which the command belongs, such as: `build`, `run`, `test`, and `debug`.
---
- `isDefault`
- boolean
- no
- Identifies whether it is the default command to run. Only one default command can be defined for each group.
{% /table %}
