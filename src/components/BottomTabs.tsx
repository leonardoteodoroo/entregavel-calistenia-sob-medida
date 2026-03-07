import {
  BookOpen,
  CalendarRange,
  CircleUserRound,
  House,
  TrendingUp,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { MainTab } from '../types/navigation';

interface TabConfig {
  key: MainTab;
  label: string;
  to: string;
  Icon: typeof House;
}

const tabs: TabConfig[] = [
  { key: 'hoje', label: 'Hoje', to: '/app/hoje', Icon: House },
  { key: 'plano', label: 'Plano', to: '/app/plano', Icon: CalendarRange },
  { key: 'biblioteca', label: 'Biblioteca', to: '/app/biblioteca', Icon: BookOpen },
  { key: 'progresso', label: 'Progresso', to: '/app/progresso', Icon: TrendingUp },
  { key: 'perfil', label: 'Perfil', to: '/app/perfil', Icon: CircleUserRound },
];

export const BottomTabs = () => (
  <nav className="safe-tab fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-white/10 bg-[#0a121f]/95 px-2 pt-2 backdrop-blur-lg">
    <ul className="grid grid-cols-5 gap-1">
      {tabs.map((tab) => (
        <li key={tab.key}>
          <NavLink
            to={tab.to}
            className={({ isActive }) =>
              `flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition ${
                isActive
                  ? 'bg-[color:rgba(255,122,89,0.18)] text-[color:var(--color-brand)]'
                  : 'text-[color:var(--color-muted-text)] hover:text-white'
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
