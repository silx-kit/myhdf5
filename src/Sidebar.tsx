import { createSearchParams, Link } from 'react-router-dom';

import styles from './Sidebar.module.css';
import { useStore } from './stores';

function Nav() {
  const opened = useStore((state) => state.opened);

  return (
    <div>
      <header>
        <h1>myHDF5</h1>
      </header>
      <nav>
        <Link to="/">Open HDF5</Link>
        <h2>Opened files</h2>
        {opened.length > 0 ? (
          opened.map((file) => {
            const { name, url } = file;
            return (
              <Link
                key={url}
                className={styles.navItem}
                to={`/?${createSearchParams({ file: url }).toString()}`}
              >
                {name}
              </Link>
            );
          })
        ) : (
          <p>Open a file to get started</p>
        )}
      </nav>
    </div>
  );
}

export default Nav;
