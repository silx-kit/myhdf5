import styles from './Services.module.css';
import GithubService from './services/GithubService';
import LocalService from './services/LocalService';
import UrlService from './services/UrlService';
import ZenodoService from './services/ZenodoService';

function Services() {
  return (
    <div className={styles.root}>
      <LocalService />
      <GithubService />
      <ZenodoService />
      <UrlService />
    </div>
  );
}

export default Services;
