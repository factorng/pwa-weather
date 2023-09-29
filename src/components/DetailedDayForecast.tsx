import React, { useState, useEffect } from "react";
import { getCityWeaterById } from "../utils/api";
import { ApiWeatherNow, CityList, ApiErrorMessage } from "../types/api-types";
import styles from "./DetailedDayForecast.module.scss";
import useImage from "../hooks/useImage";
import Input from "./Input";
import Preloader from "./Preloader";

type DetailedDayForecastProps = {
  cityId: number;
  onInput: (input: string) => any;
  searchHints: CityList;
  onHintClick: (id: number) => void;
  handleLocationClick: () => void;
};

const DetailedDayForecast = (props: DetailedDayForecastProps) => {
  const { cityId, onInput, searchHints, onHintClick, handleLocationClick } =
    props;

  const [apiData, setApiData] = useState<ApiWeatherNow | undefined>();
  const [errorMessage, setErrorMessage] = useState<ApiErrorMessage | undefined>(
    undefined
  );
  const { image } = useImage(apiData?.weather[0].icon);

  useEffect(() => {
    async function fetchData() {
      const detailedForecast = await getCityWeaterById(cityId);

      if ("errorMessage" in detailedForecast) {
        setErrorMessage(detailedForecast);
        return;
      } else {
        setApiData(detailedForecast);
      }
    }

    cityId && fetchData();
  }, [cityId]);

  useEffect(() => {
    errorMessage && alert(errorMessage);
  }, [errorMessage]);

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
        handleLocationClick={handleLocationClick}
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
