import React, { useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import {
  ApiWeatherForecast,
  ApiWeatherPeriod,
  ForecastDay,
  ApiErrorMessage,
} from "../types/api-types";
import styles from "./ForecastTabs.module.scss";
import ForecastTab from "./ForecastTab";
import { getCityForecastById } from "../utils/api";

type ForecastTabsProps = {
  cityId: number;
};

const ForecastTabs = (props: ForecastTabsProps) => {
  const { cityId } = props;
  const [dayToggle, setDayToggle] = useState<ForecastDay>("today");
  const [todayForecast, setTodayForecast] = useState<Array<ApiWeatherPeriod>>();
  const [apiData, setApiData] = useState<ApiWeatherForecast | undefined>();
  const [errorMessage, setErrorMessage] = useState<ApiErrorMessage | undefined>(
    undefined
  );

  const todayDate = useMemo(() => new Date(), []);
  const tommDate = useMemo(() => new Date(), []);
  tommDate.setDate(new Date().getDate() + 1);

  useEffect(() => {
    async function fetchData() {
      const timeForecast = await getCityForecastById(cityId);
      if ("errorMessage" in timeForecast) {
        setErrorMessage(timeForecast);
        return;
      } else setApiData(timeForecast);
    }
    cityId && fetchData();
  }, [cityId]);

  useEffect(() => errorMessage && alert(errorMessage), [errorMessage]);

  useEffect(() => {
    const todayForecast = apiData?.list.filter((day) => {
      day.dt_txt = day.dt_txt.replace(" ", "T");
      const curDay: number = new Date(day.dt_txt).getDate();
      if (dayToggle === "today") {
        return curDay === todayDate.getDate();
      } else {
        return curDay === tommDate.getDate();
      }
    });
    setTodayForecast(todayForecast);
  }, [apiData, dayToggle, todayDate, tommDate, cityId]);

  return (
    <div className={styles.timeForecast}>
      <div>
        <button
          onClick={() => setDayToggle("today")}
          className={classNames(styles.timeForecastButton, {
            [styles.timeForecastButtonInactive]: dayToggle !== "today",
          })}>
          Today
        </button>
        <button
          onClick={() => setDayToggle("tomorrow")}
          className={classNames(styles.timeForecastButton, {
            [styles.timeForecastButtonInactive]: dayToggle !== "tomorrow",
          })}>
          Tomorrow
        </button>
      </div>
      {todayForecast && (
        <ForecastTab dayToggle={dayToggle} todayForecast={todayForecast} />
      )}
    </div>
  );
};

export default ForecastTabs;
