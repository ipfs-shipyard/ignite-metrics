import React, { useState } from "react";
import Warning from "./Warning.js";

export default {
    title: "Metrics Warning",
    component: Warning,
    args: {}
};

const Template = args => {
    const [showWarning, setShowWarning] = useState(true);
    return (
        <Warning onClose={() => setShowWarning(false)} showWarning={showWarning} {...args} />
    )
}

const Standard = Template.bind({});

export { Standard }
