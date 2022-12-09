import React from "react";
import "./ConsentBanner.css";

export interface ConsentBannerProps {
    showConsentBanner?: boolean,
    consentText?: string,
    children?: React.ReactNode,
    showConsentInfoIssueLink?: boolean,
    onAccept: () => void,
    onDecline: () => void
}

const ConsentBanner = ({showConsentBanner, consentText, showConsentInfoIssueLink, onAccept, onDecline, children}:ConsentBannerProps ) => {
    const msgText = consentText || "We're collecting web-vitals, pageview and other metrics in order to improve and prioritize our work on IPFS";
    
    if(children) return (
        <>
            {children}
        </>
    )
    
    return showConsentBanner ? (
        <div className="js-metrics-notification metrics-notification-wrapper">
        <div className="metrics-notification-container">
          <div className="metrics-notification-text">
            {msgText}
            { showConsentInfoIssueLink && 
            <div className="metric-info-link-wrapper">
                <a className="consent-info-link" href="https://github.com/ipfs/ipfs-gui/issues/125" target="_blank" rel="noreferrer">
                    See details on metric collection
                </a>
            </div>
            }
            </div>
          <div className="metrics-notification-buttons">
            <button 
                id="metrics-notification-accept" 
                className="js-metrics-notification-accept"
                onClick={onAccept}
            >
                ☑&nbsp;Agree
            </button>
            <button 
                id="metrics-notification-decline" 
                className="js-metrics-notification-decline"
                onClick={onDecline}
            >
                Decline
            </button>
          </div>
        </div>
      </div>
    ) : null
}

export default ConsentBanner;