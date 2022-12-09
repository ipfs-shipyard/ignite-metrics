import React, {useState, useEffect} from 'react';
import Warning from './components/Warning';
import Consent from './components/ConsentBanner';
import ConsentToggle from './components/ConsentToggle';
import { InitCountlyMetrics, getMetricsConsent, updateMetricsConsent, acceptMetricsConsent, declineMetricsConsent } from './CountlyMetrics';

function App() {
  const [showWarning, setShowWarning] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [metricsConsent, setMetricsConsent] = useState<string | null>(null);
  
  //todo: better way to handle metrics local storage changes?
  // const updateConsent = (consent: string[]) => {
  //   setShowConsentBanner(false)
  //   updateMetricsConsent(consent)
  //   setMetricsConsent(getMetricsConsent())
  // }

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
    setShowConsentBanner(!showConsentBanner);
  }

  useEffect(() => {
    const appKey = '3c2c0819434074fc4d339ddd8e112a1e741ecb72';
    const url='https://countly.ipfs.io';

    InitCountlyMetrics(appKey,url);
    
    const localMetricsConsent = getMetricsConsent();
    setMetricsConsent(localMetricsConsent)
  }, [])

  useEffect(() => {

    if(metricsConsent != null) {
      try {
        updateMetricsConsent(JSON.parse(metricsConsent))
        setShowConsentBanner(false)
      } catch {
        setShowConsentBanner(true)
      }
    } else {
      setShowConsentBanner(true)
    }
  },[metricsConsent])

  return (
    <div className="App">
      <Warning showWarning={showWarning} onClose={() => setShowWarning(false)} showMetricInfoLink={true} />
      <Consent showConsentBanner={showConsentBanner} showConsentInfoIssueLink={true} onAccept={() => onAccept()} onDecline={() => onDecline()} />
      <ConsentToggle onToggleClick={() => onToggleClick()}/>
    </div>
  );
}

export default App;
