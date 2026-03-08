import {
  BookOpen,
  CalendarRange,
  Dumbbell,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import type { MainTab } from "../types/navigation";

interface TabConfig {
  key: MainTab;
  label: string;
  to: string;
  Icon: LucideIcon;
}

const tabs: TabConfig[] = [
  { key: "hoje", label: "Treino", to: "/app/hoje", Icon: Dumbbell },
  { key: "plano", label: "Plano", to: "/app/plano", Icon: CalendarRange },
  {
    key: "biblioteca",
    label: "Biblioteca",
    to: "/app/biblioteca",
    Icon: BookOpen,
  },
  {
    key: "progresso",
    label: "Progresso",
    to: "/app/progresso",
    Icon: TrendingUp,
  },
  { key: "extras", label: "Extras", to: "/app/extras", Icon: Sparkles },
];

export const BottomTabs = () => (
  <nav className="safe-tab fixed bottom-0 left-1/2 z-40 w-full max-w-[800px] -translate-x-1/2 border-t border-[color:var(--color-border-default)] bg-[color:var(--color-nav-backdrop)] px-2 pt-2 backdrop-blur-lg">
    <ul className="grid grid-cols-5 gap-1">
      {tabs.map((tab) => (
        <li key={tab.key}>
          <NavLink
            to={tab.to}
            className={({ isActive }) =>
              `flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition ${
                isActive
                  ? "bg-[color:var(--color-action-secondary-hover)] text-[color:var(--color-action-primary)]"
                  : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]"
              }`
            }
          >
            <tab.Icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
