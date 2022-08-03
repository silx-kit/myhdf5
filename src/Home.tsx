import { Suspense } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { useDropzoneContext } from './Dropzone';
import Viewer from './Viewer';
import { useStore } from './stores';

function Home() {
  const [searchParams] = useSearchParams();
  const { openFilePicker } = useDropzoneContext();
  const opened = useStore((state) => state.opened);

  const fileUrl = searchParams.get('file');

  if (!fileUrl) {
    return (
      <>
        <button type="button" onClick={() => openFilePicker()}>
          Select HDF5 files
        </button>
        <p>or drop files here</p>
      </>
    );
  }

  const file = opened.find(({ url }) => url === fileUrl);

  if (!file) {
    return <Navigate to="/" />;
  }

  return (
    <Suspense fallback={null}>
      <Viewer {...file} />
    </Suspense>
  );
}

export default Home;
