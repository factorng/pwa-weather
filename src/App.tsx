import React, { useEffect, useMemo, useState } from "react";
import "./App.scss";
import { Coordinates, CityList, CityListItem } from "./types/api-types";
import DetailedDayForecast from "./components/DetailedDayForecast";
import ForecastTabs from "./components/ForecastTabs";
import AirPollution from "./components/AirPollution";
import data from "./assets/city.json";
import InstallAndroidButton from "./components/InstallAndroidButton";
import useDeviceInfo from "./hooks/useDeviceInfo";
import InstallPopupIOS from "./components/InstallPopupIOS";

function App() {
  const cityList: CityList = useMemo(
    () => Array.from(JSON.parse(JSON.stringify(data))),
    []
  );
  const [cityCoords, setCityCoords] = useState<Coordinates | undefined>(
    undefined
  );
  const [searchHints, setSearchHints] = useState<CityList>([]);
  const [cityId, setCityId] = useState<number>(498817);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    errorMessage && alert(errorMessage);
  }, [errorMessage]);
  const isIOSdevice = useDeviceInfo();

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCityIdByGeolocation, () =>
        setErrorMessage("Turn on geolocation in your browser")
      );
    } else {
      setErrorMessage("Geolocation not supported");
    }
  }

  function getCityIdByGeolocation(position: GeolocationPosition) {
    const lat = Number(position.coords.latitude).toFixed(1);
    const lon = Number(position.coords.longitude).toFixed(1);
    const citiesIdByCoord = cityList.filter((city: CityListItem) => {
      return (
        Number(city?.coord?.lat).toFixed(1) === lat &&
        Number(city?.coord?.lon).toFixed(1) === lon
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
    //find city coords by id for air pollution
    const cityById = cityList.find((city: CityListItem) => city.id === cityId);
    cityById && setCityCoords(cityById.coord);
  }, [cityId, cityList]);

  return (
    <div className="App">
      <InstallAndroidButton />
      {isIOSdevice && <InstallPopupIOS />}
      <header className="App-header">
        <>
          <DetailedDayForecast
            cityId={cityId}
            onInput={onInput}
            searchHints={searchHints}
            onHintClick={onHintClick}
            handleLocationClick={handleLocationClick}
          />
          <ForecastTabs cityId={cityId} />
          <AirPollution cityCoords={cityCoords} />
        </>
      </header>
    </div>
  );
}

export default App;
