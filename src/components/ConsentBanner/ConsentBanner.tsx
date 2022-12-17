import React from "react";
import styles from "./ConsentBanner.module.css";

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
        <div className={styles["consent-banner-wrapper"]}>
            {children}
        </div>
    )

    if (!showConsentBanner) {
        return null
    }
    
    return (
        <div className={styles["consent-banner-wrapper"]}>
        <div className={styles["consent-banner-container"]}>
          <div className={styles["consent-banner-text"]}>
            {msgText}
            { showConsentInfoIssueLink && 
            <div className={styles["consent-banner-link-wrapper"]}>
                <a className={styles["consent-banner-link"]} href="https://github.com/ipfs/ipfs-gui/issues/125" target="_blank" rel="noreferrer">
                    See details on metric collection
                </a>
            </div>
            }
            </div>
          <div className={styles["consent-banner-buttons"]}>
            <button 
                id={styles["consent-banner-accept"]} 
                className="js-consent-banner-accept"
                onClick={onAccept}
            >
                ☑&nbsp;Agree
            </button>
            <button 
                id={styles["consent-banner-decline"]} 
                className="js-consent-banner-decline"
                onClick={onDecline}
            >
                Decline
            </button>
          </div>
        </div>
      </div>
    )
}

export default ConsentBanner;