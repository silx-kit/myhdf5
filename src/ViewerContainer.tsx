import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import { clear, suspend } from 'suspend-react';

import FileErrorFallback from './FileErrorFallback';
import LocalFileViewer from './LocalFileViewer';
import RemoteFileViewer, { FETCH_BUFFER_KEY } from './RemoteFileViewer';
import { FileService, useStore } from './stores';
import { resolveFileUrl } from './utils';

export const RESOLVE_FILE_URL_KEY = Symbol('resolveFileUrl');

interface Props {
  fileUrl: string;
}

function ViewerContainer(props: Props) {
  const { fileUrl } = props;

  const opened = useStore((state) => state.opened);
  const openFiles = useStore((state) => state.openFiles);

  const openedFile = opened.find(({ url }) => url === fileUrl);
  const fileToOpen = !openedFile
    ? suspend(resolveFileUrl, [fileUrl, RESOLVE_FILE_URL_KEY])
    : undefined;

  if (fileToOpen) {
    openFiles([fileToOpen]);
  }

  const file = openedFile || fileToOpen;
  if (!file) {
    return <Navigate to="/" />;
  }

  if (file.service === FileService.Local) {
    return <LocalFileViewer file={file} />;
  }

  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => (
        <FileErrorFallback file={file} {...fallbackProps} />
      )}
      resetKeys={[fileUrl]}
      onError={() => {
        clear([file.resolvedUrl, FETCH_BUFFER_KEY]); // clear suspend cache
      }}
    >
      <Suspense fallback={null}>
        <RemoteFileViewer file={file} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ViewerContainer;
