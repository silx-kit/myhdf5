export const NETWORK_ERROR = 'Network Error';

export async function safeFetch(url: string): Promise<Response> {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(NETWORK_ERROR);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}`, {
      cause: new Error(text),
    });
  }

  return response;
}

export async function fetchBuffer(url: string): Promise<ArrayBuffer> {
  const response = await safeFetch(url);
  return response.arrayBuffer();
}
