import type { PropsWithChildren } from 'react';
import type { IconType } from 'react-icons';

import styles from '../Services.module.css';

interface Props {
  icon: IconType;
}

function Service(props: PropsWithChildren<Props>) {
  const { icon: Icon, children } = props;

  return (
    <div className={styles.service}>
      <Icon className={styles.serviceIcon} />
      <div className={styles.serviceContent}>{children}</div>
    </div>
  );
}

export default Service;
