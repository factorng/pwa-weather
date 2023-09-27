
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


// const mockedFetch = (data: any) =>
//   Promise.resolve({
//     json: () => Promise.resolve(data),
//   });
// const mockedFetchReject = () => Promise.reject({});

// describe("getCityWeatherById tests", () => {
//   test("getCityWeatherById returns data object", async () => {
//     global.fetch = jest.fn(() =>
//       mockedFetch(MOCK_DATA_CITY_WEATHER_BY_ID)
//     ) as jest.Mock;
//     const data = await getCityWeaterById(498817);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(fetch).toHaveBeenCalledWith(
//       expect.stringContaining(
//         "https://api.openweathermap.org/data/2.5/weather?id"
//       )
//     );
//     expect(data).toEqual({ main: {} });
//   });

//   test("getCityWeatherById returns error if fetch throws error", async () => {
//     global.fetch = jest.fn(() => mockedFetchReject()) as jest.Mock;
//     const data = await getCityWeaterById(498817);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(data).toEqual({ errorMessage: "unknown error" });
//   });

//   test("getCityWeatherById returns error if api sends error", async () => {
//     global.fetch = jest.fn(() =>
//       mockedFetch(MOCK_DATA_CITY_WEATHER_BY_ID_API_ERROR)
//     ) as jest.Mock;
//     const data = await getCityWeaterById(498817);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(data).toEqual({ errorMessage: "Check Internet connection" });
//   });
// });

// describe("getCityForecastById tests", () => {
//   test("getCityForecastById returns object with 'list' field", async () => {
//     global.fetch = jest.fn(() =>
//       mockedFetch(MOCK_DATA_CITY_FORECAST_BY_ID)
//     ) as jest.Mock;
//     const data = await getCityForecastById(498817);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(fetch).toHaveBeenCalledWith(
//       expect.stringContaining(
//         "https://api.openweathermap.org/data/2.5/forecast?id="
//       )
//     );
//     expect(data).toEqual({ list: {} });
//   });

//   test("getCityForecastById returns error if fetch throws error", async () => {
//     global.fetch = jest.fn(() =>
//       mockedFetch(MOCK_DATA_CITY_FORECAST_BY_ID_API_ERROR)
//     ) as jest.Mock;
//     const data = await getCityForecastById(498817);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(data).toEqual({ errorMessage: "Check Internet connection" });
//   });

//   test("getCityForecastById returns error if api sends error", async () => {
//     global.fetch = jest.fn(() => mockedFetchReject()) as jest.Mock;
//     const data = await getCityForecastById(498817);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(data).toEqual({ errorMessage: "unknown error" });
//   });
// });

// describe("getCityPollutionById tests", () => {
//   test("getCityPollutionById returns object with 'list' field", async () => {
//     global.fetch = jest.fn(() =>
//       mockedFetch(MOCK_DATA_CITY_POLLUTION_BY_ID)
//     ) as jest.Mock;
//     const data = await getCityPollutionById(1, 2);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(fetch).toHaveBeenCalledWith(
//       expect.stringContaining(
//         "https://api.openweathermap.org/data/2.5/air_pollution?lat="
//       )
//     );
//     expect(data).toEqual({ list: {} });
//   });

//   test("getCityPollutionById returns error if fetch throws error", async () => {
//     global.fetch = jest.fn(() =>
//       mockedFetch(MOCK_DATA_CITY_POLLUTION_BY_ID_API_ERROR)
//     ) as jest.Mock;
//     const data = await getCityPollutionById(1, 2);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(data).toEqual({ errorMessage: "Check Internet connection" });
//   });

//   test("getCityPollutionById returns error if api sends error", async () => {
//     global.fetch = jest.fn(() => mockedFetchReject()) as jest.Mock;
//     const data = await getCityPollutionById(1, 2);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(data).toEqual({ errorMessage: "unknown error" });
//   });
// });
