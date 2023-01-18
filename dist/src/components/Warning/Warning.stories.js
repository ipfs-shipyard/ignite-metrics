import React, { useState } from "react";
import Warning from "./Warning.js";
export default {
    title: "Metrics Warning",
    component: Warning,
    args: {}
};
const Template = (args) => {
    const [showWarning, setShowWarning] = useState(true);
    return (React.createElement(Warning, Object.assign({}, args, { onClose: () => setShowWarning(false), showWarning: showWarning })));
};
const Standard = Template.bind({});
export { Standard };
//# sourceMappingURL=Warning.stories.js.map