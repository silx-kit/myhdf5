import { safeFetch } from '../fetch-utils';

interface ZenodoApiResponse {
  files: {
    key: string;
    links: { self: string }; // URL
  }[];
}

export function toRawGithubUrl(githubUrl: string): string {
  return githubUrl
    .replace('github.com', 'raw.githubusercontent.com')
    .replace('/blob/', '/')
    .replace('?raw=true', '');
}

export function toRawGitlabHref(gitlabUrl: URL): string {
  const rawUrl = new URL(gitlabUrl);
  rawUrl.pathname = gitlabUrl.pathname.replace('/blob/', '/raw/');
  rawUrl.search = '?inline=false';
  return rawUrl.href;
}

export async function fetchZenodoFileUrl(downloadUrl: string): Promise<string> {
  const match = /\/record\/([0-9]+)\/files\/([^?]+)/u.exec(downloadUrl);
  if (!match) {
    throw new Error('Zenodo record URL not recognised');
  }

  const [, record, filename] = match;
  const response = await safeFetch(`https://zenodo.org/api/records/${record}`);

  const { files } = (await response.json()) as ZenodoApiResponse;

  const file = files.find((f) => f.key === filename);
  if (!file) {
    throw new Error('File not found in Zenodo record');
  }

  if (!file.links.self) {
    throw new Error(`File download URL not found in Zenodo record`);
  }

  return file.links.self;
}

export function validateRequiredUrl(fileUrl: string) {
  if (!fileUrl) {
    return 'Please enter a URL';
  }

  let url;
  try {
    url = new URL(fileUrl);
  } catch {
    return 'Please enter a valid URL starting with https://';
  }

  if (url.protocol !== 'https:') {
    return 'The URL must start with https://';
  }

  return true;
}
