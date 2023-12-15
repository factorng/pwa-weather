import React from 'react';
import styles from './TimeForecastItem.module.scss';
import { useImage } from '../../shared/hooks/useImage';

/**@typedef {import('./types').TimeForecastItemProps} Props*/

/**
 * @function
 * @param {Props} props
 * @returns
 */

export const TimeForecastItem = ({ timePeriod, forecast }) => {
  const { image } = useImage(forecast?.weather[0].icon);
  return (
    <div className={styles.itemForecast} key={timePeriod}>
      {image && <img src={image} className={styles.itemForecastIcon} />}
      <p className={styles.itemForecastTemp}>
        {Math.floor(forecast.main.temp)}°
      </p>
      <p className={styles.itemForecastPeriod}>{timePeriod}</p>
    </div>
  );
};

