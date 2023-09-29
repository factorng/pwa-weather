import React, { useEffect, useState } from "react";
import {
  Coordinates,
  ApiErrorMessage,
  ApiAirPollution,
} from "../types/api-types";
import classNames from "classnames";
import styles from "./AirPollution.module.scss";
import Preloader from "./Preloader";
import { getCityPollutionById } from "../utils/api";

type AirPollutionProps = { cityCoords: Coordinates };

const AirPollution = (props: AirPollutionProps) => {
  const { cityCoords } = props;
  const [errorMessage, setErrorMessage] = useState<ApiErrorMessage | undefined>(
    undefined
  );
  const [fetchedData, setFetchedData] = useState<ApiAirPollution | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchData() {
      if (cityCoords) {
        const data = await getCityPollutionById(cityCoords.lon, cityCoords.lat);
        if (data && "errorMessage" in data) {
          setErrorMessage(data);
          return;
        } else setFetchedData(data);
      }
    }
    cityCoords && fetchData();
  }, [cityCoords]);

  useEffect(() => {
    errorMessage && alert(errorMessage);
  }, [errorMessage]);

  return fetchedData ? (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Air Pollution</h3>
      <div className={styles.items}>
        <p className={styles.item}>
          Air quality index
          <span
            className={classNames(styles.itemData, {
              [styles.itemDataColorRed]: fetchedData.list[0].main.aqi > 4,
              [styles.itemDataColorGreen]: fetchedData.list[0].main.aqi <= 2,
              [styles.itemDataColorYellow]:
                fetchedData.list[0].main.aqi > 2 &&
                fetchedData.list[0].main.aqi <= 4,
            })}>
            {fetchedData.list[0].main.aqi}
          </span>
        </p>
        <p className={styles.item}>
          PM2.5
          <span
            className={classNames(styles.itemData, {
              [styles.itemDataColorRed]:
                fetchedData.list[0].components.pm2_5 > 50,
              [styles.itemDataColorGreen]:
                fetchedData.list[0].components.pm2_5 < 10,
              [styles.itemDataColorYellow]:
                fetchedData.list[0].components.pm2_5 >= 10 &&
                fetchedData.list[0].components.pm2_5 <= 50,
            })}>
            {fetchedData.list[0].components.pm2_5}
          </span>
        </p>
        <p className={styles.item}>
          CO
          <span
            className={classNames(styles.itemData, {
              [styles.itemDataColorRed]:
                fetchedData.list[0].components.co > 12400,
              [styles.itemDataColorGreen]:
                fetchedData.list[0].components.co < 4400,
              [styles.itemDataColorYellow]:
                fetchedData.list[0].components.co >= 4400 &&
                fetchedData.list[0].components.co < 12400,
            })}>
            {fetchedData.list[0].components.co}
          </span>
        </p>
      </div>
    </div>
  ) : (
    <Preloader />
  );
};

export default AirPollution;
