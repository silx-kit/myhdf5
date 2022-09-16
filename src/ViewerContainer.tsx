import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, useSearchParams } from 'react-router-dom';

import Viewer from './Viewer';
import { useStore } from './stores';
import { parseFileUrl } from './utils';

function ViewerContainer() {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('url');

  const opened = useStore((state) => state.opened);
  const openFiles = useStore((state) => state.openFiles);

  const openedFile = opened.find(({ url }) => url === fileUrl);
  const fileToOpen = !openedFile && fileUrl ? parseFileUrl(fileUrl) : undefined;

  useEffect(() => {
    if (fileToOpen) {
      openFiles([fileToOpen]);
    }
  }, [fileToOpen, openFiles]);

  const file = openedFile || fileToOpen;
  if (!file) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary fallback={<p>Error</p>} resetKeys={[fileUrl]}>
      <Suspense fallback={null}>
        <Viewer file={file} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ViewerContainer;
