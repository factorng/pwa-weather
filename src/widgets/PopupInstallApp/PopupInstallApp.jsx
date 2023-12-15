import React, { useEffect, useState, useRef } from 'react';
import { Popup } from 'shared/ui/Popup';
import { ReactPortal } from 'shared/ui/ReactPortal';

/**@typedef {import('./types').PopupInstallAppProps} Props */

/**
 * @function PopupInstallApp
 * @returns JSX.Element
 */

export function PopupInstallApp() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  //что использовать вместо *
  /** @type {React.MutableRefObject<*>}*/
  const deferredPrompt = useRef(null);
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      deferredPrompt.current = e;
      // Show your customized install prompt for your PWA
      // Your own UI doesn't have to be a single element, you
      // can have buttons in different locations, or wait to prompt
      // as part of a critical journey.
      setIsPopupOpen(true);
    });

  }, []);
  const handleInstall = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      // Find out whether the user confirmed the installation or not
      const { outcome } = await deferredPrompt.current.userChoice;
      // The deferredPrompt can only be used once.
      deferredPrompt.current = null;
      // We hide the install button
    }
  };

  return (
    <>
      <ReactPortal>
        <Popup isOpen={isPopupOpen} handleClose={() => setIsPopupOpen(false)} >
          <>
            <h3>Click to install application</h3>
            <button onClick={handleInstall}>Install</button>
          </>
        </Popup>
      </ReactPortal>
    </>
  );

}
// #installInstructions {
//   display: none
// }
// @media (display-mode: browser) {
//   #installInstructions {
//     display: block
//   }
// }

