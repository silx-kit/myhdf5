import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';

import type { H5File } from './stores';

async function fetcher(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  return response.arrayBuffer();
}

interface Props {
  file: H5File;
}

function Viewer(props: Props) {
  const { file } = props;
  const { name, url } = file;

  const buffer = suspend(fetcher, [url]);

  return (
    <H5WasmProvider filename={name} buffer={buffer}>
      <App key={url} />
    </H5WasmProvider>
  );
}

export default Viewer;
