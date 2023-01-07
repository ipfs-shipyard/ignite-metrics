# Telemetry collection policy

This document is the source of truth for our telemetry policies and practices across all Ignite team projects. The discussion held at https://github.com/ipfs/ipfs-gui/issues/125 is the origin and inspiration for this library and all documents under `./docs/telemetry`.

The initial list of projects we're adding telemetry to was originally discussed at https://github.com/ipfs/ipfs-gui/issues/105.

For an up to date list of projects we own that follow this policy, please see:

* https://github.com/ipfs/ipfs-gui#primary-projects
* https://github.com/ipfs/ipfs-gui#other-ipfs-gui--tools-owned-projects

## History

Before 2022Q4, telemetry was only implemented in https://github.com/ipfs/ipfs-webui and https://github.com/ipfs/ipfs-desktop, using our [self-hosted countly](https://count.ly/community-edition) server. The telemetry implemented within ipfs-webui and ipfs-desktop was opt-in only. i.e. metrics data was sent only if a user specifically opted-in to collecting metrics.

Our other projects did not do telemetry or any metrics data collection and did not mention telemetry or metrics at all. The only exception is https://github.com/ipfs/ipfs-companion where we have had a [privacy policy since 2019-02-15](https://github.com/ipfs/ipfs-companion/blob/main/PRIVACY-POLICY.md). The privacy policy in ipfs-companion indicates that no data is collected whatsoever, and that will be changing.

## Metrics collection expectations

It's important to clarify that our intention for telemetry with our projects is solely to prioritize our work efforts in bringing us all to the web3 mecca. This includes not violating our users expectations of privacy nor anonymity.

### Application data vs User data

Our telemetry is solely focused on the collection of application data, not user data.

#### What is Application data?

Application data only contains information about events, modules, performance, and use of our applications, not the users themselves.

#### What is User data?

User data can vary across industries and applications, but is generally data that is used to classify or categorize users, typically for targeting classes or categories of users via campaigns or other marketing methods for various purposes. Think demographics, emails, physical addresses, personal preferences, and marketing.

As a general rule, we do not collect user or personal data. See our [Privacy Policy](./PrivacyPolicy.md) for more details.

### Metric features and their groupings

