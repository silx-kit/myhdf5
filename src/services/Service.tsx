import { type PropsWithChildren } from 'react';
import { type IconType } from 'react-icons';

import styles from '../Services.module.css';

interface Props {
  heading?: string;
  icon: IconType;
}

function Service(props: PropsWithChildren<Props>) {
  const { heading, icon: Icon, children } = props;

  return (
    <div className={styles.service}>
      <Icon className={styles.icon} />
      <div className={styles.content}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Service;
