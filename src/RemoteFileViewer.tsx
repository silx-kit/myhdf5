import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';

import { fetchBuffer } from './fetch-utils';
import { getPlugin } from './plugin-utils';
import type { RemoteFile } from './stores';
import { buildMailto, FEEDBACK_MESSAGE, getExportURL } from './utils';

export const CACHE_KEY = Symbol('bufferFetcher');

interface Props {
  file: RemoteFile;
}

function RemoteFileViewer(props: Props) {
  const { file } = props;
  const { name, resolvedUrl } = file;

  const buffer = suspend(fetchBuffer, [resolvedUrl, CACHE_KEY]);

  return (
    <H5WasmProvider
      filename={name}
      buffer={buffer}
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
    </H5WasmProvider>
  );
}

export default RemoteFileViewer;
