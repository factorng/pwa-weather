import { useState, useEffect } from "react";

const useDeviceInfo = () => {
  const [showInstallMessage, setInstallMessage] = useState(false);
  useEffect(() => {
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test( userAgent );
      }
      const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
  
      if (isIos() && !isInStandaloneMode()) {
          setInstallMessage( true );
      };
      
  }, []);
    
  return showInstallMessage;
}
export default useDeviceInfo;