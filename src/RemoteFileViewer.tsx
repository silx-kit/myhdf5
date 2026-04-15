import { App } from '@h5web/app';
import { H5WasmBufferProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';

import { fetchBuffer } from './fetch-utils';
import { getPlugin } from './plugin-utils';
import { type RemoteFile } from './stores';
import { buildMailto, FEEDBACK_MESSAGE } from './utils';

export const FETCH_BUFFER_KEY = Symbol('fetchBuffer');

interface Props {
  file: RemoteFile;
}

function RemoteFileViewer(props: Props) {
  const { file } = props;
  const { name, resolvedUrl } = file;

  const buffer = suspend(fetchBuffer, [resolvedUrl, FETCH_BUFFER_KEY]);

  return (
    <H5WasmBufferProvider filename={name} buffer={buffer} getPlugin={getPlugin}>
      <App
        key={resolvedUrl}
        disableDarkMode
        propagateErrors
        getFeedbackURL={({ entityPath }) => {
          return buildMailto('Feedback', FEEDBACK_MESSAGE, file, entityPath);
        }}
      />
    </H5WasmBufferProvider>
  );
}

export default RemoteFileViewer;
