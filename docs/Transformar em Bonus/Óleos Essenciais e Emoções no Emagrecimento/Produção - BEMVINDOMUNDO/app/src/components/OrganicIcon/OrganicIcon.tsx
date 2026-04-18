import { useId, type ReactNode } from "react";

export type OrganicIconName =
  | "home"
  | "leaf"
  | "dropper"
  | "hands"
  | "brainLeaf"
  | "shieldLeaf"
  | "sun"
  | "capsule"
  | "droplet"
  | "shield";

export interface OrganicIconProps {
  name: OrganicIconName;
  title?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function renderPaths(name: OrganicIconName): ReactNode {
  switch (name) {
    case "home":
      return (
        <>
          <path d="M4 10.5L12 4l8 6.5" />
          <path d="M6.5 9.75V20h11V9.75" />
          <path d="M10 20v-4.25a2 2 0 0 1 4 0V20" />
        </>
      );
    case "leaf":
      return (
        <>
          <path d="M6.5 17.5c0-6 4.6-10.5 11-11v4c0 6-4.6 10.5-11 11Z" />
          <path d="M8 16c2.2-1.2 4-3 5.4-5.4" />
        </>
      );
    case "dropper":
      return (
        <>
          <path d="m13.5 5 5.5 5.5" />
          <path d="m11.25 7.25 5.5 5.5" />
          <path d="m8.5 10 4.75-4.75a1.75 1.75 0 0 1 2.5 0l2 2a1.75 1.75 0 0 1 0 2.5L13 14.5" />
          <path d="M6.5 15.75c0 2.15 1.35 3.75 3.25 4.25 1.9-.5 3.25-2.1 3.25-4.25 0-1.1-.65-2.1-1.9-3.15l-1.35-1.1-1.35 1.1c-1.25 1.05-1.9 2.05-1.9 3.15Z" />
        </>
      );
    case "hands":
      return (
        <>
          <path d="M4.5 14.75 8 11.5c.6-.55 1.55-.55 2.15 0l.95.9c.5.45 1.3.45 1.8 0l.95-.9c.6-.55 1.55-.55 2.15 0l3.5 3.25" />
          <path d="M4.5 14.75c.8 2.85 3.05 4.75 7.5 4.75s6.7-1.9 7.5-4.75" />
          <path d="M5 12.75c-.45-.7-.75-1.55-.75-2.5 0-.85.2-1.6.55-2.3" />
          <path d="M19 12.75c.45-.7.75-1.55.75-2.5 0-.85-.2-1.6-.55-2.3" />
        </>
      );
    case "brainLeaf":
      return (
        <>
          <path d="M8.4 7.25A3 3 0 0 0 5.6 10.3c0 .4.1.8.2 1.15A3.15 3.15 0 0 0 5 13.6c0 1.95 1.45 3.4 3.35 3.4h.55" />
          <path d="M15.6 7.25a3 3 0 0 1 2.8 3.05c0 .4-.1.8-.2 1.15A3.15 3.15 0 0 1 19 13.6c0 1.95-1.45 3.4-3.35 3.4h-.55" />
          <path d="M8.95 7.15C9.35 5.8 10.55 5 12 5s2.65.8 3.05 2.15" />
          <path d="M12 6.35v11.3" />
          <path d="M12 16.6c2.1-.85 3.2-2.5 3.2-5 0 0-3.55.2-3.2 5Z" />
          <path d="M12 16.6c-1.75-.95-2.7-2.55-2.7-4.75" />
        </>
      );
    case "shieldLeaf":
      return (
        <>
          <path d="M12 3.5 18.5 6v5.3c0 4.2-2.6 7.4-6.5 9.2-3.9-1.8-6.5-5-6.5-9.2V6L12 3.5Z" />
          <path d="M12.1 15.8c2.05-.8 3.1-2.45 3.1-4.75 0 0-3.4.2-3.1 4.75Z" />
          <path d="M12.1 15.8c-1.7-.95-2.6-2.5-2.6-4.5" />
        </>
      );
    case "sun":
      return (
        <>
          <circle cx="12" cy="12" r="3.6" />
          <path d="M12 4.25v2.2" />
          <path d="M12 17.55v2.2" />
          <path d="m6.5 6.5 1.55 1.55" />
          <path d="m15.95 15.95 1.55 1.55" />
          <path d="M4.25 12h2.2" />
          <path d="M17.55 12h2.2" />
          <path d="M6.5 17.5 8.05 15.95" />
          <path d="m15.95 8.05 1.55-1.55" />
        </>
      );
    case "capsule":
      return (
        <>
          <path d="M9.2 5.2a4.3 4.3 0 0 1 6.1 0l3.5 3.5a4.3 4.3 0 0 1 0 6.1l-3.5 3.5a4.3 4.3 0 0 1-6.1 0l-3.5-3.5a4.3 4.3 0 0 1 0-6.1Z" />
          <path d="m9.25 14.75 5.5-5.5" />
        </>
      );
    case "droplet":
      return (
        <>
          <path d="M12 4.75c3.2 3.8 4.8 6.5 4.8 8.95A4.8 4.8 0 0 1 12 18.5a4.8 4.8 0 0 1-4.8-4.8c0-2.45 1.6-5.15 4.8-8.95Z" />
          <path d="M12 10.25c.7 1.15 1 2.2 1 3.2" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3.5 18.5 6v5.3c0 4.2-2.6 7.4-6.5 9.2-3.9-1.8-6.5-5-6.5-9.2V6L12 3.5Z" />
          <path d="m9.2 12.1 1.8 1.8 3.8-4.1" />
        </>
      );
  }
}

export default function OrganicIcon({
  name,
  title,
  size = 24,
  strokeWidth = 1.75,
  className,
}: OrganicIconProps) {
  const titleId = useId();

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      aria-labelledby={title ? titleId : undefined}
      role={title ? "img" : undefined}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {renderPaths(name)}
    </svg>
  );
}
