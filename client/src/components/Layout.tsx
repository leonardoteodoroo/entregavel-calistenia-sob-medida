// ============================================================
// Layout — Calistenia Feminina Sob Medida
// Design: Editorial Wellness Minimalista
// Sidebar fixa com navegação por rotas
// ============================================================

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "wouter";

interface NavChild {
  label: string;
  to: string;
}

interface NavSection {
  label: string;
  to: string;
  emphasis?: boolean;
  children?: NavChild[];
}

const navSections: NavSection[] = [
  { label: "Início", to: "/" },
  { label: "Biblioteca de exercícios", to: "/biblioteca" },
  {
    label: "Semana 1",
    to: "/semana/1",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 1}`,
      to: `/semana/1/dia/${i + 1}`,
    })),
  },
  {
    label: "Semana 2",
    to: "/semana/2",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 8}`,
      to: `/semana/2/dia/${i + 8}`,
    })),
  },
  {
    label: "Semana 3",
    to: "/semana/3",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 15}`,
      to: `/semana/3/dia/${i + 15}`,
    })),
  },
  {
    label: "Semana 4",
    to: "/semana/4",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 22}`,
      to: `/semana/4/dia/${i + 22}`,
    })),
  },
  { label: "Checklist", to: "/checklist" },
  { label: "FAQ", to: "/faq" },
  { label: "Apoio e continuidade", to: "/apoio", emphasis: true },
];

interface LayoutProps {
  children: React.ReactNode;
}

function isRouteActive(currentPath: string, to: string): boolean {
  if (to === "/") return currentPath === "/";
  return currentPath === to || currentPath.startsWith(`${to}/`);
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>(["/semana/1"]);

  useEffect(() => {
    if (!location.startsWith("/semana/")) return;
    const weekPrefix = location.split("/").slice(0, 3).join("/");
    setExpandedWeeks(prev =>
      prev.includes(weekPrefix) ? prev : [...prev, weekPrefix]
    );
  }, [location]);

  const toggleWeek = (to: string) => {
    setExpandedWeeks(prev =>
      prev.includes(to) ? prev.filter(item => item !== to) : [...prev, to]
    );
  };

  const navigateTo = (to: string) => {
    setLocation(to);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          width: "220px",
          backgroundColor: "white",
          borderRight: "1px solid var(--color-taupe-light)",
          boxShadow: "2px 0 20px rgba(44,44,44,0.04)",
        }}
      >
        <div
          className="px-5 py-6 border-b"
          style={{ borderColor: "var(--color-taupe-light)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-display text-xs tracking-widest uppercase"
              style={{ color: "var(--color-rose)", letterSpacing: "0.15em" }}
            >
              Desafio
            </span>
          </div>
          <h2
            className="font-display leading-tight"
            style={{
              fontSize: "0.95rem",
              color: "var(--color-charcoal)",
              fontWeight: 600,
            }}
          >
            Calistenia Feminina
          </h2>
          <p
            className="font-body mt-0.5"
            style={{
              fontSize: "0.7rem",
              color: "var(--color-taupe)",
              fontWeight: 400,
            }}
          >
            Sob medida
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map(section => {
            const isWeek = Boolean(section.children?.length);
            const isExpanded = expandedWeeks.includes(section.to);
            const hasActiveChild = Boolean(
              section.children?.some(child => location === child.to)
            );
            const isActive =
              isRouteActive(location, section.to) || hasActiveChild;

            if (isWeek) {
              return (
                <div key={section.to}>
                  <div className="flex items-center">
                    <button
                      onClick={() => navigateTo(section.to)}
                      className="w-full text-left px-3 py-2 rounded transition-all duration-150"
                      style={{
                        fontSize: "0.78rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        color: isActive
                          ? "var(--color-rose)"
                          : "var(--color-charcoal-light)",
                        backgroundColor: isActive
                          ? "var(--color-rose-muted)"
                          : "transparent",
                      }}
                    >
                      {section.label}
                    </button>
                    <button
                      onClick={() => toggleWeek(section.to)}
                      className="px-2 py-2"
                      aria-label={`Expandir ${section.label}`}
                    >
                      {isExpanded ? (
                        <ChevronUp
                          size={12}
                          style={{ color: "var(--color-taupe)" }}
                        />
                      ) : (
                        <ChevronDown
                          size={12}
                          style={{ color: "var(--color-taupe)" }}
                        />
                      )}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="ml-3 mb-1">
                      {section.children!.map(child => (
                        <button
                          key={child.to}
                          onClick={() => navigateTo(child.to)}
                          className="nav-item w-full text-left"
                          style={{
                            backgroundColor:
                              location === child.to
                                ? "var(--color-rose-muted)"
                                : "transparent",
                            color:
                              location === child.to
                                ? "var(--color-rose)"
                                : "var(--color-warm-gray)",
                          }}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={section.to}
                onClick={() => navigateTo(section.to)}
                className="nav-item w-full text-left mb-0.5"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-rose-muted)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-rose)"
                    : "var(--color-warm-gray)",
                  borderLeft:
                    section.emphasis && !isActive
                      ? "2px solid var(--color-rose-light)"
                      : "2px solid transparent",
                  paddingLeft: section.emphasis ? "0.6rem" : "0.75rem",
                }}
              >
                {section.label}
              </button>
            );
          })}
        </nav>

        <div
          className="px-5 py-4 border-t"
          style={{ borderColor: "var(--color-taupe-light)" }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.65rem",
              color: "var(--color-taupe)",
              lineHeight: 1.5,
            }}
          >
            Constância vence intensidade.
          </p>
        </div>
      </aside>

      <header
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 lg:hidden"
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid var(--color-taupe-light)",
          boxShadow: "0 1px 8px rgba(44,44,44,0.06)",
        }}
      >
        <div>
          <p
            className="font-display"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-charcoal)",
              fontWeight: 600,
            }}
          >
            Calistenia Feminina
          </p>
          <p
            className="font-body"
            style={{ fontSize: "0.65rem", color: "var(--color-taupe)" }}
          >
            Sob medida
          </p>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded"
          style={{ color: "var(--color-charcoal-light)" }}
          aria-label="Abrir menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main
        className="flex-1 pt-16 lg:pt-0"
        style={{ marginLeft: "0", paddingLeft: "0" }}
      >
        <div className="lg:ml-[220px]">{children}</div>
      </main>
    </div>
  );
}
