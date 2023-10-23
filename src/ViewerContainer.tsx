import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, useSearchParams } from 'react-router-dom';
import { suspend } from 'suspend-react';

import ErrorFallback from './ErrorFallback';
import Viewer from './Viewer';
import { useStore } from './stores';
import { resolveFileUrl } from './utils';

const CACHE_KEY = Symbol('resolveFileUrl');

function ViewerContainer() {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('url');

  const opened = useStore((state) => state.opened);
  const openFiles = useStore((state) => state.openFiles);

  const openedFile = opened.find(({ url }) => url === fileUrl);
  const fileToOpen =
    !openedFile && fileUrl
      ? suspend(resolveFileUrl, [fileUrl, CACHE_KEY])
      : undefined;

    if (fileToOpen) {
      openFiles([fileToOpen]);
    }

  const file = openedFile || fileToOpen;
  if (!file) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary
      fallbackRender={(props) => <ErrorFallback file={file} {...props} />}
      resetKeys={[fileUrl]}
    >
      <Suspense fallback={null}>
        <Viewer file={file} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ViewerContainer;
