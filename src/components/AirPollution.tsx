import React from "react";
import { ApiAirPollution } from "../types/api-types";
import classNames from "classnames";
import styles from "./AirPollution.module.scss";
import Preloader from "./Preloader";

type AirPollutionProps = { data: ApiAirPollution };

const AirPollution = (props: AirPollutionProps) => {
  const { data } = props;
  return data ? (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Air Polutions</h3>
      <div className={styles.items}>
        <p className={styles.item}>
          Air quality index
          <span
            className={classNames(styles.itemData, {
              [styles.itemDataColorRed]: data.list[0].main.aqi > 4,
              [styles.itemDataColorGreen]: data.list[0].main.aqi <= 2,
              [styles.itemDataColorYellow]:
                data.list[0].main.aqi > 2 && data.list[0].main.aqi <= 4,
            })}>
            {data.list[0].main.aqi}
          </span>
        </p>
        <p className={styles.item}>
          PM2.5
          <span
            className={classNames(styles.itemData, {
              [styles.itemDataColorRed]: data.list[0].components.pm2_5 > 50,
              [styles.itemDataColorGreen]: data.list[0].components.pm2_5 < 10,
              [styles.itemDataColorYellow]:
                data.list[0].components.pm2_5 >= 10 &&
                data.list[0].components.pm2_5 <= 50,
            })}>
            {data.list[0].components.pm2_5}
          </span>
        </p>
        <p className={styles.item}>
          CO
          <span
            className={classNames(styles.itemData, {
              [styles.itemDataColorRed]: data.list[0].components.co > 12400,
              [styles.itemDataColorGreen]: data.list[0].components.co < 4400,
              [styles.itemDataColorYellow]:
                data.list[0].components.co >= 4400 &&
                data.list[0].components.co < 12400,
            })}>
            {data.list[0].components.co}
          </span>
        </p>
      </div>
    </div>
  ) : (
    <Preloader />
  );
};

export default AirPollution;
