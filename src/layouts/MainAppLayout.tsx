import { Outlet } from "react-router-dom";
import { BottomTabs } from "../components/BottomTabs";

export const MainAppLayout = () => (
  <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col bg-[color:var(--color-surface-page)] shadow-[var(--shadow-lg)]">
    <main className="min-h-screen flex-1 pb-20">
      <Outlet />
    </main>
    <BottomTabs />
  </div>
);
