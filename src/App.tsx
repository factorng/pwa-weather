import React, { useEffect, useState } from "react";
import "./App.scss";
import {
  getCityForecastById,
  getCityPollutionById,
  getCityWeaterById,
} from "./utils/api";
import {
  ApiWeatherNow,
  ApiErrorMessage,
  ApiWeatherForecast,
  ApiAirPollution,
  Coordinates,
  CityList,
  CityListItem,
} from "./types/api-types";
import DetailedDayForecast from "./components/DetailedDayForecast";
import ForecastTabs from "./components/ForecastTabs";
import AirPollution from "./components/AirPollution";
import data from "./assets/city.json";
import InstallAndroidButton from "./components/InstallAndroidButton";
import useDeviceInfo from "./hooks/useDeviceInfo";
import InstallPopupIOS from "./components/InstallPopupIOS";

function App() {
  const cityList: CityList = Array.from(JSON.parse(JSON.stringify(data)));
  const [todayWeather, setTodayWeather] = useState<ApiWeatherNow | undefined>();
  const [forecastWeather, setForecastWeather] = useState<
    ApiWeatherForecast | undefined
  >();
  const [airPollution, setAirPollution] = useState<ApiAirPollution>();
  const [cityCoords, setCityCoords] = useState<Coordinates | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<ApiErrorMessage | undefined>(
    undefined
  );
  const [searchHints, setSearchHints] = useState<CityList>([]);
  const [cityId, setCityId] = useState<number>(498817);

  const isIOSdevice = useDeviceInfo();

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCityIdByGeolocation, () =>
        console.log("error geo api")
      );
    } else {
      console.log("Geolocation not supported");
    }
  }

  function getCityIdByGeolocation(position: GeolocationPosition) {
    const lat = Number(position.coords.latitude).toFixed(1);
    const lon = Number(position.coords.longitude).toFixed(1);
    const citiesIdByCoord = cityList.filter((city: CityListItem) => {
      return (
        Number(city.coord.lat).toFixed(1) === lat &&
        Number(city.coord.lon).toFixed(1) === lon
      );
    });
    if (citiesIdByCoord.length) setCityId(citiesIdByCoord[0].id);
  }

  const onInput = (searchString: string) => {
    const hints = cityList.filter((city: CityListItem) =>
      city.name.toLowerCase().startsWith(searchString)
    );
    setSearchHints(hints);
  };
  const onHintClick = (id: number) => {
    setCityId(id);
    setSearchHints([]);
  };

  useEffect(() => {
    async function getForecasts() {
      const detailedForecast = await getCityWeaterById(cityId);
      const timeForecast = await getCityForecastById(cityId);

      if ("errorMessage" in detailedForecast) {
        setErrorMessage(detailedForecast);
        return;
      } else setTodayWeather(detailedForecast);

      if ("errorMessage" in timeForecast) {
        setErrorMessage(timeForecast);
        return;
      } else setForecastWeather(timeForecast);
      setCityCoords(detailedForecast.coord);
    }

    cityId && getForecasts();
  }, [cityId]);

  useEffect(() => {
    async function fetchData() {
      if (cityCoords) {
        const data = await getCityPollutionById(cityCoords.lon, cityCoords.lat);
        if (data && "errorMessage" in data) {
          setErrorMessage(data);
          return;
        } else setAirPollution(data);
      }
    }

    fetchData();
  }, [cityCoords]);

  return (
    <div className="App">
      <InstallAndroidButton />
      {isIOSdevice && <InstallPopupIOS />}
      <header className="App-header">
        {errorMessage ? (
          errorMessage.errorMessage
        ) : (
          <>
            <DetailedDayForecast
              apiData={todayWeather}
              onInput={onInput}
              searchHints={searchHints}
              onHintClick={onHintClick}
              handleLocationClick={handleLocationClick}
            />
            <ForecastTabs apiData={forecastWeather} />
            <AirPollution data={airPollution} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
