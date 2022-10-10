import { useEventListener } from '@react-hookz/web';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import sidebarStyles from './Sidebar.module.css';

interface Props {}

function Flyout(props: PropsWithChildren<Props>) {
  const { children } = props;
  const [flyoutRef, setFlyoutRef] = useState<HTMLDivElement | null>(null);

  // Allow hovering flyout once its starts to appear
  // (i.e. when opened-files button is first hovered and opacity transition starts)
  useEventListener(flyoutRef, 'transitionstart', (evt: TransitionEvent) => {
    if (
      flyoutRef &&
      evt.target === flyoutRef &&
      window.getComputedStyle(flyoutRef).transitionDelay === '0s'
    ) {
      flyoutRef.style.pointerEvents = 'auto';
    }
  });

  // Prevent hovering flyout once flyout is fully hidden
  // (i.e. when user stops hovering flyout and opacity transition ends)
  useEventListener(flyoutRef, 'transitionend', (evt: TransitionEvent) => {
    if (
      flyoutRef &&
      evt.target === flyoutRef &&
      window.getComputedStyle(flyoutRef).transitionDelay !== '0s'
    ) {
      flyoutRef.style.pointerEvents = 'none';
    }
  });

  return (
    <div
      className={sidebarStyles.flyout}
      ref={(elem) => {
        if (elem) {
          setFlyoutRef(elem);
        }
      }}
    >
      <div className={sidebarStyles.flyoutInner}>{children}</div>
    </div>
  );
}

export default Flyout;
