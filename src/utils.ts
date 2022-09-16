import type { H5File } from './stores';
import { FileService } from './stores';

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
