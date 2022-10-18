import { Link } from 'react-router-dom';

import { UNSTABLE_URL_REGEX } from './services/RemoteService';
import { getViewerLink } from './utils';

interface Props {
  message: string;
  resolvedUrl: string;
}

function HttpErrorMessage(props: Props) {
  const { message, resolvedUrl } = props;

  if (message.startsWith('400')) {
    return <p>The URL of the file might be wrong or incomplete.</p>;
  }

  if (message.startsWith('401')) {
    return (
      <p>
        Authentication is required to access this file. myHDF5 can only open
        files that are available publicly.
      </p>
    );
  }

  if (message.startsWith('404')) {
    return UNSTABLE_URL_REGEX.test(resolvedUrl) ? (
      <p>
        You seem to have provided a repository URL pointing to a development
        branch. Perhaps the file has moved? Try using a permalink instead.
      </p>
    ) : (
      <p>
        The URL of the file might be wrong or the file might no longer exist at
        this URL.
      </p>
    );
  }

  if (message.startsWith('418')) {
    return (
      <p>
        Try opening{' '}
        <Link to={getViewerLink('https://www.silx.org/pub/h5web/teabag.h5')}>
          this file
        </Link>{' '}
        instead.
      </p>
    );
  }

  return null;
}

export default HttpErrorMessage;
