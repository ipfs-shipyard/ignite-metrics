import type { ConsentBannerProps } from "./ConsentBanner.js";
declare const _default: {
    title: string;
    component: ({ showConsentBanner, consentText, showConsentInfoIssueLink, onAccept, onDecline, children }: ConsentBannerProps) => JSX.Element | null;
    args: {
        showConsentBanner: boolean;
        onAccept: () => void;
        onDecline: () => void;
    };
};
export default _default;
declare const Standard: (args: ConsentBannerProps) => JSX.Element;
export { Standard };
//# sourceMappingURL=ConsentBanner.stories.d.ts.map