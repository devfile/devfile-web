# Contributing

Thank you for your interest in contributing to the Devfile Web! We welcome your additions to this project.

## Code of Conduct

Before contributing to this repository for the first time, please review our project's [Code of Conduct](https://github.com/devfile/api/blob/main/CODE_OF_CONDUCT.md).

## Certificate of Origin

By contributing to this project you agree to the Developer Certificate of
Origin (DCO). This document was created by the Linux Kernel community and is a
simple statement that you, as a contributor, have the legal right to make the
contribution. See the [DCO](DCO) file for details.

In order to show your agreement with the DCO you should include at the end of the commit message,
the following line:

```console
Signed-off-by: Firstname Lastname <email@email.com>
```

Once you set your user.name and user.email in your git config, you can sign your commit automatically with `git commit -s`.

## How to Contribute:

### Issues

- If you spot a problem with the **landing page**, [search if an issue already exists](https://github.com/devfile/api/issues?q=is%3Aissue+is%3Aopen+label%3Aarea%2Flanding-page).

- If you spot a problem with the **registry viewer**, [search if an issue already exists](https://github.com/devfile/api/issues?q=is%3Aissue+is%3Aopen+label%3Aarea%2Fregistry-viewer).

If a related issue doesn't exist, you can open a new issue using the [issue form](https://github.com/devfile/api/issues/new/choose). You can tag `landing page` related issues with the `/area landing-page` and `registry viewer` with the `area/registry-viewer` text in your issue.

### Submitting Pull Request

When you think the code is ready for review, create a pull request and link the issue associated with it.

Owners of the repository will watch out for new PRs and provide reviews to them.

If comments have been given in a review, they have to be addressed before merging.

After addressing review comments, don't forget to add a comment in the PR with the reviewer mentioned afterward, so they get notified by Github to provide a re-review.

## Troubleshooting

- There is a known issue with Apple Silicon (arm64) architectures that may cause the `build_viewer.sh` script to fail. If this issue occurs first run `export PLATFORM_EV=linux/arm64`.

# Contact us

If you have any questions, please visit us the `#devfile` channel under the [Kubernetes Slack](https://slack.k8s.io) workspace.