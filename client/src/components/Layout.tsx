// ============================================================
// Layout — Calistenia Feminina Sob Medida
// Design: Editorial Wellness Minimalista
// Sidebar fixa com navegação por rotas
// ============================================================

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "wouter";
import { siteConfig } from "@/content/siteConfig";
import {
  expandWeekFromLocation,
  initialExpandedWeeks,
  toggleExpandedWeek,
} from "@/lib/weekMenuState";
import SiteFooter from "./SiteFooter";
import SharedSidebar from "./navigation/SharedSidebar";

interface NavChild {
  label: string;
  to: string;
}

interface NavSection {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
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
  { label: "Bônus", to: "/bonus" },
  {
    label: "BLOG 🧡",
    href: siteConfig.blogUrl,
    external: true,
  },
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
  const [expandedWeeks, setExpandedWeeks] =
    useState<string[]>(initialExpandedWeeks);

  useEffect(() => {
    setExpandedWeeks(prev => expandWeekFromLocation(prev, location));
  }, [location]);

  // Integração com o MobileStickyNav
  useEffect(() => {
    const handleToggleMenu = () => setSidebarOpen(prev => !prev);
    window.addEventListener("mobile-sticky-nav-toggle-menu", handleToggleMenu);

    return () => {
      window.removeEventListener(
        "mobile-sticky-nav-toggle-menu",
        handleToggleMenu
      );
    };
  }, []);

  useEffect(() => {
    if (!sidebarOpen) {
      window.dispatchEvent(new CustomEvent("mobile-menu-closed"));
    } else {
      window.dispatchEvent(new CustomEvent("mobile-menu-opened"));
    }
  }, [sidebarOpen]);

  const toggleWeek = (to: string) => {
    setExpandedWeeks(prev => toggleExpandedWeek(prev, to));
  };

  const navigateTo = (to: string) => {
    const isSameRoute = location === to;
    setLocation(to);
    setSidebarOpen(false);

    if (to === "/bonus") {
      const bonusSection = document.getElementById("bonus");
      if (bonusSection) {
        bonusSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (!isSameRoute) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <SharedSidebar
        currentLocation={location}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onNavigate={navigateTo}
      />

      <header
        className="fixed top-0 left-0 right-0 z-20 hidden items-center justify-between px-[5px] sm:px-4 py-3 lg:hidden"
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
        className="flex-1 pt-0 lg:pt-0"
        style={{ marginLeft: "0", paddingLeft: "0" }}
      >
        <div className="mobile-sticky-nav-safe-area lg:ml-[220px] min-h-[100dvh] flex flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
