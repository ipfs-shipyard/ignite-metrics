import React from "react";
import styles from "./Warning.module.css";
const Warning = ({ showWarning, warningText, showMetricInfoLink, onClose, children }) => {
    const renderWarningMessage = () => {
        const msgText = warningText || "We will limit collection of metrics to only necessary features: 'sessions' and 'views'.";
        return (React.createElement("div", { id: styles.consentWarningDeclineWarning, className: styles["consent-warning-text"] },
            msgText,
            showMetricInfoLink &&
                React.createElement("div", { className: styles["consent-warning-link-wrapper"] },
                    "See",
                    React.createElement("a", { className: styles["consent-warning-link"], href: "https://support.count.ly/hc/en-us/articles/360037441932-Web-analytics-JavaScript-#features-for-consent", target: "_blank", rel: "noreferrer" }, `Countly's group_features`),
                    "for more information.")));
    };
    if (children)
        return (React.createElement("div", { className: styles["consent-warning-wrapper"] }, children));
    if (!showWarning) {
        return null;
    }
    return (React.createElement("div", { className: styles["consent-warning-wrapper"] },
        React.createElement("div", { className: styles["consent-warning-container"] },
            renderWarningMessage(),
            React.createElement("div", { className: styles["consent-warning-buttons"] },
                React.createElement("button", { id: styles["consent-warning-warning-close"], className: "js-consent-warning-warning-close", onClick: onClose }, "\u2715\u00A0Close")))));
};
export default Warning;
//# sourceMappingURL=Warning.js.map