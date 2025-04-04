import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import { suspend } from 'suspend-react';

import FileErrorFallback from './FileErrorFallback';
import LocalFileViewer from './LocalFileViewer';
import RemoteFileViewer from './RemoteFileViewer';
import { FileService, useStore } from './stores';
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
      fallbackRender={(fallbackProps) => (
        <FileErrorFallback file={file} {...fallbackProps} />
      )}
      resetKeys={[fileUrl]}
    >
      <Suspense fallback={null}>
        {file.service === FileService.Local ? (
          <LocalFileViewer file={file} />
        ) : (
          <RemoteFileViewer file={file} />
        )}
      </Suspense>
    </ErrorBoundary>
  );
}

export default ViewerContainer;
