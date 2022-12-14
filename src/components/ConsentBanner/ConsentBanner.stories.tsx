import React from "react";
import ConsentBanner from "./ConsentBanner.js";
import type { ConsentBannerProps } from "./ConsentBanner.js";

export default {
    title: "Metrics Consent",
    component: ConsentBanner,
    args: {
        showConsentBanner: true,
        onAccept: () => {console.log('Accepted')},
        onDecline: () => {console.log('Declined: show warning') }
    },
};

const Template = (args:ConsentBannerProps) => <ConsentBanner {...args}/>;

const Standard = Template.bind({});

export { Standard }
