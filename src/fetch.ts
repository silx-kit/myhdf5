export enum FetchError {
  NetworkError = 'Network Error',
}

const FETCH_ERRORS = new Set(Object.values<string>(FetchError));

export async function fetchBuffer(url: string): Promise<ArrayBuffer> {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(FetchError.NetworkError);
  }

  return response.arrayBuffer();
}

export function isFetchError(msg: string): msg is FetchError {
  return FETCH_ERRORS.has(msg);
}
