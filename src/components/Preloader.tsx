import React from "react";
import styles from "./Preloader.module.scss";

function Preloader() {
  return (
    <section className={styles["preloader"]} data-testid="preloader">
      <i className={styles["circle-preloader"]}></i>
    </section>
  );
}
export default Preloader;
