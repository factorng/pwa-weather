import { useEffect, useState } from 'react';
import {
  getCityForecastById,
  getCityPollutionById,
  getCityWeaterById,
} from '../shared/api';
import { DetailedDayForecast } from '../widgets/DetailedDayForecast';
import { ForecastTabs } from '../widgets/ForecastTabs/ForecastTabs';
import { AirPollution } from '../widgets/AirPollution/AirPollution';
import { PopupInstallApp } from 'widgets/PopupInstallApp';
import { useWeather } from '../shared/hooks/useWeather';
import './App.scss';

/**@typedef {import('../shared/types/api-types').Coordinates} Coordinates */
/**@typedef {import('../shared/types/api-types').ApiError} ApiError */
/**@typedef {import('../shared/types/api-types').ApiWeatherNow} ApiWeatherNow */
/**@typedef {import('../shared/types/api-types').AirPollution} AirPollution */

export function App() {
  const [todayWeather, setTodayWeather] = useState();
  /** @type{[null | undefined | ApiWeatherNow, Function]} */
  const [forecastWeather, setForecastWeather] = useState();
  /** @type {[null | undefined | AirPollution ,Function]}*/
  const [airPollution, setAirPollution] = useState();
  /** @type{[null | undefined | Coordinates ,Function]}*/
  const [cityCoords, setCityCoords] = useState();
  /** @type{[null | undefined | ApiError, Function]} */
  const [errorMessage, setErrorMessage] = useState();

  const cityId = useWeather((state) => state.cityId);
  const setCityName = useWeather((state) => state.setCityName);

  useEffect(() => {
    forecastWeather?.city.name && setCityName(forecastWeather?.city.name);
  }, [forecastWeather]);

  useEffect(() => {
    (async () => {
      const detailedForecast = await getCityWeaterById(cityId);
      const timeForecast = await getCityForecastById(cityId);
      if ('errorMessage' in detailedForecast) {
        setErrorMessage(detailedForecast);
        return;
      } else {
        setTodayWeather(detailedForecast);
      }

      if ('errorMessage' in timeForecast) {
        setErrorMessage(timeForecast);
        return;
      } else {
        setForecastWeather(timeForecast);
        setCityCoords(detailedForecast.coord);
      }
    })();
  }, [cityId]);

  useEffect(() => {
    (async () => {
      if (cityCoords) {
        const data = await getCityPollutionById(cityCoords.lon, cityCoords.lat);
        if (data && 'errorMessage' in data) {
          setErrorMessage(data);
          return;
        } else { setAirPollution(data); }
      }
    })();
  }, [cityCoords]);

  return !errorMessage ? (
    <div className="App">
      <header className="App-header">
        <DetailedDayForecast
          apiData={todayWeather}
        />
        <ForecastTabs apiData={forecastWeather} />
        <AirPollution data={airPollution} />
        <PopupInstallApp />
      </header>
    </div>
  )  :  (
    <div className="App">
      {errorMessage.message}
    </div>
  );
}


