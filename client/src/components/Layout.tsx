// ============================================================
// Layout — Calistenia Feminina Sob Medida
// Design: Editorial Wellness Minimalista
// Sidebar fixa com navegação por seções
// ============================================================

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
  emphasis?: boolean;
  children?: { id: string; label: string }[];
}

const navSections: NavSection[] = [
  { id: "capa", label: "Capa" },
  { id: "boas-vindas", label: "Boas-vindas" },
  { id: "para-quem", label: "Para quem é" },
  { id: "como-usar", label: "Como usar" },
  { id: "biblioteca-exercicios", label: "Biblioteca de exercícios" },
  { id: "estrutura", label: "Estrutura do plano" },
  { id: "visao-geral", label: "Visão geral" },
  {
    id: "encaixe",
    label: "Este plano serve para você porque",
    emphasis: true,
  },
  {
    id: "escolher-caminho",
    label: "Como escolher seu caminho",
    emphasis: true,
  },
  {
    id: "comeca-hoje",
    label: "Comece hoje em 5 minutos",
    emphasis: true,
  },
  {
    id: "o-que-esperar",
    label: "O que esperar em 7, 14 e 28 dias",
    emphasis: true,
  },
  {
    id: "sinais-progresso",
    label: "Sinais de progresso além do peso",
    emphasis: true,
  },
  {
    id: "semana-1",
    label: "Semana 1",
    children: [
      { id: "dia-1", label: "Dia 1" },
      { id: "dia-2", label: "Dia 2" },
      { id: "dia-3", label: "Dia 3" },
      { id: "dia-4", label: "Dia 4" },
      { id: "dia-5", label: "Dia 5" },
      { id: "dia-6", label: "Dia 6" },
      { id: "dia-7", label: "Dia 7" },
    ],
  },
  {
    id: "semana-2",
    label: "Semana 2",
    children: [
      { id: "dia-8", label: "Dia 8" },
      { id: "dia-9", label: "Dia 9" },
      { id: "dia-10", label: "Dia 10" },
      { id: "dia-11", label: "Dia 11" },
      { id: "dia-12", label: "Dia 12" },
      { id: "dia-13", label: "Dia 13" },
      { id: "dia-14", label: "Dia 14" },
    ],
  },
  {
    id: "semana-3",
    label: "Semana 3",
    children: [
      { id: "dia-15", label: "Dia 15" },
      { id: "dia-16", label: "Dia 16" },
      { id: "dia-17", label: "Dia 17" },
      { id: "dia-18", label: "Dia 18" },
      { id: "dia-19", label: "Dia 19" },
      { id: "dia-20", label: "Dia 20" },
      { id: "dia-21", label: "Dia 21" },
    ],
  },
  {
    id: "semana-4",
    label: "Semana 4",
    children: [
      { id: "dia-22", label: "Dia 22" },
      { id: "dia-23", label: "Dia 23" },
      { id: "dia-24", label: "Dia 24" },
      { id: "dia-25", label: "Dia 25" },
      { id: "dia-26", label: "Dia 26" },
      { id: "dia-27", label: "Dia 27" },
      { id: "dia-28", label: "Dia 28" },
    ],
  },
  {
    id: "perdi-dias",
    label: "Perdi dias, e agora?",
    emphasis: true,
  },
  { id: "checklist", label: "Checklist" },
  { id: "faq", label: "FAQ" },
  { id: "apoio-suporte", label: "Apoio, vídeos e suporte" },
  { id: "continuidade", label: "Apoio e continuidade" },
];

interface LayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

export default function Layout({ children, activeSection }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>(["semana-1"]);

  useEffect(() => {
    if (!activeSection?.startsWith("dia-")) return;
    const day = Number(activeSection.replace("dia-", ""));
    if (Number.isNaN(day)) return;

    const weekId =
      day <= 7
        ? "semana-1"
        : day <= 14
          ? "semana-2"
          : day <= 21
            ? "semana-3"
            : "semana-4";
    setExpandedWeeks(prev =>
      prev.includes(weekId) ? prev : [...prev, weekId]
    );
  }, [activeSection]);

  const toggleWeek = (id: string) => {
    setExpandedWeeks(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = window.innerWidth < 1024 ? 88 : 20;
      const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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
        {/* Logo area */}
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

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map(section => {
            const isWeek = section.children && section.children.length > 0;
            const isExpanded = expandedWeeks.includes(section.id);
            const hasActiveChild = Boolean(
              section.children?.some(child => child.id === activeSection)
            );
            const isActive = activeSection === section.id || hasActiveChild;

            if (isWeek) {
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleWeek(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded text-left transition-all duration-150"
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
                    <span>{section.label}</span>
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
                  {isExpanded && (
                    <div className="ml-3 mb-1">
                      {section.children!.map(child => (
                        <button
                          key={child.id}
                          onClick={() => scrollTo(child.id)}
                          className="nav-item w-full text-left"
                          style={{
                            backgroundColor:
                              activeSection === child.id
                                ? "var(--color-rose-muted)"
                                : "transparent",
                            color:
                              activeSection === child.id
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
                key={section.id}
                onClick={() => scrollTo(section.id)}
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

        {/* Footer */}
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

      {/* Mobile header */}
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
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Main content */}
      <main
        className="flex-1 pt-16 lg:pt-0"
        style={{ marginLeft: "0", paddingLeft: "0" }}
      >
        <div className="lg:ml-[220px]">{children}</div>
      </main>
    </div>
  );
}
