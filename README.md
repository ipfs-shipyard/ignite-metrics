# @ipfs-shipyard/ignite-metrics <!-- omit in toc -->

[![codecov](https://img.shields.io/codecov/c/github/ipfs-shipyard/ignite-metrics.svg?style=flat-square)](https://codecov.io/gh/ipfs-shipyard/ignite-metrics)
[![CI](https://img.shields.io/github/workflow/status/ipfs-shipyard/ignite-metrics/test%20&%20maybe%20release/main?style=flat-square)](https://github.com/ipfs-shipyard/ignite-metrics/actions/workflows/js-test-and-release.yml)

> UI library for gathering metrics for ignite team projects

# ❗️ Attention: metrics are not being stored ❗️ <!-- omit in toc -->
As of 2024-02-18, the backend service account with Countly that was used for collecting data from ignite-metrics has been deactivated.  Data is still being POSTed, but our previous 3rd-party vendor, Countly, is dropping it.  We have a backlog item in [issue #133](https://github.com/ipfs-shipyard/ignite-metrics/issues/133) to move to an alternative service, Plausible.

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Documentation](#documentation)
- [Lead Maintainer](#lead-maintainer)
- [Contributing](#contributing)
- [License](#license)
- [Contribute](#contribute)

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

[Russell Dempsey](https://github.com/SgtPooki)

## Team

[IPFS-Ignite(ipfs-gui) team in ipfs-shipyard](https://github.com/orgs/ipfs-shipyard/teams/ipfs-gui)
[IPFS-Ignite(ipfs-gui) team in ipfs](https://github.com/orgs/ipfs/teams/gui-dev)

## Contributing

Contributions are welcome! This repository is part of the IPFS project and therefore governed by our [contributing guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md).

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
