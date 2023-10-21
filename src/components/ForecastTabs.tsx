import React, { useEffect, useState } from "react";
import classNames from "classnames";
import {
  ApiWeatherForecast,
  ApiWeatherPeriod,
  DailyForecastByPeriods,
  ForecastDay,
} from "../types/api-types";
import styles from "./ForecastTabs.module.scss";
import ForecastTab from "./ForecastTab";

type ForecastTabsProps = {
  apiData: ApiWeatherForecast | undefined;
};

const ForecastTabs = (props: ForecastTabsProps) => {
  const { apiData } = props;
  const [dayToggle, setDayToggle] = useState<ForecastDay>("today");
  const [todayForecast, setTodayForecast] = useState<Array<ApiWeatherPeriod>>();

  const todayDate = new Date();
  const tommDate = new Date();
  tommDate.setDate(new Date().getDate() + 1);
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
  }, [apiData, dayToggle]);

  return (
    <>
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
    </>
  );
};

export default ForecastTabs;
