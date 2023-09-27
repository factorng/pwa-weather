import React, { useEffect, useState } from "react";
import { BeforeInstallPromptEvent } from "../types/prompt-event";
import styles from "./InstallAndroidButton.module.scss";

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const InstallAndroidButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent>();

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        id="setup_button"
        aria-label="Install app"
        title="Install app"
        onClick={onClick}>
        Install
      </button>
    </div>
  );
};

export default InstallAndroidButton;
