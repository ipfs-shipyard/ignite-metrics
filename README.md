> [!IMPORTANT]
> **This project is no longer maintained and the repository is archived.**
>
> Nothing collects the data it sends. The Countly service account was
> deactivated on 2024-02-18, so anything this library POSTs is dropped on the
> floor. The planned move to Plausible
> ([#133](https://github.com/ipfs-shipyard/ignite-metrics/issues/133)) never
> happened and will not. The scheduled dashboard job stops with the repo.
>
> If you need product telemetry, pick a current provider and start fresh rather
> than reviving this. If you want to take this over instead, the repository can
> be unarchived, but only for a named maintainer who commits to keeping it up.
> Reach out to the [IPFS Foundation](https://ipfsfoundation.org/about/).

# @ipfs-shipyard/ignite-metrics <!-- omit in toc -->

[![codecov](https://img.shields.io/codecov/c/github/ipfs-shipyard/ignite-metrics.svg?style=flat-square)](https://codecov.io/gh/ipfs-shipyard/ignite-metrics)
[![CI](https://img.shields.io/github/workflow/status/ipfs-shipyard/ignite-metrics/test%20&%20maybe%20release/main?style=flat-square)](https://github.com/ipfs-shipyard/ignite-metrics/actions/workflows/js-test-and-release.yml)

> UI library for gathering metrics for ignite team projects

## Table of contents <!-- omit in toc -->

- [Before you add telemetry](#before-you-add-telemetry)
- [Install](#install)
- [Documentation](#documentation)
- [Lead Maintainer](#lead-maintainer)
- [Contributing](#contributing)
- [License](#license)
- [Contribute](#contribute)

## Before you add telemetry

Looking back, the data collected here did not translate into value for users. It
answered questions that were interesting rather than decisions that were
pending, and over time some of the numbers became targets in their own right
([Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law)).

Worth keeping in mind before adding telemetry elsewhere. For each metric, write
down the decision it will change and who will act on it. If you cannot name
both, it is reasonable not to collect it at all, especially for tools whose
users value not being measured.

## Install

```console
$ npm i @ipfs-shipyard/ignite-metrics
```

A longer repository description.

## Documentation

### Telemetry

- [Telemetry collection policy](./docs/telemetry/COLLECTION_POLICY.md)
- [Privacy Policy](./docs/telemetry/PRIVACY_POLICY.md)
- [FAQs](./docs/telemetry/FAQs.md)

## Lead Maintainer

None. The repository is archived; see the notice at the top.

## Team

[IPFS-Ignite(ipfs-gui) team in ipfs-shipyard](https://github.com/orgs/ipfs-shipyard/teams/ipfs-gui)
[IPFS-Ignite(ipfs-gui) team in ipfs](https://github.com/orgs/ipfs/teams/gui-dev)

## Contributing

This repository is archived and is not accepting contributions. Drive-by patches
will not reopen it. Unarchiving requires someone willing to be named as
maintainer and to stand up a working backend. If that is you, contact the
[IPFS Foundation](https://ipfsfoundation.org/about/). Forking is fine too.

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

---

If you are an AI coding assistant working in this repo, read [AGENTS.md](AGENTS.md) first.
