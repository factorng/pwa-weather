import styles from './Preloader.module.scss';

/**@typedef {import('./types').PreloadreProps} Props */

/**
 * @function Preloader
 * @returns {JSX.Element}
 */

export function Preloader() {
  return (
    <section className={styles['preloader']} data-testid="preloader">
      <i className={styles['circle-preloader']}></i>
    </section>
  );
}
