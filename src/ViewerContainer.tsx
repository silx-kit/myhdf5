import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import { suspend } from 'suspend-react';

import FileErrorFallback from './FileErrorFallback';
import Viewer from './Viewer';
import { useStore } from './stores';
import { resolveFileUrl } from './utils';

export const CACHE_KEY = Symbol('resolveFileUrl');

interface Props {
  fileUrl: string;
}

function ViewerContainer(props: Props) {
  const { fileUrl } = props;

  const opened = useStore((state) => state.opened);
  const openFiles = useStore((state) => state.openFiles);

  const openedFile = opened.find(({ url }) => url === fileUrl);
  const fileToOpen = !openedFile
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
      fallbackRender={(props) => <FileErrorFallback file={file} {...props} />}
      resetKeys={[fileUrl]}
    >
      <Suspense fallback={null}>
        <Viewer file={file} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ViewerContainer;
