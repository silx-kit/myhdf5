import { type AnchorHTMLAttributes } from 'react';
import { Link, type NavigationalProps, useRoute } from 'wouter';

interface Props {
  to: string;
}

function NavLink(
  props: Props & NavigationalProps & AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const { to, children, onClick, ...anchorProps } = props;
  const [isActive] = useRoute(to);

  return (
    <Link to={to} asChild>
      <a aria-current={isActive ? 'page' : undefined} {...anchorProps}>
        {children}
      </a>
    </Link>
  );
}

export default NavLink;
