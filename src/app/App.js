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
import { useStore } from 'store';
import './App.scss';

/**@typedef {import('../shared/types/api-types').Coordinates} Coordinates */
/**@typedef {import('../shared/types/api-types').ApiError} ApiError */

export function App() {
  const [todayWeather, setTodayWeather] = useState();
  const [forecastWeather, setForecastWeather] = useState();
  const [airPollution, setAirPollution] = useState();
  /** @type{[null | undefined | Coordinates ,Function]}*/
  const [cityCoords, setCityCoords] = useState();
  /** @type{[null | undefined | ApiError, Function]} */
  const [errorMessage, setErrorMessage] = useState();

  const cityId = useStore((state) => state.cityId);


  useEffect(() => {
    async function getForecasts() {
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
      } else { setForecastWeather(timeForecast); }
      setCityCoords(detailedForecast.coord);
    }

    getForecasts();
  }, [cityId]);

  useEffect(() => {
    async function fetchData() {
      if (cityCoords) {
        const data = await getCityPollutionById(cityCoords.lon, cityCoords.lat);
        if (data && 'errorMessage' in data) {
          setErrorMessage(data);
          return;
        } else { setAirPollution(data); }
      }
    }

    fetchData();
  }, [cityCoords]);

  return (
    <div className="App">
      <header className="App-header">
        {errorMessage ? (
          errorMessage.message
        ) : (
          <>
            <DetailedDayForecast
              apiData={todayWeather}
            />
            <ForecastTabs apiData={forecastWeather} />
            <AirPollution data={airPollution} />
            <PopupInstallApp/>
          </>
        )}
      </header>
    </div>
  );
}


