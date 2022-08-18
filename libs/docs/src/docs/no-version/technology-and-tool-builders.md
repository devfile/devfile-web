---
title: Technology and tool builders
description: Technology and tool builders
---

## Shielded from runtime specific implementation

No need to build custom runtime support. Let the expert do the job. Runtime teams know the best way to build and run applications on their servers.

## Zero maintenance for runtime support

Tools will get the runtime support update for free whenever a new stack gets updated in the devfile registry. New stacks can be picked up by the tools easily without tools update.

## Shared configuration that can be reused across different tools

Different tools work in a slightly different way. Sometimes it is hard to convince users to switch to your tool due to configuration differences. Sharing the same devfile specification support reduces the hurdle for users to make that change.

## Additional resources

- [API reference](./devfile-schema)

- [Devfile library for reading and writing to devfile](https://github.com/devfile/library)

- [Community registry viewer](https://registry.devfile.io/viewer)

Devfile registry library for interacting with the devfile registry, e.g. finding the list of devfiles available, metadata associated with each devfile, and downloading content of the stacks.

- [Go Library](https://github.com/devfile/registry-support/tree/main/registry-library)

- [REST API](https://github.com/devfile/registry-support/blob/main/index/server/registry-REST-API.adoc)
