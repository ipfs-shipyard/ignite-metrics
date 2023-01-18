import React from "react";
import styles from "./ConsentBanner.module.css";
const ConsentBanner = ({ showConsentBanner, consentText, showConsentInfoIssueLink, onAccept, onDecline, children }) => {
    const msgText = consentText || "We're collecting web-vitals, pageview and other metrics in order to improve and prioritize our work on IPFS";
    if (children)
        return (React.createElement("div", { className: styles["consent-banner-wrapper"] }, children));
    if (!showConsentBanner) {
        return null;
    }
    return (React.createElement("div", { className: styles["consent-banner-wrapper"] },
        React.createElement("div", { className: styles["consent-banner-container"] },
            React.createElement("div", { className: styles["consent-banner-text"] },
                msgText,
                showConsentInfoIssueLink &&
                    React.createElement("div", { className: styles["consent-banner-link-wrapper"] },
                        React.createElement("a", { className: styles["consent-banner-link"], href: "https://github.com/ipfs/ipfs-gui/issues/125", target: "_blank", rel: "noreferrer" }, "See details on metric collection"))),
            React.createElement("div", { className: styles["consent-banner-buttons"] },
                React.createElement("button", { id: styles["consent-banner-accept"], className: "js-consent-banner-accept", onClick: onAccept }, "\u2611\u00A0Agree"),
                React.createElement("button", { id: styles["consent-banner-decline"], className: "js-consent-banner-decline", onClick: onDecline }, "Decline")))));
};
export default ConsentBanner;
//# sourceMappingURL=ConsentBanner.js.map