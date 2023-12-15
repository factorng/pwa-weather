import styles from './DetailedDayForecast.module.scss';
import { useImage } from '../../shared/hooks/useImage';
import { CityInput } from '../CityInput/CityInput';
import { Preloader } from '../../shared/ui/Preloader';

/**
 * @typedef {import('./types').DetailedDayForecastProps} Props
 */

/**
 * @function DetailedDayForecast
 * @param {Props} props
 * @returns JSX.Element
 */

export const DetailedDayForecast = (props) => {
  const { image } = useImage(props.apiData?.weather[0].icon);
  return props.apiData ? (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <span className={styles.degrees}>
          {Math.floor(props.apiData?.main.temp)}°
        </span>
        <span className={styles.conditions}>
          {props.apiData?.weather[0].description}
        </span>
        {image && (
          <img
            className={styles.weatherIcon}
            src={image}
            alt={props.apiData?.weather[0].description}
          />
        )}
      </div>
      <CityInput/>
      <div className={styles.additionalInfo}>
        <div className={styles.additionalInfoItem}>
          <p className={styles.additionalInfoData}>{props.apiData?.main.humidity}%</p>
          <p className={styles.additionalInfoDescription}>Humidity</p>
        </div>
        <div className={styles.additionalInfoItem}>
          <p className={styles.additionalInfoData}>
            {props.apiData?.main.pressure}kPa
          </p>
          <p className={styles.additionalInfoDescription}>Pressure</p>
        </div>
        <div className={styles.additionalInfoItem}>
          <p className={styles.additionalInfoData}>{props.apiData?.wind.speed}m/c</p>
          <p className={styles.additionalInfoDescription}>Wind</p>
        </div>
      </div>
    </div>
  ) : (
    <Preloader />
  );
};

