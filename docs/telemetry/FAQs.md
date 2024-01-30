# FAQs - Frequently asked questions

## Are metrics being stored? 
As of early February 2024, the backend service account with Countly that was used for collecting data from ignite-metrics has been deactivated.  Data is still being POSTed, but our previous 3rd-party vendor, Countly, is dropping it.  We have a backlog item in [issue #133](https://github.com/ipfs-shipyard/ignite-metrics/issues/133) to move to an alternative service, Plausible.

One could still use this library as is and pass in an API key with their own Countly account, but the APIs keys for the apps/sites listed in [issue #133](https://github.com/ipfs-shipyard/ignite-metrics/issues/133) have been disabled.

## Why are you collecting metrics?

We are collecting metrics for all of our projects to assist with prioritizing work and provide proof that our work is valuable. Our prior state (<2023) had the following issues:

1. Opt-in only metrics for webui and desktop did not send metrics data to our countly server
    1. We have no insight into the total number of users in our applications
    2. We had no insight into the percentage of users who declined or accepted metrics
    3. If a user did not accept or decline metrics, usage was not collected
2. Lack of singular metrics collection library
    1. Consent and telemetry patterns were non-existent
    2. Privacy policy and metrics collection would have needed to be implemented for each library separately.
    3. Analytics across projects does not allow for normalized comparisons of usage.
3. Missing telemetry
    1. We have no insight into the usage of a majority of our projects
        1. It is understood (not confirmed with data) that two of our top three projects are ipfs-webui & ipfs-desktop, and they had ****some**** telemetry in place.
    2. We have three separate usecases for ipfs-webui, and are only tracking two of them:
        1. [webui.ipfs.io](http://webui.ipfs.io) & local - tracked
        2. webui usage within ipfs-desktop - tracked as desktop usage
        3. webui bundled with kubo - not tracked

You can find more information about the discussions held when making these decisions at https://pl-strflt.notion.site/Telemetry-b005d4f217f44db3986902c67d922cf4

## What data is collected?

In order to standardize the documentation of metrics collection, we will keep a file in each project's repository that
specifies all metrics data collected by that project. The file will be located at `./docs/telemetry/COLLECTED_DATA.md`. These documents will provide answers to the following bullet-points:

* This is what will be collected
* This is what won't be collected
* Why we are collecting each piece of metric data.

You can read our [Privacy Policy](./PRIVACY_POLICY.md) and [Collection Policy](./COLLECTION_POLICY.md) for more generic details.

## As an existing user, how am I notified about changes to the data that is collected?

You can follow updates to the metrics we collect for each repo in that repo's release notes. You can find changes to our collection policy in our [Collection Policy](./COLLECTION_POLICY.md) document. The document at `./docs/telemetry/COLLECTED_DATA.md` in each relevant repo will be updated when any metrics collection changes are made.

## How do I opt-out of metrics?

For apps with settings pages, such as ipfs-webui, ipfs-desktop, and ipfs-companion, you can opt out in each of the applications' setting pages. For apps without settings pages (or single page applications where settings pages don't make sense), we will be following the [patterns set by the public-gateway-checker project](https://github.com/ipfs/public-gateway-checker/issues/340#issuecomment-1371410214).

The basic implementation is a floating icon on the bottom left of the page that displays a modal when clicked. The displayed modal allows the enabling/disabling of metrics collection for our different groupings.

For public-gateway-checker changes, see the following PRs and issues:

* https://github.com/ipfs/public-gateway-checker/pull/309
* https://github.com/ipfs/public-gateway-checker/issues/340
* https://github.com/ipfs/public-gateway-checker/issues/341
* https://github.com/ipfs/public-gateway-checker/issues/342

## Can I turn telemetry completely off?

Yes. If you toggle all telemetry groups off (i.e. opt-out), no telemetry will be collected. The one caveat is that we send a single request when you opt-out of metrics collection.


## I want to help development efforts, but want to be updated of any future changes. How do I stay up to date?

There are a few ways you can stay up to date depending on what you're interested in.

### Global telemetry changes

Watch for changes to https://github.com/ipfs-shipyard/ignite-metrics via GitHub's watch feature. You can adjust notification preferences using GitHub's watch feature. Updates can be found in the following locations:

1. PRs
2. Release notes
3. `./docs/telemetry/COLLECTED_DATA.template.md`


### Project specific telemetry changes

Watch for changes to https://github.com/<repo-of-interest> via GitHub's watch feature. You can adjust notification preferences using GitHub's watch feature. Updates can be found in the following locations:

1. PRs
2. Release notes
3. `./docs/telemetry/COLLECTED_DATA.md`
