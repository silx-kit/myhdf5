import { FiFileText, FiHelpCircle, FiPlusCircle } from 'react-icons/fi';
import { NavLink, useMatch } from 'react-router-dom';

import OpenedFiles from './OpenedFiles';
import OpenedFilesFlyout from './OpenedFilesFlyout';
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
        <h1 className={styles.logo} data-reveal>
          myHDF<span>5</span>
        </h1>
        <nav className={styles.nav} data-reveal>
          <NavLink
            className={styles.mainNavItem}
            to="/"
            aria-label="Open HDF5"
            title="Open HDF5"
            data-primary
          >
            <FiPlusCircle className={styles.icon} />
            <span className={styles.label}>Open HDF5</span>
          </NavLink>

          <NavLink
            className={styles.mainNavItem}
            to="help"
            aria-label="Help"
            title="Help"
          >
            <FiHelpCircle className={styles.icon} />
            <span className={styles.label}>Help</span>
          </NavLink>

          {isCollapsed ? (
            <div className={styles.flyoutWrapper}>
              <button
                type="button"
                className={styles.flyoutBtn}
                aria-label="Opened files"
                aria-current="true"
              >
                <FiFileText />
              </button>
              <OpenedFilesFlyout />
            </div>
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
            <a href="https://www.panosc.eu/" target="_blank" rel="noreferrer">
              PaNOSC
            </a>{' '}
            at&nbsp;
            <a href="https://www.esrf.fr/" target="_blank" rel="noreferrer">
              ESRF
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
