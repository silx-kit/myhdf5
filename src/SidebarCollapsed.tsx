import type { ReactNode } from 'react';
import { FiFileText, FiPlusCircle } from 'react-icons/fi';
import { NavLink, useSearchParams } from 'react-router-dom';

import styles from './SidebarCollapsed.module.css';

interface Props {
  toggleBtn: ReactNode;
}

function SidebarCollapsed(props: Props) {
  const { toggleBtn } = props;

  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('url');

  return (
    <>
      <nav className={styles.nav} data-reveal>
        <NavLink className={styles.navItem} to="/" aria-label="Open HDF5">
          <FiPlusCircle />
        </NavLink>
        <button
          type="button"
          className={styles.navBtn}
          aria-current={!!fileUrl || undefined}
          aria-label="Opened files"
        >
          <FiFileText />
        </button>
      </nav>
      {toggleBtn}
    </>
  );
}

export default SidebarCollapsed;
