import React from "react";
import ConsentToggle from "./ConsentToggle";
import type { ConsentToggleProps } from './ConsentToggle';

export default {
    title: "Metrics Consent Toggle",
    component: ConsentToggle,
    args: {}
};

const Template = (args:ConsentToggleProps) => <ConsentToggle {...args}/>;

const Standard = Template.bind({});

export { Standard }
