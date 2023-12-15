const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = process.env.REACT_APP_API_KEY;

export async function getCityWeaterById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}weather?id=${id}&units=metric&appid=${API_KEY}`,
    );
    const data = await response.json();
    if (data instanceof Object && 'main' in data) return data;
    else return { errorMessage: 'Check Internet connection' };
  } catch (e) {
    return { errorMessage: 'unknown error' };
  }
}

export async function getCityForecastById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}forecast?id=${id}&units=metric&appid=${API_KEY}`,
    );
    const data = await response.json();
    if (data instanceof Object && 'list' in data) return data;
    else return { errorMessage: 'Check Internet connection' };
  } catch (e) {
    return { errorMessage: 'unknown error' };
  }
}

export async function getCityPollutionById(lon, lat) {
  try {
    const response = await fetch(
      `${BASE_URL}air_pollution?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    );
    const data = await response.json();
    if (data instanceof Object && 'list' in data) return data;
    else return { errorMessage: 'Check Internet connection' };
  } catch (e) {
    return { errorMessage: 'unknown error' };
  }
}
