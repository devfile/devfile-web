---
title: Integrate with editors
description: Integrate with editors
---

The [YAML Language Server](https://github.com/redhat-developer/yaml-language-server) provides validation, document outlining, auto-completion, hover support, and formatting for YAML files. To provide IntelliSense for devfiles, the YAML Language Server pulls all available schemas from the [JSON Schema Store](https://www.schemastore.org/json/). The devfile team maintains the devfile JSON Schema stored within the JSON Schema Store.

## Walk through

{% video src="https://www.youtube.com/embed/MaM2HFfqbgg" title="Develop devfiles on VSCode" /%}

## Download

### VSCode Plugin

If you are using [VSCode](https://code.visualstudio.com/), you can install the [YAML VSCode Plugin](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) from the Marketplace. The YAML VSCode Plugin is built and maintained by Red Hat.

### Other Editor Plugins

Other editor plugins can be found in the YAML Language Server [GitHub Repository](https://github.com/redhat-developer/yaml-language-server#clients).

## Access the latest version

Press `Ctrl + Shift + P` and type `Preferences: Open User Settings (JSON)`. This should open up your user settings. Inside the user settings add the following snippet.

```json {% filename="settings.json" %}
{
  ...
  "yaml.schemas": {
    "https://raw.githubusercontent.com/devfile/api/main/schemas/latest/devfile.json": "devfile.yaml"
  },
  ...
}

```
