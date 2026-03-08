import type { ReactNode } from "react";

interface ScreenFrameProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  rightSlot?: ReactNode;
}

export const ScreenFrame = ({
  title,
  subtitle,
  children,
  rightSlot,
}: ScreenFrameProps) => (
  <div className="safe-pb flex min-h-full flex-col px-4 pb-6 pt-5 sm:px-5">
    <header className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h1 className="font-serif text-2xl leading-tight text-[color:var(--color-text-primary)]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {rightSlot ? <div>{rightSlot}</div> : null}
    </header>
    {children}
  </div>
);
