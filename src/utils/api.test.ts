
import nock from 'nock';

import {
  getCityForecastById,
  getCityPollutionById,
  getCityWeaterById,
} from "./api";


const MOCK_DATA_CITY_WEATHER_BY_ID = { main: {} };
const MOCK_DATA_CITY_WEATHER_BY_ID_API_ERROR = { message: "error" };

const MOCK_DATA_CITY_FORECAST_BY_ID = { list: {} };
const MOCK_DATA_CITY_FORECAST_BY_ID_API_ERROR = { message: "error" };

const MOCK_DATA_CITY_POLLUTION_BY_ID = { list: {} };
const MOCK_DATA_CITY_POLLUTION_BY_ID_API_ERROR = { message: "error" };

beforeAll(() => {
  nock.disableNetConnect();
});

test("API key", () => {
  expect(process.env.REACT_APP_API_KEY).not.toBeUndefined();
});

describe("getCityWeatherById tests", () => {
  test('getCityWeatherById returns data object', async () => {
  nock(`https://api.openweathermap.org`)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get(`/data/2.5/weather`)
    .query({id: 0, units: 'metric', appid: process.env.REACT_APP_API_KEY})
    .reply(200, MOCK_DATA_CITY_WEATHER_BY_ID);

  const data = await getCityWeaterById(0);
  expect(data).toEqual(MOCK_DATA_CITY_WEATHER_BY_ID);
  });

  test("getCityWeatherById returns error if api sends error", async () => {
    nock(`https://api.openweathermap.org`)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
      .get(`/data/2.5/weather`)
      .query({id: 0, units: 'metric', appid: process.env.REACT_APP_API_KEY})
      .reply(200, MOCK_DATA_CITY_WEATHER_BY_ID_API_ERROR);

    const data = await getCityWeaterById(498817);
    expect(data).toEqual({ errorMessage: "unknown error" });
  });
});


describe("getCityForecastById tests", () => {
  test('getCityForecastById returns data object', async () => {
  nock(`https://api.openweathermap.org`)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get(`/data/2.5/forecast`)
    .query({id: 0, units: 'metric', appid: process.env.REACT_APP_API_KEY})
    .reply(200, MOCK_DATA_CITY_FORECAST_BY_ID);

  const data = await getCityForecastById(0);
  expect(data).toEqual(MOCK_DATA_CITY_FORECAST_BY_ID);
  });

  test("getCityForecastById returns error if api sends error", async () => {
    nock(`https://api.openweathermap.org`)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
      .get(`/data/2.5/weather`)
      .query({id: 0, units: 'metric', appid: process.env.REACT_APP_API_KEY})
      .reply(200, MOCK_DATA_CITY_FORECAST_BY_ID_API_ERROR);

    const data = await getCityForecastById(498817);
    expect(data).toEqual({ errorMessage: "unknown error" });
  });
});

describe("getCityPollutionById tests", () => {
  test('getCityPollutionById returns data object', async () => {
  nock(`https://api.openweathermap.org`)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get(`/data/2.5/air_pollution`)
    .query({lat: 0, lon: 0, units: 'metric', appid: process.env.REACT_APP_API_KEY})
    .reply(200, MOCK_DATA_CITY_POLLUTION_BY_ID);

  const data = await getCityPollutionById(0, 0);
  expect(data).toEqual(MOCK_DATA_CITY_POLLUTION_BY_ID);
  });

  test("getCityPollutionById returns error if api sends error", async () => {
    nock(`https://api.openweathermap.org`)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
      .get(`/data/2.5/weather`)
      .query({id: 0, units: 'metric', appid: process.env.REACT_APP_API_KEY})
      .reply(200, MOCK_DATA_CITY_POLLUTION_BY_ID_API_ERROR);

    const data = await getCityPollutionById(0, 0);
    expect(data).toEqual({ errorMessage: "unknown error" });
  });
});
