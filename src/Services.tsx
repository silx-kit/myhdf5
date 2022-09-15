import styles from './Services.module.css';
import LocalService from './services/LocalService';
import UrlService from './services/UrlService';

function Services() {
  return (
    <div className={styles.root}>
      <LocalService />
      <UrlService />
    </div>
  );
}

export default Services;
