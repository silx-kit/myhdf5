import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';

import type { H5File } from './stores';
import { buildMailto, bufferFetcher, FEEDBACK_MESSAGE } from './utils';

const CACHE_KEY = Symbol('bufferFetcher');

interface Props {
  file: H5File;
}

function Viewer(props: Props) {
  const { file } = props;
  const { name, resolvedUrl } = file;

  const buffer = suspend(bufferFetcher, [resolvedUrl, CACHE_KEY]);

  return (
    <H5WasmProvider filename={name} buffer={buffer}>
      <App
        key={resolvedUrl}
        disableDarkMode
        getFeedbackURL={({ entityPath }) => {
          return buildMailto('Feedback', FEEDBACK_MESSAGE, file, entityPath);
        }}
      />
    </H5WasmProvider>
  );
}

export default Viewer;
