import React from "react";
import styles from "./InstallPopupIOS.module.scss";
import shareIcon from "../assets/images/ios-share.svg";

function InstallPopupIOS() {
  return (
    <div className={styles.wrapper}>
      <p>click share then add to home screem</p>
      <img src={shareIcon} alt="share icon"></img>
    </div>
  );
}
export default InstallPopupIOS;
