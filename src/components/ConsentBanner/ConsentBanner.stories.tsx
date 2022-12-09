import React from "react";
import ConsentBanner from "./ConsentBanner";

export default {
    title: "Metrics Consent",
    component: ConsentBanner,
    args: {
        showConsentBanner: true,
        onAccept: () => {console.log('Accepted')},
        onDecline: () => {console.log('Declined: show warning') }
    },
};

const Template = args => <ConsentBanner {...args}/>;

const Standard = Template.bind({});

export { Standard }