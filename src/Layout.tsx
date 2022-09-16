import type { PropsWithChildren } from 'react';
import { useMatch } from 'react-router-dom';

import styles from './Layout.module.css';
import Sidebar from './Sidebar';
import SidebarCollapsed from './SidebarCollapsed';
import SidebarToggle from './SidebarToggle';
import { useStore } from './stores';

interface Props {}

function Layout(props: PropsWithChildren<Props>) {
  const { children } = props;

  const isViewingFile = !!useMatch('/view');
  const sidebarMayCollapse = useStore((state) => state.sidebarMayCollapse);
  const isSidebarCollapsed = sidebarMayCollapse && isViewingFile;
  const SidebarComponent = isSidebarCollapsed ? SidebarCollapsed : Sidebar;

  return (
    <div className={styles.root}>
      <div
        className={styles.sidebar}
        data-collapsed={isSidebarCollapsed || undefined}
      >
        <div className={styles.sidebarInner}>
          <SidebarComponent
            toggleBtn={
              <SidebarToggle
                isCollapsed={isSidebarCollapsed}
                isDisabled={!isViewingFile}
              />
            }
          />
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.mainInner}>{children}</div>
      </main>
    </div>
  );
}

export default Layout;
