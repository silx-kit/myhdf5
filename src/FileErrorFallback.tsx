import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { FetchError, NetworkError } from './fetch-utils';
import HttpErrorMessage from './HttpErrorMessage';
import { type H5File } from './stores';
import { buildMailto } from './utils';

interface Props extends FallbackProps {
  file: H5File;
}

function FileErrorFallback(props: Props) {
  const { error, file, resetErrorBoundary } = props;

  const msg = error instanceof Error ? error.message : 'Unknown error';
  const cause = error instanceof Error ? error.cause : undefined;

  const causeMsg =
    cause && cause instanceof Error && cause.message !== msg
      ? cause.message
      : undefined;

  return (
    <div className={styles.root}>
      {causeMsg ? (
        <details className={styles.detailedError}>
          <summary>{msg}</summary>
          <pre>{causeMsg}</pre>
        </details>
      ) : error instanceof NetworkError ? (
        <div className={styles.error}>
          <p>File could not be fetched.</p>
          <p>
            Your Internet connection may be down, or you may be experiencing a{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
              target="_blank"
              rel="noreferrer"
            >
              cross-origin request
            </a>{' '}
            error. If&nbsp;that's the case, try downloading the file and opening
            it as a local file instead.
          </p>
        </div>
      ) : (
        <div className={styles.error}>
          <p>{msg}</p>
          {error instanceof FetchError && (
            <HttpErrorMessage status={error.status} fileUrl={file.url} />
          )}
        </div>
      )}

      {error instanceof NetworkError && (
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
          `I encountered the following error on myHDF5: "${msg}"${causeMsg ? ` — ${causeMsg}` : ''}`,
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
          <li>Service detected: {file.service}</li>
          <li>
            File URL:{' '}
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.url}
            </a>
          </li>
          {file.resolvedUrl !== file.url && (
            <li>
              Resolved URL:{' '}
              <a href={file.resolvedUrl} target="_blank" rel="noreferrer">
                {file.resolvedUrl}
              </a>
            </li>
          )}
        </ul>
        <p className={styles.hint}>
          This information is automatically included in the error report.
        </p>
      </details>
    </div>
  );
}

export default FileErrorFallback;
