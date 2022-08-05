import type { ReactNode } from 'react';
import { FiFileText, FiPlusCircle } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './SidebarCollapsed.module.css';

interface Props {
  toggleBtn: ReactNode;
}

function SidebarCollapsed(props: Props) {
  const { toggleBtn } = props;

  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('file');

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <Link
          className={styles.navItem}
          to="/"
          data-active={!fileUrl || undefined}
          aria-label="Open HDF5"
        >
          <FiPlusCircle />
        </Link>
        <button
          type="button"
          className={styles.navBtn}
          data-active={!!fileUrl || undefined}
          aria-label="Opened files"
        >
          <FiFileText />
        </button>
      </nav>
      {toggleBtn}
    </div>
  );
}

export default SidebarCollapsed;
