# FAQs - Frequently asked questions

## Why are you collecting metrics?

We are collecting metrics for all of our projects to assist with prioritizing work and provide proof that our work is valuable. Our prior state had the following issues:

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

## What data is collected?

In order to standardize the documentation of metrics collection, we will keep a file in each project's repository that
specifies all metrics data collected by that project. The file will be located at `./docs/telemetry/CollectedData.md`. These documents will provide answers to the following bullet-points:

* This is what will be collected
* This is what won't be collected
* Why we are collecting each piece of metric data.

You can read our [Privacy Policy](./PrivacyPolicy.md) and [Collection Policy](./CollectionPolicy.md) for more generic details.

## As an existing user, how am I notified about changes to the data that is collected?

You can follow updates to the metrics we collect for each repo in that repo's release notes. You can find changes to our collection policy in our [Collection Policy](./CollectionPolicy.md) document. The document at `./docs/telemetry/CollectedData.md` in each relevant repo will be updated when any metrics collection changes are made.

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
