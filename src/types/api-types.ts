import { AnyARecord } from "dns";

export type WeatherData = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};
export type WeatherConditions = {
  description: string;
  icon: string;
  id: number;
  main: string;
};
export type Wind = {
  deg: number;
  speed: number;
};
export type ApiWeatherNow = {
  main: WeatherData;
  name: string;
  weather: Array<WeatherConditions>;
  wind: Wind;
  dt: number;
  dt_txt: string;
  coord: { lat: number; lon: number };
};
export type ApiWeatherPeriod = {
  main: WeatherData;
  weather: Array<WeatherConditions>;
  wind: Wind;
  dt: number;
  dt_txt: string;
};
export type ApiError = {
  message: string;
  cod: number;
};
export type ApiWeatherForecast = {
  list: Array<{
    main: WeatherData;
    weather: Array<WeatherConditions>;
    wind: Wind;
    dt: number;
    dt_txt: string;
  }>;
  cod: string;
};
export type ApiErrorMessage = {
  errorMessage: string;
};
export type ApiAirPollution =
  | {
      coord: Coordinates;
      list: Array<AirPollution>;
    }
  | undefined;
export type AirPollution = {
  components: {
    co: number;
    nh3: number;
    no: number;
    no2: number;
    o3: number;
    pm10: number;
    pm2_5: number;
    so2: number;
  };
  main: { aqi: number };
};
export type DailyForecastByPeriods =
  | {
      morning: ApiWeatherPeriod;
      afternoon: ApiWeatherPeriod;
      evening: ApiWeatherPeriod;
      night: ApiWeatherPeriod;
    }
  | undefined;
export type Coordinates = { lat: number; lon: number };
export type CityListItem = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinates;
};
export type CityList = Array<CityListItem>;
export type ForecastDay = "today" | "tomorrow";
