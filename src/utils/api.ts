import {
  ApiWeatherNow,
  ApiError,
  ApiWeatherForecast,
  ApiErrorMessage,
  ApiAirPollution,
} from "../types/api-types";

export async function getCityWeaterById(
  id: number
): Promise<ApiWeatherNow | ApiErrorMessage> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data: ApiWeatherNow | ApiError = await response.json();
    if (data instanceof Object && "main" in data) return data;
    else return { errorMessage: "Check Internet connection" };
  } catch (e: unknown) {
    return { errorMessage: "unknown error" };
  }
}

export async function getCityForecastById(
  id: number
): Promise<ApiWeatherForecast | ApiErrorMessage> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data: ApiWeatherForecast | ApiError = await response.json();
    if (data instanceof Object && "list" in data) return data;
    else return { errorMessage: "Check Internet connection" };
  } catch (e: unknown) {
    return { errorMessage: "unknown error" };
  }
}

export async function getCityPollutionById(
  lon: number,
  lat: number
): Promise<ApiAirPollution | ApiErrorMessage> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data: ApiAirPollution | ApiError = await response.json();
    if (data instanceof Object && "list" in data) return data;
    else return { errorMessage: "Check Internet connection" };
  } catch (e: unknown) {
    return { errorMessage: "unknown error" };
  }
}

export async function getCityWeatherByCoords(position: GeolocationPosition) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (e: unknown) {
      return { errorMessage: "unknown error" };
    }
}
//{ cod: "400", message: "wrong latitude" }