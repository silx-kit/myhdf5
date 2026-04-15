import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { NETWORK_ERROR } from './fetch-utils';
import HttpErrorMessage from './HttpErrorMessage';
import { type H5File } from './stores';
import { buildMailto } from './utils';

interface Props extends FallbackProps {
  file: H5File;
}

function FileErrorFallback(props: Props) {
  const { error, file, resetErrorBoundary } = props;
  const msg = error instanceof Error ? error.message : 'Unknown error';

  return (
    <div className={styles.root}>
      <div className={styles.error}>
        {msg === NETWORK_ERROR ? (
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
            <p>{msg}</p>
            <HttpErrorMessage message={msg} resolvedUrl={file.resolvedUrl} />
          </>
        )}
      </div>

      {msg === NETWORK_ERROR && (
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
          `I encountered the following error on myHDF5: "${msg}"`,
          file,
        )}
      >
        Report error
      </a>
      <button
        className={styles.btn}
        type="button"
        onClick={() => resetErrorBoundary()}
      >
        Retry
      </button>

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
          This information is automatically included in the error report.
        </p>
      </details>
    </div>
  );
}

export default FileErrorFallback;
