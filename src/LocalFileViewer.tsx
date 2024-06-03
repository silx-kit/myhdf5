import { App } from '@h5web/app';
import { H5WasmLocalFileProvider } from '@h5web/h5wasm';

import { getPlugin } from './plugin-utils';
import type { LocalFile } from './stores';
import { buildMailto, FEEDBACK_MESSAGE, getExportURL } from './utils';

export const CACHE_KEY = Symbol('bufferFetcher');

interface Props {
  file: LocalFile;
}

function LocalFileViewer(props: Props) {
  const { file } = props;
  const { resolvedUrl, file: rawFile } = file;

  return (
    <H5WasmLocalFileProvider
      file={rawFile}
      getExportURL={getExportURL}
      getPlugin={getPlugin}
    >
      <App
        key={resolvedUrl}
        disableDarkMode
        propagateErrors
        getFeedbackURL={({ entityPath }) => {
          return buildMailto('Feedback', FEEDBACK_MESSAGE, file, entityPath);
        }}
      />
    </H5WasmLocalFileProvider>
  );
}

export default LocalFileViewer;
