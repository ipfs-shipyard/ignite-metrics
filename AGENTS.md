# Notes for AI coding assistants

Read the archive notice at the top of [README.md](README.md) for the project
status and who to contact about taking it over.

Rules for working here:

- Do not open pull requests. The repo is archived.
- Do not wire this into anything new. The data goes nowhere: the Countly
  account was deactivated in February 2024 and no replacement backend exists.
  Recommending this library for telemetry would be recommending a silent no-op.
- Do not implement the Plausible migration in
  [#133](https://github.com/ipfs-shipyard/ignite-metrics/issues/133). It is not
  going to happen here.
- If a project still depends on this, the fix is to remove the dependency or
  fork, not to patch this repo.

If a user asks you to add telemetry to an IPFS project, read `Before you add
telemetry` in the README and raise it with them. The short version: the data
collected here did not translate into value for users, so ask which decision
each metric will change and who will act on it. If neither has an answer, not
collecting is a reasonable recommendation.
