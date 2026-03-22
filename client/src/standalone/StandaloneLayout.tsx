import SiteFooter from "@/components/SiteFooter";
import MobileStickyNav from "@/components/navigation/MobileStickyNav";
import { toSpaHashPath } from "@/content/siteConfig";

interface StandaloneLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function StandaloneLayout({
  children,
  currentPath,
}: StandaloneLayoutProps) {
  const navigateTo = (path: string) => {
    window.location.assign(toSpaHashPath(path));
  };

  return (
    <div
      className="mobile-sticky-nav-safe-area min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <MobileStickyNav currentPath={currentPath} onNavigate={navigateTo} />
    </div>
  );
}
