import React from "react";
import {
  ApiWeatherNow,
  ApiError,
  WeatherData,
  CityList,
} from "../types/api-types";
import styles from "./DetailedDayForecast.module.scss";
import useImage from "../hooks/useImage";
import Input from "./Input";
import Preloader from "./Preloader";

type DetailedDayForecastProps = {
  apiData: ApiWeatherNow | undefined;
  onInput: (input: string) => any;
  searchHints: CityList;
  onHintClick: (id: number) => void;
};

const DetailedDayForecast = (props: DetailedDayForecastProps) => {
  const { apiData, onInput, searchHints, onHintClick } = props;
  const { loading, error, image } = useImage(apiData?.weather[0].icon);
  return apiData ? (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <span className={styles.degrees}>
          {Math.floor(apiData?.main.temp)}°
        </span>
        <span className={styles.conditions}>
          {apiData?.weather[0].description}
        </span>
        {image && (
          <img
            className={styles.weatherIcon}
            src={image}
            alt={apiData?.weather[0].description}
          />
        )}
      </div>
      <Input
        value={apiData.name}
        onInputChangeHanlder={(e) => onInput(e)}
        hints={searchHints}
        onHintClick={onHintClick}
      />
      <div className={styles.additionalInfo}>
        <div className={styles.additionalInfoItem}>
          <p className={styles.additionalInfoData}>{apiData?.main.humidity}%</p>
          <p className={styles.additionalInfoDescription}>Humidity</p>
        </div>
        <div className={styles.additionalInfoItem}>
          <p className={styles.additionalInfoData}>
            {apiData?.main.pressure}kPa
          </p>
          <p className={styles.additionalInfoDescription}>Pressure</p>
        </div>
        <div className={styles.additionalInfoItem}>
          <p className={styles.additionalInfoData}>{apiData?.wind.speed}m/c</p>
          <p className={styles.additionalInfoDescription}>Wind</p>
        </div>
      </div>
    </div>
  ) : (
    <Preloader />
  );
};

export default DetailedDayForecast;
