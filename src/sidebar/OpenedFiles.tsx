import type { IconType } from 'react-icons';
import {
  FiMonitor,
  FiGlobe,
  FiDownload,
  FiTrash2,
  FiGithub,
  FiGitlab,
} from 'react-icons/fi';
import { TbLetterZ } from 'react-icons/tb';
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { clear } from 'suspend-react';
import shallow from 'zustand/shallow';

import type { H5File } from '../stores';
import { FileService, useStore } from '../stores';
import { getViewerLink } from '../utils';
import sidebarStyles from './Sidebar.module.css';

const ICONS: Record<FileService, IconType> = {
  [FileService.Local]: FiMonitor,
  [FileService.Url]: FiGlobe,
  [FileService.GitHub]: FiGithub,
  [FileService.GitLab]: FiGitlab,
  [FileService.Zenodo]: TbLetterZ,
};

function OpenedFiles() {
  const { opened, removeFileAt } = useStore(
    ({ opened, removeFileAt }) => ({ opened, removeFileAt }),
    shallow
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('url');

  function removeFile(file: H5File, index: number, isActive: boolean) {
    if (isActive) {
      // Select next or previous file, or navigate back to homepage
      const nextIndex = index < opened.length - 1 ? index + 1 : index - 1;
      navigate(nextIndex >= 0 ? getViewerLink(opened[nextIndex].url) : '/');
    }

    // Remove from store and evict from suspense cache
    removeFileAt(index);
    clear([file.url]);
  }

  return (
    <>
      <h2 className={sidebarStyles.heading}>Opened files</h2>
      {opened.length > 0 ? (
        <ul className={sidebarStyles.navList}>
          {opened.map((file, index) => {
            const { url, name, service, resolvedUrl } = file;
            const isActive = url === fileUrl;
            const Icon = ICONS[service];

            return (
              <li key={url} className={sidebarStyles.navListItem}>
                <Link
                  key={url}
                  className={sidebarStyles.navItem}
                  to={`view?${createSearchParams({ url }).toString()}`}
                  title={url}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(evt) => {
                    // Remove focus so flyout can hide itself
                    evt.currentTarget.blur();
                  }}
                >
                  <Icon className={sidebarStyles.icon} />
                  <span className={sidebarStyles.label}>{name}</span>
                </Link>
                <div className={sidebarStyles.actionBtnGroup}>
                  <a
                    className={sidebarStyles.downloadBtn}
                    href={resolvedUrl}
                    title={resolvedUrl}
                    download={name}
                    aria-label="Download file"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(evt) => {
                      evt.stopPropagation();
                      evt.currentTarget.blur();
                    }}
                  >
                    <FiDownload />
                  </a>
                  <button
                    className={sidebarStyles.removeBtn}
                    type="button"
                    aria-label="Remove file"
                    onClick={(evt) => {
                      evt.preventDefault();
                      removeFile(file, index, isActive);
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={sidebarStyles.hint}>To get started, please open a file</p>
      )}
    </>
  );
}

export default OpenedFiles;
