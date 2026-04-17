import {
  fetchZenodoFileUrl,
  toRawGithubUrl,
  toRawGitlabHref,
} from './services/utils';
import { FileService, type H5File, type RemoteFile } from './stores';

export function getViewerLink(href: string): string {
  const urlParam = new URLSearchParams({ url: href });
  return `/view?${urlParam.toString()}`;
}

function parseFilename(url: URL): string {
  const { pathname, hostname } = url;

  // Remove trailing slash if any, and take last path segment (or hostname if empty)
  const noTrail = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return noTrail === ''
    ? hostname
    : noTrail.slice(noTrail.lastIndexOf('/') + 1);
}

async function parseService(
  url: URL,
): Promise<Pick<RemoteFile, 'service' | 'resolvedUrl'>> {
  const { href, hostname, pathname } = url;

  if (hostname === 'raw.githubusercontent.com') {
    return { service: FileService.GitHub, resolvedUrl: href };
  }

  if (hostname === 'github.com') {
    return { service: FileService.GitHub, resolvedUrl: toRawGithubUrl(href) };
  }

  // Self-hosted GitLab repos generally have a subdomain containing the word `gitlab`
  if (hostname.includes('gitlab')) {
    return { service: FileService.GitLab, resolvedUrl: toRawGitlabHref(url) };
  }

  if (hostname === 'zenodo.org') {
    return {
      service: FileService.Zenodo,
      resolvedUrl: pathname.startsWith('/record')
        ? await fetchZenodoFileUrl(href)
        : href,
    };
  }

  return { service: FileService.Url, resolvedUrl: href };
}

export async function resolveFileUrl(
  fileUrl: string,
): Promise<RemoteFile | undefined> {
  let url;
  try {
    url = new URL(fileUrl);
  } catch {
    return undefined; // silence invalid URLs
  }

  // Filter out URLs with `blob:` protocol (i.e. local files) since we can't re-open them
  // Also ignore non-HTTPS protocols
  if (!url.protocol.startsWith('https')) {
    return undefined;
  }

  return {
    url: fileUrl,
    name: parseFilename(url),
    ...(await parseService(url)),
  };
}

const INTRO =
  'Please introduce yourself (name, organisation, scientific field, etc.)';

function getReportIntro(fileOrUrl?: H5File | string) {
  if (
    fileOrUrl &&
    typeof fileOrUrl !== 'string' &&
    fileOrUrl.service === FileService.Local
  ) {
    return `<<<
  1. ${INTRO}
  2. To help us understand the issue, please send us your HDF5 file (ideally via a file sharing service).
>>>`;
  }

  return `<<< ${INTRO} >>>`;
}

export function buildMailto(
  subject: string,
  message: string,
  fileOrUrl?: H5File | string,
  entityPath?: string,
): string {
  const body = `Hi,

${getReportIntro(fileOrUrl)}

${message}

Here is some additional context:

  - User agent: ${navigator.userAgent}
  - Location: ${globalThis.location.href}${
    typeof fileOrUrl === 'string'
      ? `
  - File URL: ${fileOrUrl}`
      : fileOrUrl
        ? `
  - File name: ${fileOrUrl.name}
  - File URL: ${fileOrUrl.url}
  - Service detected: ${fileOrUrl.service}
  - Resolved URL: ${fileOrUrl.resolvedUrl}`
        : ''
  }${
    entityPath
      ? `
  - Entity path: ${entityPath}`
      : ''
  }`;

  const params = new URLSearchParams({ subject: `[myHDF5] ${subject}`, body });
  const paramsStr = params.toString().replaceAll('+', '%20'); // use percent encoding for spaces to avoid issues with some email clients

  return `mailto:h5web@esrf.fr?${paramsStr}`;
}

export const FEEDBACK_MESSAGE = `<<
  Please replace this block with your feedback, and attach an HDF5 file if relevant.
  => To report an issue, please include screenshots, reproduction steps, etc.
  => To suggest a new feature, please describe the needs this feature would fulfill.
>>`;
