import { FetchError, isFetchError } from './fetch';

interface Props {
  message: string;
}

function FetchErrorMessage(props: Props) {
  const { message } = props;

  if (!isFetchError(message)) {
    return <p>{message}</p>;
  }

  if (message === FetchError.NetworkError) {
    return (
      <>
        <p>File could not be fetched.</p>
        <p>
          Your Internet connection might be down. Otherwise, the hosting server
          you're trying to reach might not support{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
            target="_blank"
            rel="noreferrer"
          >
            cross-origin requests
          </a>{' '}
          (e.g. GitLab). If that's the case, try downloading the file and
          opening it as a local file instead.
        </p>
      </>
    );
  }

  return null;
}

export default FetchErrorMessage;
