import React from "react";
import Example from "./Example.js";
import Warning from '../components/Warning/index.js';
import Consent from '../components/ConsentBanner/index.js';
import ConsentToggle from '../components/ConsentToggle/index.js';

export default {
    title: "Metrics Consent Example",
    component: Example,
    subComponents: { Warning, Consent, ConsentToggle},
    args: {
        metricsAppKey: '',
        metricsURL: 'https://countly.ipfs.io'
    }
};

const Template = args => <Example {...args}/>

const Standard = Template.bind({})

export { Standard }
