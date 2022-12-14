import React from "react";
import ConsentToggle from "./ConsentToggle.js";
import type { ConsentToggleProps } from './ConsentToggle.js';

export default {
    title: "Metrics Consent Toggle",
    component: ConsentToggle,
    args: {}
};

const Template = (args:ConsentToggleProps) => <ConsentToggle {...args}/>;

const Standard = Template.bind({});

export { Standard }
