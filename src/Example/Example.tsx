import React, {useState, useEffect} from 'react';
import Warning from '../components/Warning';
import Consent from '../components/ConsentBanner';
import ConsentToggle from '../components/ConsentToggle';
import { InitCountlyMetrics, getMetricsConsent, updateMetricsConsent, acceptMetricsConsent, declineMetricsConsent } from '../CountlyMetrics';

const Example = ({metricsAppKey, metricsURL}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [metricsConsent, setMetricsConsent] = useState<string | null>(getMetricsConsent());

  const onAccept = () => {
    acceptMetricsConsent()
    setMetricsConsent(getMetricsConsent()) 
  }

  const onDecline = () => {
    declineMetricsConsent()
    setMetricsConsent(getMetricsConsent())
    setShowWarning(true);
  }

  const onToggleClick = () => {
    setShowConsentBanner(!!showConsentBanner);
  }

  useEffect(() => {
    const appKey = metricsAppKey;
    const url=metricsURL;

    InitCountlyMetrics(appKey,url);
    
  }, [])

  useEffect(() => {
    setMetricsConsent(metricsConsent)

    if(metricsConsent != null) {
      try {
        updateMetricsConsent(JSON.parse(metricsConsent))
      } catch {
        setShowConsentBanner(true)
      }
    } else {
      setShowConsentBanner(true)
    }
  },[metricsConsent])

  return (
    <div className="example-metrics-app">
      <div className="example-metrics-app-body">
        <div className="example-metrics-consent">
            <Warning showWarning={showWarning} onClose={() => setShowWarning(false)} showMetricInfoLink={true} />
            <Consent onAccept={() => onAccept()} onDecline={() => onDecline()} />
            <ConsentToggle onToggleClick={() => onToggleClick()}/>
        </div>
        <div className="example-metrics-status">
            Metrics Consent: {metricsConsent}
        </div>
      </div>

    </div>
  );
}

export default Example;
