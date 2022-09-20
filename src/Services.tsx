import styles from './Services.module.css';
import GithubService from './services/GithubService';
import LocalService from './services/LocalService';
import UrlService from './services/UrlService';

function Services() {
  return (
    <div className={styles.root}>
      <LocalService />
      <GithubService />
      <UrlService />
    </div>
  );
}

export default Services;
