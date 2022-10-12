import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';

import { fetchBuffer } from './fetch-utils';
import type { H5File } from './stores';
import { buildMailto, FEEDBACK_MESSAGE } from './utils';

const CACHE_KEY = Symbol('bufferFetcher');

interface Props {
  file: H5File;
}

function Viewer(props: Props) {
  const { file } = props;
  const { name, resolvedUrl } = file;

  const buffer = suspend(fetchBuffer, [resolvedUrl, CACHE_KEY]);

  return (
    <H5WasmProvider filename={name} buffer={buffer}>
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

export default Viewer;
