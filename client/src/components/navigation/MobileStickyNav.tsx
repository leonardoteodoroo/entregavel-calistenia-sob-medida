import { Menu, Sparkles } from "lucide-react";
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";

import { isMenuTriggerActive, stickyNavItems } from "@/content/navigation";

export interface MobileStickyNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export interface StickyNavRipple {
  id: number;
  size: number;
  x: number;
  y: number;
}

type StickyNavRippleMap = Record<number, StickyNavRipple[]>;

export function getStickyNavActiveIndex(currentPath: string): number {
  return stickyNavItems.findIndex(item => item.isActive(currentPath));
}

export function toggleStickyNavMenu(currentState: boolean): boolean {
  return !currentState;
}

export function navigateStickyNavItem(
  path: string,
  onNavigate: (path: string) => void
): void {
  onNavigate(path);
}

export function createStickyNavRipple(
  rect: Pick<DOMRect, "width" | "height" | "left" | "top">,
  pointer: Pick<MouseEvent, "clientX" | "clientY">,
  id: number
): StickyNavRipple {
  const size = Math.max(rect.width, rect.height);

  return {
    id,
    size,
    x: pointer.clientX - rect.left - size / 2,
    y: pointer.clientY - rect.top - size / 2,
  };
}

export function MobileStickyNav({
  currentPath,
  onNavigate,
}: MobileStickyNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ripples, setRipples] = useState<StickyNavRippleMap>({});
  const activeIndex = getStickyNavActiveIndex(currentPath);
  const contextActive = activeIndex === -1 && isMenuTriggerActive(currentPath);

  useEffect(() => {
    const handleClosed = () => setMenuOpen(false);
    const handleOpened = () => setMenuOpen(true);

    window.addEventListener("mobile-menu-closed", handleClosed);
    window.addEventListener("mobile-menu-opened", handleOpened);

    return () => {
      window.removeEventListener("mobile-menu-closed", handleClosed);
      window.removeEventListener("mobile-menu-opened", handleOpened);
    };
  }, []);

  const handleItemClick = (
    event: ReactMouseEvent<HTMLLIElement>,
    index: number,
    path: string
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rippleId = Date.now();
    const ripple = createStickyNavRipple(rect, event, rippleId);

    setRipples(prev => ({
      ...prev,
      [index]: [...(prev[index] || []), ripple],
    }));

    navigateStickyNavItem(path, onNavigate);

    window.setTimeout(() => {
      setRipples(prev => {
        const currentRipples = prev[index] || [];
        return {
          ...prev,
          [index]: currentRipples.filter(item => item.id !== rippleId),
        };
      });
    }, 600);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="relative h-[56px] w-full bg-white pointer-events-auto"
        style={{
          boxShadow:
            "0 -4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
          background: "linear-gradient(180deg, #ffffff 0%, #fcfaf7 100%)",
          borderTop: "1.5px solid #a35d66",
          borderBottom: "1px solid #a35d66",
        }}
      >
        <button
          type="button"
          className="mobile-sticky-nav-menu-trigger"
          aria-label={
            menuOpen
              ? "Fechar atalhos de navegação"
              : "Abrir atalhos de navegação"
          }
          aria-expanded={menuOpen}
          data-active={menuOpen}
          data-open={menuOpen}
          data-context-active={contextActive}
          onClick={() => {
            // Despacha o evento para que o Layout pegue e abra a sidebar
            window.dispatchEvent(
              new CustomEvent("mobile-sticky-nav-toggle-menu")
            );
          }}
        >
          <span
            className="mobile-sticky-nav-menu-trigger__icon"
            style={{ boxShadow: "inset 0 1px 2px rgba(139, 74, 82, 0.2)" }}
          >
            {menuOpen ? <Sparkles size={14} /> : <Menu size={14} />}
          </span>
          <span style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}>
            Menu
          </span>
        </button>

        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
          <ul className="relative m-0 flex h-full w-[350px] list-none p-0">
            {activeIndex >= 0 ? (
              <div
                className="absolute top-0 left-[-40px] z-0 h-[55px] w-[150px] transition-transform duration-500"
                style={{
                  transform: `translateX(${activeIndex * 70}px)`,
                  transitionTimingFunction:
                    "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }}
              >
                <svg
                  width="150"
                  height="55"
                  viewBox="0 0 150 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible drop-shadow-[0_8px_20px_rgba(139,74,82,0.35)]"
                >
                  <defs>
                    <linearGradient
                      id="bubble-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#8b4a52" />
                      <stop offset="50%" stopColor="#a35d66" />
                      <stop offset="100%" stopColor="#8b4a52" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 0 C 30 0, 40 55, 75 55 C 110 55, 120 0, 140 0 Z"
                    fill="url(#bubble-gradient)"
                  />
                </svg>
              </div>
            ) : null}

            {stickyNavItems.map((item, index) => {
              const isActive = activeIndex === index;
              const Icon = item.icon;

              return (
                <li
                  key={item.key}
                  className="relative z-10 h-[55px] w-[70px] cursor-pointer"
                  onClick={event => handleItemClick(event, index, item.path)}
                >
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                    {(ripples[index] || []).map(ripple => (
                      <span
                        key={ripple.id}
                        className="ripple-span"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: ripple.size,
                          height: ripple.size,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative flex h-full w-full flex-col items-center justify-center">
                    <span
                      className={`relative block transition-all duration-500 ${
                        isActive
                          ? "-translate-y-2.5 scale-110"
                          : "translate-y-0 scale-100"
                      }`}
                      style={{
                        transitionTimingFunction:
                          "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                      }}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] transition-colors duration-500 ${
                          isActive ? "text-white" : "text-[var(--color-taupe)]"
                        }`}
                        style={{
                          filter: isActive
                            ? "drop-shadow(0 2px 3px rgba(0,0,0,0.2))"
                            : "none",
                        }}
                      />
                    </span>
                    <span
                      className={`absolute whitespace-nowrap text-[8px] transition-all duration-500 ${
                        isActive
                          ? "translate-y-3 font-medium text-white opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{
                        transitionTimingFunction:
                          "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileStickyNav;
