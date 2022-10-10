import type { PropsWithChildren } from 'react';
import { useMatch } from 'react-router-dom';

import styles from './Layout.module.css';
import Sidebar from './sidebar/Sidebar';

interface Props {}

function Layout(props: PropsWithChildren<Props>) {
  const { children } = props;
  const isViewer = useMatch('/view');

  return (
    <div className={styles.root} data-viewer={isViewer || undefined}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.mainInner}>{children}</div>
      </main>
    </div>
  );
}

export default Layout;
