import { Link, useLocation } from "react-router-dom";

import OrganicIcon, { type OrganicIconName } from "../OrganicIcon/OrganicIcon";
import styles from "./BottomNav.module.css";

const items = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/biblioteca", label: "Óleos", icon: "leaf" },
  { href: "/rituais", label: "Rituais", icon: "hands" },
  { href: "/mindset", label: "Mente", icon: "brainLeaf" },
  { href: "/guias", label: "Guias", icon: "shieldLeaf" },
] as const satisfies ReadonlyArray<{
  href: string;
  label: string;
  icon: OrganicIconName;
}>;

function isActivePath(currentPath: string, href: string): boolean {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <div className={styles.list}>
        {items.map(item => {
          const isActive = isActivePath(location.pathname, item.href);
          const className = isActive
            ? `${styles.link} ${styles.active}`
            : styles.link;

          return (
            <Link
              key={item.href}
              className={className}
              to={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={styles.icon} aria-hidden="true">
                <OrganicIcon name={item.icon} size={18} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
