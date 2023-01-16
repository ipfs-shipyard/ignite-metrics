import React, { useEffect, useState } from 'react';
import ConsentBanner from '../../src/components/ConsentBanner';
import ConsentToggle from '../../src/components/ConsentToggle';
import Warning from '../../src/components/Warning';
import { COUNTLY_API_URL } from '../../src/config';
import MetricsProvider from '../../src/MetricsProvider';
import './Example.css';

interface ExampleProps {
  metricsAppKey: string,
  metricsURL: string
}

const Example = ({ metricsAppKey }: ExampleProps) => {
  const metricsProvider = new MetricsProvider({
    url: metricsAppKey,
    appKey: metricsAppKey
  });
  const [showWarning, setShowWarning] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [metricsConsent, setMetricsConsent] = useState<string[] | null>(metricsProvider.consentGranted);

  const onAccept = () => {
    metricsProvider.addConsent('minimal')
    setMetricsConsent(metricsProvider.consentGranted)
  }

  const onDecline = () => {
    metricsProvider.removeConsent('minimal');
    setMetricsConsent(metricsProvider.consentGranted)
    setShowWarning(true);
  }

  const onToggleClick = () => {
    setShowConsentBanner(!showConsentBanner);
  }

  useEffect(() => {
    setMetricsConsent(metricsConsent)

    if(metricsConsent != null) {
      try {
        setShowConsentBanner(false)
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
            <ConsentBanner onAccept={() => onAccept()} onDecline={() => onDecline()} showConsentBanner={showConsentBanner} />
            <ConsentToggle onToggleClick={() => onToggleClick()}/>
        </div>
        <div className="example-metrics-status">
            Metrics Consent: {metricsConsent}
        </div>
      </div>

    </div>
  );
}

export default {
    title: "Metrics Consent Example",
    component: Example,
    subComponents: { Warning, ConsentBanner, ConsentToggle},
    args: {
        metricsAppKey: '',
        metricsURL: COUNTLY_API_URL
    }
};

const Template = (args:ExampleProps) => <Example {...args}/>

const Standard = Template.bind({})

export { Standard };
