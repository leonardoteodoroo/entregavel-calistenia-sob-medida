import { Outlet } from 'react-router-dom';
import { BottomTabs } from '../components/BottomTabs';

export const MainAppLayout = () => (
  <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[color:var(--color-app-bg)] shadow-2xl shadow-black/50">
    <main className="min-h-screen flex-1 pb-20">
      <Outlet />
    </main>
    <BottomTabs />
  </div>
);
