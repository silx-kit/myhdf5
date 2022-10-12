export const NETWORK_ERROR = 'Network Error';

export async function fetchBuffer(url: string): Promise<ArrayBuffer> {
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

  return response.arrayBuffer();
}
