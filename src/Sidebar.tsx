import { FiFileText, FiPlusCircle } from 'react-icons/fi';
import { createSearchParams, NavLink, useSearchParams } from 'react-router-dom';

import styles from './Sidebar.module.css';
import { useStore } from './stores';

function Nav() {
  const opened = useStore((state) => state.opened);

  const [searchParams] = useSearchParams();
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
          opened.map((file) => {
            const { name, url } = file;

            return (
              <NavLink
                key={url}
                className={styles.navItem}
                to={`/?${createSearchParams({ file: url }).toString()}`}
                data-active={url === fileUrl || undefined}
              >
                <FiFileText className={styles.icon} />
                {name}
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
