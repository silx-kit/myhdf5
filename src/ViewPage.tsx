import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, useSearchParams } from 'react-router-dom';
import { clear } from 'suspend-react';

import Loader from './Loader';
import ResolutionErrorFallback from './ResolutionErrorFallback';
import ViewerContainer, { RESOLVE_FILE_URL_KEY } from './ViewerContainer';

function ViewPage() {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('url');

  if (!fileUrl) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ResolutionErrorFallback fileUrl={fileUrl} {...props} />
      )}
      resetKeys={[fileUrl]}
      onError={() => {
        clear([fileUrl, RESOLVE_FILE_URL_KEY]); // clear suspend cache
      }}
    >
      <Suspense fallback={<Loader message="Processing file URL..." />}>
        <ViewerContainer fileUrl={fileUrl} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ViewPage;
