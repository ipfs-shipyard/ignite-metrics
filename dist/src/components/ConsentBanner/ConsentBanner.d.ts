import React from "react";
export interface ConsentBannerProps {
    showConsentBanner?: boolean;
    consentText?: string;
    children?: React.ReactNode;
    showConsentInfoIssueLink?: boolean;
    onAccept: () => void;
    onDecline: () => void;
}
declare const ConsentBanner: ({ showConsentBanner, consentText, showConsentInfoIssueLink, onAccept, onDecline, children }: ConsentBannerProps) => JSX.Element | null;
export default ConsentBanner;
//# sourceMappingURL=ConsentBanner.d.ts.map