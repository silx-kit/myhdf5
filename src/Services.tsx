import { useSearchParams } from 'react-router-dom';

import styles from './Services.module.css';
import ViewerContainer from './ViewerContainer';
import LocalService from './services/LocalService';
import UrlService from './services/UrlService';

function Services() {
  const [searchParams] = useSearchParams();

  const fileUrl = searchParams.get('file');

  if (fileUrl === null) {
    return (
      <div className={styles.root}>
        <LocalService />
        <UrlService />
      </div>
    );
  }

  return <ViewerContainer fileUrl={fileUrl} />;
}

export default Services;
