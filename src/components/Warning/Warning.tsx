import React from "react";
import "./Warning.css";

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
            <div id="metrics-warning-decline-warning" className="metrics-warning-text">
                {msgText}
                {
                    showMetricInfoLink && 
                    <div className="metric-info-link-wrapper">
                        See 
                        <a className="metrics-warning-link" href="https://support.count.ly/hc/en-us/articles/360037441932-Web-analytics-JavaScript-#features-for-consent" target="_blank" rel="noreferrer">
                            {`Countly's group_features`}
                        </a> 
                        for more information.
                    </div>
                }
          </div>
        )
    }   

    if(children) return (
        <>
            {children}
        </>
    )
    
    return showWarning ? (
        <div className="js-metrics-warning-decline-warning metrics-warning-wrapper">
            <div className="metrics-warning-container">
                {renderWarningMessage()}
                <div className="metrics-warning-buttons">
                    <button 
                        id="metrics-warning-warning-close" 
                        className="js-metrics-warning-warning-close"
                        onClick={onClose}
                    >
                            ✕&nbsp;Close
                        </button>
                </div>
            </div>
        </div>
    ) : null
}

export default Warning;