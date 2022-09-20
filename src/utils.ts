import type { FeedbackContext } from '@h5web/app';

import type { H5File } from './stores';
import { FileService } from './stores';

export function toRawGithubUrl(githubUrl: string): string {
  return githubUrl
    .replace(/^https?:\/\/github.com/u, 'https://raw.githubusercontent.com')
    .replace('/blob/', '/')
    .replace('?raw=true', '');
}

function parseFilename(url: URL): string {
  const { pathname, hostname } = url;

  // Remove trailing slash if any, and take last path segment (or hostname if empty)
  const noTrail = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return noTrail === ''
    ? hostname
    : noTrail.slice(noTrail.lastIndexOf('/') + 1);
}

function parseFileService(url: URL): FileService {
  const { href } = url;

  if (href.includes('raw.githubusercontent.com')) {
    return FileService.GitHub;
  }

  if (href.includes('zenodo.org/api')) {
    return FileService.Zenodo;
  }

  return FileService.Url;
}

export function parseFileUrl(fileUrl: string): H5File | undefined {
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

  return {
    url: fileUrl,
    name: parseFilename(url),
    service: parseFileService(url),
  };
}

export function getFeedbackMailto(context: FeedbackContext, file: H5File) {
  const { entityPath } = context;
  const { url, name, service } = file;

  const email = 'h5web@esrf.fr';
  const subject = 'myHDF5 feedback';

  const body = `Hi,

<<
   Please provide your feedback here:
   - To report an issue, please include screenshots, reproduction steps, etc.
   - To suggest a new feature, please describe the needs this feature would fulfill.
>>

Here is some additional context:

- User agent: ${navigator.userAgent}
- Location: ${window.location.href}
- File ${service === FileService.Local ? `name: ${name}` : `URL: ${url}`}
- Entity path: ${entityPath}

Thanks,
<< Name >>`;

  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
}
