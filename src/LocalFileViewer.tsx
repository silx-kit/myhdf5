import { App } from '@h5web/app';
import { H5WasmLocalFileProvider } from '@h5web/h5wasm';
import { ErrorBoundary } from 'react-error-boundary';

import FileErrorFallback from './FileErrorFallback';
import { getPlugin } from './plugin-utils';
import { type LocalFile } from './stores';
import { buildMailto, FEEDBACK_MESSAGE } from './utils';

interface Props {
  file: LocalFile;
}

function LocalFileViewer(props: Props) {
  const { file } = props;
  const { resolvedUrl, file: rawFile } = file;

  return (
    <H5WasmLocalFileProvider file={rawFile} getPlugin={getPlugin}>
      <ErrorBoundary
        fallbackRender={(fallbackProps) => (
          <FileErrorFallback file={file} {...fallbackProps} />
        )}
        resetKeys={[file]}
      >
        <App
          key={resolvedUrl}
          disableDarkMode
          propagateErrors
          getFeedbackURL={({ entityPath }) => {
            return buildMailto('Feedback', FEEDBACK_MESSAGE, file, entityPath);
          }}
        />
      </ErrorBoundary>
    </H5WasmLocalFileProvider>
  );
}

export default LocalFileViewer;
