import React, { useState } from "react";
import Warning from "./Warning.js";
import type { WarningProps } from "./Warning.js";

export default {
    title: "Metrics Warning",
    component: Warning,
    args: {}
};

const Template = (args:WarningProps) => {
    const [showWarning, setShowWarning] = useState(true);
    return (
        <Warning {...args} onClose={() => setShowWarning(false)} showWarning={showWarning} />
    )
}

const Standard = Template.bind({});

export { Standard }
