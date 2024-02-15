import { useEffect } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { clear } from 'suspend-react';

import styles from './ErrorFallback.module.css';
import { NETWORK_ERROR } from './fetch-utils';
import { buildMailto } from './utils';
import { CACHE_KEY } from './ViewerContainer';

interface Props extends FallbackProps {
  fileUrl: string;
}

function ResolutionErrorFallback(props: Props) {
  const { error, fileUrl } = props;
  const { message } = error;

  useEffect(() => {
    clear([fileUrl, CACHE_KEY]); // clear suspend cache
  }, [fileUrl]);

  return (
    <div className={styles.root}>
      <div className={styles.error}>
        <p>{message}</p>
        {message === NETWORK_ERROR && (
          <p>
            Your Internet connection may be down, or you may be experiencing a{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
              target="_blank"
              rel="noreferrer"
            >
              cross-origin request
            </a>{' '}
            error.
          </p>
        )}
      </div>

      <a
        className={styles.btn}
        target="_blank"
        rel="noreferrer"
        href={buildMailto(
          'Error report',
          `I encountered the following error on myHDF5: "${error.message}"`, // eslint-disable-line @typescript-eslint/restrict-template-expressions
          fileUrl,
        )}
      >
        Report error
      </a>

      <details className={styles.debug}>
        <summary>Debug information</summary>
        <ul>
          <li>
            Provided URL:{' '}
            <a href={fileUrl} target="_blank" rel="noreferrer">
              {fileUrl}
            </a>
          </li>
        </ul>
        <p className={styles.hint}>
          This information is automatically included in the error report.
        </p>
      </details>
    </div>
  );
}

export default ResolutionErrorFallback;
