import { FiFileText, FiHelpCircle, FiPlusCircle } from 'react-icons/fi';
import { NavLink, useMatch } from 'react-router-dom';

import OpenedFiles from './OpenedFiles';
import styles from './Sidebar.module.css';
import SidebarToggle from './SidebarToggle';
import { useStore } from './stores';

function Sidebar() {
  const isViewingFile = !!useMatch('/view');
  const mayCollapse = useStore((state) => state.sidebarMayCollapse);
  const isCollapsed = mayCollapse && isViewingFile;

  return (
    <div className={styles.sidebar} data-collapsed={isCollapsed || undefined}>
      <div className={styles.sidebarInner}>
        <h1 className={styles.title} data-reveal>
          myHDF5
        </h1>
        <nav className={styles.nav} data-reveal>
          <NavLink
            className={styles.navItem}
            to="/"
            aria-label="Open HDF5"
            title="Open HDF5"
            data-primary
          >
            <FiPlusCircle className={styles.icon} />
            <span className={styles.label}>Open HDF5</span>
          </NavLink>

          <NavLink
            className={styles.navItem}
            to="help"
            aria-label="Help"
            title="Help"
          >
            <FiHelpCircle className={styles.icon} />
            <span className={styles.label}>Help</span>
          </NavLink>

          {isCollapsed ? (
            <button
              type="button"
              className={styles.navBtn}
              aria-current={isViewingFile ? 'page' : undefined}
              aria-label="Opened files"
            >
              <FiFileText />
            </button>
          ) : (
            <OpenedFiles />
          )}
        </nav>

        <div className={styles.footer}>
          <SidebarToggle
            isCollapsed={isCollapsed}
            isDisabled={!isViewingFile}
          />
          <p className={styles.credits} data-reveal>
            Made by{' '}
            <a href="https://www.esrf.fr/" target="_blank" rel="noreferrer">
              ESRF
            </a>{' '}
            with{' '}
            <a href="https://www.panosc.eu/" target="_blank" rel="noreferrer">
              European&nbsp;funding
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
