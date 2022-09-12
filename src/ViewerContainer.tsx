import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';

import Viewer from './Viewer';
import type { H5File } from './stores';
import { FileService } from './stores';
import { useStore } from './stores';

interface Props {
  fileUrl: string;
}

function parseFileUrl(fileUrl: string): H5File | undefined {
  let url;
  try {
    url = new URL(fileUrl);
  } catch {
    return undefined; // silence invalid URLs
  }

  // Filter out URLs with `blob:` protocol (i.e. local files) since we can't re-open them
  // Also ignore non-HTTP protocols
  if (!url.protocol.startsWith('http')) {
    return undefined;
  }

  // Construct filename from pathname by removing trailing slash and taking last path segment (or hostname if empty)
  const { pathname, hostname } = url;
  const noTrail = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const filename =
    noTrail === '' ? hostname : noTrail.slice(noTrail.lastIndexOf('/') + 1);

  return { name: filename, url: fileUrl, service: FileService.Url };
}

function ViewerContainer(props: Props) {
  const { fileUrl } = props;

  const opened = useStore((state) => state.opened);
  const openFiles = useStore((state) => state.openFiles);

  const openedFile = opened.find(({ url }) => url === fileUrl);
  const file = openedFile || parseFileUrl(fileUrl);

  useEffect(() => {
    if (file && !openedFile) {
      openFiles([file]);
    }
  }, [file, openedFile, openFiles]);

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
