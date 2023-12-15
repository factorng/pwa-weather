import { ApiWeatherNow } from "shared/types/api-types";

export type ForecastTabProps = {
  dayToggle: string;
  todayForecast: ApiWeatherNow;
};
