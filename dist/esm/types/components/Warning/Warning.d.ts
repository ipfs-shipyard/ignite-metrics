import React from "react";
import "./Warning.css";
export interface WarningProps {
    showWarning?: boolean;
    warningText?: string;
    showMetricInfoLink?: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}
declare const Warning: ({ showWarning, warningText, showMetricInfoLink, onClose, children }: WarningProps) => JSX.Element | null;
export default Warning;
