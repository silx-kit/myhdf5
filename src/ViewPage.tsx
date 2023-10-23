import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, useSearchParams } from 'react-router-dom';

import ResolutionErrorFallback from './ResolutionErrorFallback';
import ViewerContainer from './ViewerContainer';

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
    >
      <Suspense fallback={null}>
        <ViewerContainer fileUrl={fileUrl} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ViewPage;
