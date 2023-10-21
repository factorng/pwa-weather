import React from "react";
import { ApiWeatherForecast, ApiWeatherPeriod } from "../types/api-types";
import styles from "./TimeForecastItem.module.scss";
import useImage from "../hooks/useImage";

type TimeForecastItemProps = {
  timePeriod: string;
  forecast: ApiWeatherPeriod;
};

const TimeForecastItem = ({ timePeriod, forecast }: TimeForecastItemProps) => {
  const { loading, error, image } = useImage(forecast?.weather[0].icon);
  return (
    <div className={styles.itemForecast} key={timePeriod}>
      {image && <img src={image} className={styles.itemForecastIcon} />}
      <p className={styles.itemForecastTemp}>
        {Math.floor(forecast.main.temp)}°
      </p>
      <p className={styles.itemForecastPeriod}>{timePeriod}</p>
    </div>
  );
};

export default TimeForecastItem;
