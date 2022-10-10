import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import { useStore } from '../stores';
import styles from './SidebarToggle.module.css';

interface Props {
  isCollapsed: boolean;
  isDisabled: boolean;
}

function SidebarToggle(props: Props) {
  const { isCollapsed, isDisabled } = props;
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <button
      className={styles.btn}
      type="button"
      aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} sidebar`}
      disabled={isDisabled}
      onClick={() => toggleSidebar()}
    >
      {isCollapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
    </button>
  );
}

export default SidebarToggle;
