import type { FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import type { H5File } from './stores';
import { buildMailto } from './utils';

interface Props extends FallbackProps {
  file: H5File;
}

function ErrorFallback(props: Props) {
  const { error, file } = props;

  return (
    <div className={styles.root}>
      <p className={styles.error}>{error.message}</p>
      <a
        className={styles.reportBtn}
        target="_blank"
        rel="noreferrer"
        href={buildMailto(
          'Error report',
          `I encountered the following error on myHDF5: "${error.message}"`,
          file
        )}
      >
        Report error
      </a>
    </div>
  );
}

export default ErrorFallback;
