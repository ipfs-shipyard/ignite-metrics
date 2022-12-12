import React from "react";
import Example from "./Example";
import Warning from '../components/Warning';
import Consent from '../components/ConsentBanner';
import ConsentToggle from '../components/ConsentToggle';

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