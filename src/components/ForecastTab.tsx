import React, { useEffect, useState } from "react";
import TimeForecastItem from "./TimeForecastItem";
import styles from "./ForecastTabs.module.scss";
import {
  ApiWeatherPeriod,
  DailyForecastByPeriods,
  ForecastDay,
} from "../types/api-types";
import { DAY_TIME } from "../utils/constants";

type ForecastTabProps = {
  dayToggle: ForecastDay;
  todayForecast: Array<ApiWeatherPeriod>;
};

const ForecastTab = (props: ForecastTabProps) => {
  const { dayToggle, todayForecast } = props;
  const [dailyForecastByPeriods, setDailyForecastByPeriods] =
    useState<DailyForecastByPeriods>();
  useEffect(() => {
    const forecastByPeriods: DailyForecastByPeriods = todayForecast?.reduce(
      (acc, el) => {
        if (acc)
          switch (new Date(el.dt_txt).getHours()) {
            case DAY_TIME["MORNING"]:
              if (acc["morning"]) break;
              acc["morning"] = el;
              break;
            case DAY_TIME["AFTERNOON"]:
              if (acc["afternoon"]) break;
              acc["afternoon"] = el;
              break;
            case DAY_TIME["EVENING"]:
              if (acc["evening"]) break;
              acc["evening"] = el;
              break;
            case DAY_TIME["NIGHT"]:
              if (acc["night"]) break;
              acc["night"] = el;
              break;
          }
        return acc;
      },
      {} as DailyForecastByPeriods
    );
    setDailyForecastByPeriods(forecastByPeriods);
  }, [todayForecast, dayToggle]);

  return (
    <div className={styles.timeForecastItems}>
      {dailyForecastByPeriods &&
        Object.entries(dailyForecastByPeriods).map(([timePeriod, forecast]) => (
          <TimeForecastItem
            timePeriod={timePeriod}
            forecast={forecast}
            key={timePeriod}
          />
        ))}
    </div>
  );
};

export default ForecastTab;
