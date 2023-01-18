import React from "react";
import ConsentBanner from "./ConsentBanner.js";
export default {
    title: "Metrics Consent",
    component: ConsentBanner,
    args: {
        showConsentBanner: true,
        onAccept: () => { console.log('Accepted'); },
        onDecline: () => { console.log('Declined: show warning'); }
    },
};
const Template = (args) => React.createElement(ConsentBanner, Object.assign({}, args));
const Standard = Template.bind({});
export { Standard };
//# sourceMappingURL=ConsentBanner.stories.js.map