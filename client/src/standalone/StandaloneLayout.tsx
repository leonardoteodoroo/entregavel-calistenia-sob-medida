import { useEffect, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import MobileStickyNav from "@/components/navigation/MobileStickyNav";
import SharedSidebar from "@/components/navigation/SharedSidebar";
import { toSpaHashPath } from "@/content/siteConfig";

interface StandaloneLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function StandaloneLayout({
  children,
  currentPath,
}: StandaloneLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.location.assign(toSpaHashPath(path));
  };

  useEffect(() => {
    if (!sidebarOpen) {
      window.dispatchEvent(new CustomEvent("mobile-menu-closed"));
    } else {
      window.dispatchEvent(new CustomEvent("mobile-menu-opened"));
    }
  }, [sidebarOpen]);

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

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <SharedSidebar
        currentLocation={currentPath}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onNavigate={navigateTo}
      />

      <main
        className="flex-1 pt-0 lg:pt-0"
        style={{ marginLeft: "0", paddingLeft: "0", minWidth: 0 }}
      >
        <div className="mobile-sticky-nav-safe-area lg:ml-[220px] min-h-[100dvh] flex flex-col">
          <div className="flex-1" style={{ maxWidth: "100%" }}>
            {children}
          </div>
          <SiteFooter />
        </div>
      </main>

      <MobileStickyNav currentPath={currentPath} onNavigate={navigateTo} />
    </div>
  );
}
