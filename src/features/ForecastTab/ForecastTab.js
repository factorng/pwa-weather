import { useEffect, useState } from 'react';
import { TimeForecastItem } from '../TimeForecastItem/TimeForecastItem';
import classes from './ForecastTab.module.scss';
import { DAY_TIME } from '../../shared/constants/constants';

/**@typedef {import('./types').ForecastTabProps} Props */

/**
 * @function ForecastTab
 * @param {Props} props
 * @returns {JSX.Element}
 */

export const ForecastTab = (props) => {
  const { dayToggle, todayForecast } = props;
  const [dailyForecastByPeriods, setDailyForecastByPeriods] =
    useState({});
  useEffect(() => {
    const forecastByPeriods = todayForecast?.reduce(
      (acc, el) => {
        if (acc) {
          switch (new Date(el.dt_txt).getHours()) {
            case DAY_TIME['MORNING']:
              if (acc['morning']) break;
              acc['morning'] = el;
              break;
            case DAY_TIME['AFTERNOON']:
              if (acc['afternoon']) break;
              acc['afternoon'] = el;
              break;
            case DAY_TIME['EVENING']:
              if (acc['evening']) break;
              acc['evening'] = el;
              break;
            case DAY_TIME['NIGHT']:
              if (acc['night']) break;
              acc['night'] = el;
              break;
          }
        }
        return acc;
      },
      {},
    );
    setDailyForecastByPeriods(forecastByPeriods);
  }, [todayForecast, dayToggle]);

  return (
    <div className={classes.timeForecastItems}>
      {dailyForecastByPeriods &&
        Object.entries(dailyForecastByPeriods).map(([timePeriod, forecast]) => (
          <TimeForecastItem
            timePeriod={timePeriod}
            forecast={forecast}
            key={timePeriod}
          />
        ))}
    </div>
  );
};