The metric features in the first column name and their descriptions come directly from [countly's support website](https://support.count.ly/hc/en-us/articles/360037441932-Web-analytics-JavaScript-#features-for-consent).

| Metric feature name | Consent method | Metric feature group name | Metric feature description                                                     | What do we use this metric for?                                                          |
|:-------------------:|----------------|---------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| sessions            | Opt-out        | Minimal                   | tracks when, how often, and how long users use your website                    | For determining unique daily/weekly/monthly active users in order to prioritize projects |
| views               | Opt-out        | Minimal                   | allows for the views/pages accessed by a user to be tracked                    | For tracking application pages and component views only                    |
| events              | Opt-out        | Minimal                   | allows your events to be sent to the server                                    | Timed and one-off application events such as app_start, app_close, function_used, etc. |
| crashes             | Opt-in         | Performance               | allows JavaScript errors to be tracked                                         | Not used yet - Eventually for bug fixes and debugging |
| apm                 | Opt-in         | Performance               | allows performance tracking of application by recording traces                 | Not used yet - Eventually for bug fixes and debugging |
| scrolls             | Opt-in         | UX                        | allows a user’s scrolls to be tracked on the heatmap                           | Not used yet - Possibly for performance and UX optimizations |
| clicks              | Opt-in         | UX                        | allows a user’s clicks and link clicks to be tracked on the heatmap            | Not used yet - Possibly for performance and UX optimizations |
| forms               | Opt-in         | UX                        | allows a user’s form submissions to be tracked                                 | Not used yet - Possibly for bug fixes and debugging, performance and UX optimizations |
| star-rating         | Opt-in         | Feedback                  | allows user rating and feedback tracking through rating widgets                | Not used yet - Possibly for getting user feedback more directly through our applications |
| feedback            | Opt-in         | Feedback                  | allows survey, nps rating and feedback tracking through feedback widgets       | Not used yet - Possibly for getting user feedback more directly through our applications |
| location            | Opt-in         | Location                  | allows a user’s location (country, city area) to be recorded                   | N/A - we have no current need for collecting a user's location data. |
| attribution         | Opt-in         | N/A                       | allows the campaign from which a user came to be tracked                       | N/A - we do not have any plans to implement or utilize user campaigns |
| users               | Opt-in         | N/A                       | allows user information, including custom properties, to be collected/provided | N/A - we will not collect user information |

The code implementing these groupings can be found [here](./../../src/MetricsProvider.ts#L17-L30)

### What do the consent toggling UIs look like?

Consent toggling has two distinct views depending on the type of application implementing telemetry using this library: Projects without a settings page, and Projects with settings page(s).

#### Projects without its own settings page(s)

In this case, we would follow the patterns discussed in https://github.com/ipfs/public-gateway-checker/issues/340 and https://github.com/ipfs-shipyard/ignite-metrics/issues/36.

There will be a floating icon in the bottom left of the page: ![example telemetry settings modal toggle for projects withour a settings page](./images/telemetry-modal-toggle.png)

When clicked, that icon will expand into a modal that will allow you to enable/disable the collection of groups of features as defined above in the "Metric features and their groupings" section.

Single toggle Example: ![example modal containing a single consent toggle](./images/single-toggle-modal.png)

Multi toggle Example: ![example modal containing multiple consent toggles](./images/multi-toggle-modal.png)

#### Projects with its own settings page(s)

The consent should conform to the UX expectations of the library it's being implemented in.

##### IPFS-companion

It should look like the rest of the settings in the application.

Potential UI with multiple toggles: ![example telemetry multi-toggle UI for settings page in ipfs-companion](./images/settings-page-multi-toggle.png)

Example with single toggle (PR at https://github.com/ipfs/ipfs-companion/pull/1117): ![example telemetry single-toggle UI for settings page in ipfs-companion](./images/settings-page-single-toggle.png)

##### IPFS-Webui & IPFS-Desktop

Analytics toggling and consent notifications are already implemented in the desktop app and webui.

Example: ![example telemetry toggle UI for settings page in ipfs-webui and ipfs-desktop](./images/webui-settings-page-single-toggle.png)

### Informing users of changes to this policy

We will not display notifications to users regarding telemetry changes, but users can follow release-notes as well as changes to this library, it's telemetry documentation (`./docs/telemetry/*`), and projects implementing this library to stay up to date on our telemetry policy changes.

## SOPs (Standard Operating Procedures)

### Adding telemetry collection to a project without telemetry collection

1. Copy the [CollectedData.template](./CollectedData.template.md) file to your project at `./docs/telemetry/CollectedData.md`
2. Implement the library according to your project's needs
3. Update your `CollectedData.md` file specifying exactly which metrics your collecting, and when they're collected.

### Changing what metrics data is collected by a project

When you add/remove metrics data that is collected by a project, you MUST follow this checklist:

1. Fist ask yourself: Are you trying to collect user-identifiable, or other user data at all? STOP.
   * You must get legal approval
   * You must update the following documents:
      * `./PrivacyPolicy.md` - responsibility of legal write a new doc after meeting with you and discussing what your plans are. You would then update the `PrivacyPolicy.md` in this repo.
      * `./CollectionPolicy.md` - responsibility of you to update according to the changes you're making.
      * `./FAQs.md` - responsibility of you to update clarifying exactly why we're now collecting user data.
1. Modify the project's `./docs/telemetry/CollectedData.md` file.
   * Ensure the table under `What metrics data DO we collect` is accurate and up to date


### Changing a metric feature's grouping or opt-in/opt-out policy

When you move a metric feature to/from a particular feature group, or that group changes its consent method, you must update:

1. The table above at `Metric features and their groupings`
2. The code at https://github.com/ipfs-shipyard/ignite-metrics/blob/f4431f59ce363c898affd4171eed979ede24e514/src/CountlyMetrics.ts#L10-L16
3. Possibly the code at https://github.com/ipfs-shipyard/ignite-metrics/blob/f4431f59ce363c898affd4171eed979ede24e514/src/CountlyMetrics.ts#L27-L36

