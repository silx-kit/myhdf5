import type { FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import HttpErrorMessage from './HttpErrorMessage';
import { NETWORK_ERROR } from './fetch-utils';
import type { H5File } from './stores';
import { buildMailto } from './utils';

interface Props extends FallbackProps {
  file: H5File;
}

function ErrorFallback(props: Props) {
  const { error, file } = props;
  const { message } = error;

  return (
    <div className={styles.root}>
      <div className={styles.error}>
        {message === NETWORK_ERROR ? (
          <>
            <p>File could not be fetched.</p>
            <p>
              Your Internet connection might be down. Otherwise, the hosting
              server you're trying to reach might not support{' '}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
                target="_blank"
                rel="noreferrer"
              >
                cross-origin requests
              </a>{' '}
              (e.g. GitLab). If that's the case, try downloading the file and
              opening it as a local file instead.
            </p>
          </>
        ) : (
          <>
            <p>{message}</p>
            <HttpErrorMessage
              message={message}
              resolvedUrl={file.resolvedUrl}
            />
          </>
        )}
      </div>

      {message === NETWORK_ERROR && (
        <a
          className={styles.btn}
          href={file.resolvedUrl}
          download="file.h5"
          target="_blank"
          rel="noreferrer"
        >
          Download file
        </a>
      )}
      <a
        className={styles.btn}
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

      <details className={styles.debug}>
        <summary>Debug information</summary>
        <ul>
          <li>
            Provided URL:{' '}
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.url}
            </a>
          </li>
          <li>
            Resolved URL:{' '}
            <a href={file.resolvedUrl} target="_blank" rel="noreferrer">
              {file.resolvedUrl}
            </a>
          </li>
          <li>Service detected: {file.service}</li>
        </ul>
        <p className={styles.hint}>
          These information are automatically included in the error report.
        </p>
      </details>
    </div>
  );
}

export default ErrorFallback;
