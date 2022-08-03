import type { PropsWithChildren } from 'react';

import styles from './Layout.module.css';
import Sidebar from './Sidebar';

interface Props {}

function Layout(props: PropsWithChildren<Props>) {
  const { children } = props;

  return (
    <div className={styles.root}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
