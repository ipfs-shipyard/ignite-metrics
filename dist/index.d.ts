import React from 'react';

interface ConsentBannerProps {
    showConsentBanner?: boolean;
    consentText?: string;
    children?: React.ReactNode;
    showConsentInfoIssueLink?: boolean;
    onAccept: () => void;
    onDecline: () => void;
}
declare const ConsentBanner: ({ showConsentBanner, consentText, showConsentInfoIssueLink, onAccept, onDecline, children }: ConsentBannerProps) => JSX.Element | null;

interface ConsentToggleProps {
    onToggleClick?: () => void;
}
declare const ConsentToggle: ({ onToggleClick }: ConsentToggleProps) => JSX.Element;

interface WarningProps {
    showWarning?: boolean;
    warningText?: string;
    showMetricInfoLink?: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}
declare const Warning: ({ showWarning, warningText, showMetricInfoLink, onClose, children }: WarningProps) => JSX.Element | null;

declare const InitCountlyMetrics: (appKey: any, url: any) => void;
declare const updateMetricsConsent: (consent: string[]) => void;
declare const acceptMetricsConsent: () => void;
declare const declineMetricsConsent: () => void;
declare const getMetricsConsent: () => string | null;

export { ConsentBanner, ConsentToggle, InitCountlyMetrics, Warning, acceptMetricsConsent, declineMetricsConsent, getMetricsConsent, updateMetricsConsent };
