import classes from './DetailedDayForecast.module.scss';
import { CityInput } from '../CityInput/CityInput';
import { Preloader } from 'shared/ui/Preloader';
import { icons } from '../../shared/icons';
import { iconsDictionary } from 'shared/utils';

/**
 * @typedef {import('./types').DetailedDayForecastProps} Props
 */

/**
 * @function DetailedDayForecast
 * @param {Props} props
 * @returns {JSX.Element}
 */

export const DetailedDayForecast = (props) => {
  const iconName = iconsDictionary[props.apiData?.weather[0].icon];
  const Icon = icons[iconName];

  return props.apiData ? (
    <div className={classes.wrapper}>
      <div className={classes.main}>
        <span className={classes.degrees}>
          {Math.floor(props.apiData?.main.temp)}°
        </span>
        <span className={classes.conditions}>
          {props.apiData?.weather[0].description}
        </span>
        <Icon/>
      </div>
      <CityInput/>
      <div className={classes.additionalInfo}>
        <div className={classes.additionalInfoItem}>
          <p className={classes.additionalInfoData}>{props.apiData?.main.humidity}%</p>
          <p className={classes.additionalInfoDescription}>Humidity</p>
        </div>
        <div className={classes.additionalInfoItem}>
          <p className={classes.additionalInfoData}>
            {props.apiData?.main.pressure}kPa
          </p>
          <p className={classes.additionalInfoDescription}>Pressure</p>
        </div>
        <div className={classes.additionalInfoItem}>
          <p className={classes.additionalInfoData}>{props.apiData?.wind.speed}m/c</p>
          <p className={classes.additionalInfoDescription}>Wind</p>
        </div>
      </div>
    </div>
  ) : (
    <Preloader />
  );
};

