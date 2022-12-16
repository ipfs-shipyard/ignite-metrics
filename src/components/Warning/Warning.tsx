import React from "react";
import styles from "./Warning.module.css";

export interface WarningProps {
    showWarning?: boolean,
    warningText?: string,
    showMetricInfoLink?: boolean,
    onClose: () => void,
    children?: React.ReactNode
}

const Warning = ({ showWarning, warningText, showMetricInfoLink, onClose, children }:WarningProps) => {

    const renderWarningMessage = () => {
        const msgText = warningText || "We will limit collection of metrics to only necessary features: 'sessions' and 'views'."

        return (
            <div id={styles.consentWarningDeclineWarning} className={styles["consent-warning-text"]}>
                {msgText}
                {
                    showMetricInfoLink && 
                    <div className={styles["consent-warning-link-wrapper"]}>
                        See 
                        <a className={styles["consent-warning-link"]} href="https://support.count.ly/hc/en-us/articles/360037441932-Web-analytics-JavaScript-#features-for-consent" target="_blank" rel="noreferrer">
                            {`Countly's group_features`}
                        </a> 
                        for more information.
                    </div>
                }
          </div>
        )
    }   

    if(children) return (
        <div className={styles["consent-warning-wrapper"]}>
            {children}
        </div>
    )

    if(!showWarning) {
        return null
    }
    
    return (
        <div className={styles["consent-warning-wrapper"]}>
            <div className={styles["consent-warning-container"]}>
                {renderWarningMessage()}
                <div className={styles["consent-warning-buttons"]}>
                    <button 
                        id={styles["consent-warning-warning-close"]} 
                        className="js-consent-warning-warning-close"
                        onClick={onClose}
                    >
                            ✕&nbsp;Close
                        </button>
                </div>
            </div>
        </div>
    )
}

export default Warning;