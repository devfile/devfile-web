---
title: Adding components
description: Adding components
---

Each component in a single devfile must have a unique name.

## Prerequisites

- {% docs-link section="Quick start" title="Versions" /%}

- {% docs-link section="Quick start" title="Metadata" /%}

## Procedure

1. Add a `components` section in the devfile, containing a list of one
    or more components.
2. For each component, define an unique value for the mandatory `name`
    attribute.

3. For each component, define a mandatory type of one of the following
    types: `plugin`, `kubernetes` or `container`.

4. {% docs-link section="Components" title="Adding plugin component" /%}

5. {% docs-link section="Components" title="Adding kubernetes component" /%}

6. {% docs-link section="Components" title="Adding container component" /%}

7. {% docs-link section="Components" title="Specifying persistent storage" /%}

8. {% docs-link section="Components" title="Limiting resources usage" /%}

9. {% docs-link section="Components" title="Defining environment variables" /%}

10. {% docs-link section="Components" title="Defining endpoints" /%}

11. {% docs-link section="Components" title="Defining kubernetes resources" /%}

## Additional resources

- {% docs-link section="API reference" title="Devfile schema" /%}

- {% docs-link section="General" title="Devfile samples" /%}
