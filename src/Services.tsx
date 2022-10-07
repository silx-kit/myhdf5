import styles from './Services.module.css';
import LocalService from './services/LocalService';
import RemoteService from './services/RemoteService';

function Services() {
  return (
    <div className={styles.root}>
      <LocalService />
      <RemoteService />
    </div>
  );
}

export default Services;
