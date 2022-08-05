import type { ReactNode } from 'react';
import { FiFileText, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { createSearchParams, Link, useSearchParams } from 'react-router-dom';
import { clear } from 'suspend-react';
import shallow from 'zustand/shallow';

import styles from './Sidebar.module.css';
import type { H5File } from './stores';
import { useStore } from './stores';

interface Props {
  toggleBtn: ReactNode;
}

function Sidebar(props: Props) {
  const { toggleBtn } = props;

  const { opened, removeFileAt } = useStore(
    ({ opened, removeFileAt }) => ({ opened, removeFileAt }),
    shallow
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const fileUrl = searchParams.get('file');

  function removeFile(file: H5File, index: number, isActive: boolean) {
    if (isActive) {
      // Select next or previous file
      const nextIndex = index < opened.length - 1 ? index + 1 : index - 1;
      setSearchParams(nextIndex >= 0 ? { file: opened[nextIndex].url } : {});
    }

    // Remove from store and evict from suspense cache
    removeFileAt(index);
    clear([file.url]);
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title} data-reveal>
        myHDF5
      </h1>
      <nav className={styles.nav} data-reveal>
        <Link
          className={styles.navItem}
          to="/"
          data-active={!fileUrl || undefined}
        >
          <FiPlusCircle className={styles.icon} />
          Open HDF5
        </Link>
        <h2 className={styles.heading}>Opened files</h2>
        {opened.length > 0 ? (
          opened.map((file, index) => {
            const { name, url } = file;
            const isActive = url === fileUrl;

            return (
              <Link
                key={url}
                className={styles.navItem}
                to={`/?${createSearchParams({ file: url }).toString()}`}
                data-active={isActive || undefined}
              >
                <FiFileText className={styles.icon} />
                <span className={styles.filename}>{name}</span>
                <button
                  className={styles.removeBtn}
                  type="button"
                  aria-label="Remove file"
                  onClick={(evt) => {
                    evt.preventDefault();
                    removeFile(file, index, isActive);
                  }}
                >
                  <FiTrash2 />
                </button>
              </Link>
            );
          })
        ) : (
          <p className={styles.hint}>To get started, please open a file</p>
        )}
      </nav>
      <div className={styles.footer}>
        {toggleBtn}
        <p className={styles.credits} data-reveal>
          Made by{' '}
          <a href="https://www.esrf.fr/" target="_blank" rel="noreferrer">
            ESRF
          </a>{' '}
          with{' '}
          <a href="https://www.panosc.eu/" target="_blank" rel="noreferrer">
            european&nbsp;funding
          </a>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
