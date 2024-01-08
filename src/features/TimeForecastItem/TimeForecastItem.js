import { icons } from '../../shared/icons';
import { iconsDictionary } from 'shared/utils/iconsDictionary';
import classes from './TimeForecastItem.module.scss';

/**@typedef {import('./types').TimeForecastItemProps} Props*/

/**
 * @function TimeForecastItem
 * @param {Props} props
 * @returns
 */

export const TimeForecastItem = (props) => {
  const iconName = iconsDictionary[props.forecast?.weather[0].icon];
  const Icon = icons[iconName];
  return (
    <div className={classes.itemForecast} key={props.timePeriod}>
      <div className={classes.itemForecastIcon}>
        <Icon/>
      </div>
      <p className={classes.itemForecastTemp}>
        {Math.floor(props.forecast.main.temp)}°
      </p>
      <p className={classes.itemForecastPeriod}>{props.timePeriod}</p>
    </div>
  );
};

