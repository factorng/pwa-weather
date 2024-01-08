import { ApiWeatherPeriod } from "shared/types/api-types";

export type TimeForecastItemProps = {
  timePeriod: string;
  forecast: ApiWeatherPeriod;
};
