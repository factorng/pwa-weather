import classNames from 'classnames';
import { Preloader } from '../../shared/ui/Preloader';
import classes from './AirPollution.module.scss';

/**
 * @typedef {import('./types').AirPollutionProps} Props
 */

/**
 * @function AirPollution
 * @param {Props} props
 * @returns JSX.Element
 */

export const AirPollution = (props) => {
  const { data } = props;
  return data ? (
    <div className={classes.wrapper}>
      <div className={classes.items}>
        <p className={classes.item}>
          Air quality index
          <span
            className={classNames(classes.itemData, {
              [classes.itemDataColorRed]: data.list[0].main.aqi > 4,
              [classes.itemDataColorGreen]: data.list[0].main.aqi <= 2,
              [classes.itemDataColorYellow]:
                data.list[0].main.aqi > 2 && data.list[0].main.aqi <= 4,
            })}>
            {data.list[0].main.aqi}
          </span>
        </p>
        <p className={classes.item}>
          PM2.5
          <span
            className={classNames(classes.itemData, {
              [classes.itemDataColorRed]: data.list[0].components.pm2_5 > 50,
              [classes.itemDataColorGreen]: data.list[0].components.pm2_5 < 10,
              [classes.itemDataColorYellow]:
                data.list[0].components.pm2_5 >= 10 &&
                data.list[0].components.pm2_5 <= 50,
            })}>
            {data.list[0].components.pm2_5}
          </span>
        </p>
        <p className={classes.item}>
          CO
          <span
            className={classNames(classes.itemData, {
              [classes.itemDataColorRed]: data.list[0].components.co > 12400,
              [classes.itemDataColorGreen]: data.list[0].components.co < 4400,
              [classes.itemDataColorYellow]:
                data.list[0].components.co >= 4400 &&
                data.list[0].components.co < 12400,
            })}>
            {data.list[0].components.co}
          </span>
        </p>
      </div>
    </div>
  ) : (
    <Preloader />
  );
};

