import React from "react";
import ConsentToggle from "./ConsentToggle";

export default {
    title: "Metrics Consent Toggle",
    component: ConsentToggle,
    args: {}
};

const Template = args => <ConsentToggle {...args}/>;

const Standard = Template.bind({});

export { Standard }