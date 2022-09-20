interface ZenodoApiResponse {
  files: {
    key: string; // filename
    links: { self: string }; // URL
  }[];
}

export function toRawGithubUrl(githubUrl: string): string {
  return githubUrl
    .replace(/^https?:\/\/github.com/u, 'https://raw.githubusercontent.com')
    .replace('/blob/', '/')
    .replace('?raw=true', '');
}

export async function fetchZenodoFileUrl(downloadUrl: string): Promise<string> {
  const match = /\/record\/([0-9]+)\/files\/([^?]+)/u.exec(downloadUrl);
  if (!match) {
    throw new Error('Zenodo URL not recognised');
  }

  const [, record, filename] = match;
  const response = await fetch(`https://zenodo.org/api/records/${record}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { files } = (await response.json()) as ZenodoApiResponse;

  const file = files.find(({ key }) => key === filename);
  if (!file) {
    throw new Error('File not found');
  }

  return file.links.self;
}
