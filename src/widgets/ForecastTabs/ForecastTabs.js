/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import classes from './ForecastTabs.module.scss';
import { ForecastTab } from '../../features/ForecastTab';

/**
 * @typedef {import('./types').ForecastTabsProps} ForecastTabsProps
 */

/**
 * @typedef {import("shared/types/api-types").ApiWeatherNow} ApiWeatherNow
 */

export const ForecastTabs = (props) => {
  const { apiData } = props;
  const [dayToggle, setDayToggle] = useState('today');
  /**@type {[null | undefined | ApiWeatherNow[], Function]}*/
  const [todayForecast, setTodayForecast] = useState();

  const todayDate = new Date();
  const tommDate = new Date();
  tommDate.setDate(new Date().getDate() + 1);

  useEffect(() => {
    const todayForecast = apiData?.list.filter((day) => {
      day.dt_txt = day.dt_txt.replace(' ', 'T');
      const curDay = new Date(day.dt_txt).getDate();
      if (dayToggle === 'today') {
        return curDay === todayDate.getDate();
      } else {
        return curDay === tommDate.getDate();
      }
    });
    setTodayForecast(todayForecast);
  }, [apiData, dayToggle]);

  return (
    <div className={classes.timeForecast}>
      <div>
        <button
          onClick={() => setDayToggle('today')}
          className={classNames(classes.timeForecastButton, {
            [classes.timeForecastButtonInactive]: dayToggle !== 'today',
          })}>
            Today
        </button>
        <button
          onClick={() => setDayToggle('tomorrow')}
          className={classNames(classes.timeForecastButton, {
            [classes.timeForecastButtonInactive]: dayToggle !== 'tomorrow',
          })}>
            Tomorrow
        </button>
      </div>
      {todayForecast && (
        <ForecastTab dayToggle={dayToggle} todayForecast={todayForecast} />
      )}
    </div>
  );
};

