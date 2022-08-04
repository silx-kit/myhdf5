import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';

import type { H5File } from './stores';

async function fetcher(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  return response.arrayBuffer();
}

function Viewer(props: H5File) {
  const { name, url } = props;
  const buffer = suspend(fetcher, [url]);

  return (
    <H5WasmProvider filename={name} buffer={buffer}>
      <App key={url} />
    </H5WasmProvider>
  );
}

export default Viewer;
