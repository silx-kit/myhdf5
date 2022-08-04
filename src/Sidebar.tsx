import { FiFileText, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { createSearchParams, NavLink, useSearchParams } from 'react-router-dom';

import styles from './Sidebar.module.css';
import { useStore } from './stores';

function Nav() {
  const opened = useStore((state) => state.opened);
  const removeFileAt = useStore((state) => state.removeFileAt);

  const [searchParams, setSearchParams] = useSearchParams();
  const fileUrl = searchParams.get('file');

  return (
    <>
      <h1 className={styles.title}>myHDF5</h1>
      <nav className={styles.nav}>
        <NavLink
          className={styles.navItem}
          to="/"
          data-active={!fileUrl || undefined}
        >
          <FiPlusCircle className={styles.icon} />
          Open HDF5
        </NavLink>
        <h2 className={styles.heading}>Opened files</h2>
        {opened.length > 0 ? (
          opened.map((file, index) => {
            const { name, url } = file;
            const isActive = url === fileUrl;

            return (
              <NavLink
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

                    if (isActive) {
                      // Select next or previous file
                      const nextIndex =
                        index < opened.length - 1 ? index + 1 : index - 1;
                      setSearchParams(
                        nextIndex >= 0 ? { file: opened[nextIndex].url } : {}
                      );
                    }

                    removeFileAt(index);
                  }}
                >
                  <FiTrash2 />
                </button>
              </NavLink>
            );
          })
        ) : (
          <p className={styles.hint}>To get started, please open a file</p>
        )}
      </nav>
    </>
  );
}

export default Nav;
