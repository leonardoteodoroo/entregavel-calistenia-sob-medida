import SiteFooter from "@/components/SiteFooter";
import {
  institutionalHeaderLinks,
  type InstitutionalSlug,
  siteConfig,
  toPublicPath,
  toSpaHashPath,
} from "@/content/siteConfig";

interface InstitutionalLayoutProps {
  children: React.ReactNode;
  currentSlug: InstitutionalSlug;
}

export default function InstitutionalLayout({
  children,
  currentSlug,
}: InstitutionalLayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <header
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid var(--color-taupe-light)",
        }}
      >
        <div
          className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "clamp(1rem, 3vw, 1.5rem)",
          }}
        >
          <a href={toSpaHashPath("/")}>
            <p
              className="font-display"
              style={{
                fontSize: "1.05rem",
                color: "var(--color-charcoal)",
                fontWeight: 600,
              }}
            >
              {siteConfig.brandShortName}
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "0.72rem",
                color: "var(--color-taupe)",
                lineHeight: 1.5,
              }}
            >
              {siteConfig.brandTagline}
            </p>
          </a>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {institutionalHeaderLinks.map(link => {
              const isCurrent = link.slug === currentSlug;

              return (
                <a
                  key={link.slug}
                  href={toPublicPath(link.slug)}
                  className="font-body transition-colors"
                  style={{
                    fontSize: "0.8rem",
                    color: isCurrent
                      ? "var(--color-rose)"
                      : "var(--color-charcoal-light)",
                    fontWeight: isCurrent ? 600 : 500,
                  }}
                >
                  {link.label}
                </a>
              );
            })}

            <a
              href={toSpaHashPath("/")}
              className="font-body px-3 py-1.5 rounded"
              style={{
                fontSize: "0.78rem",
                backgroundColor: "var(--color-rose-muted)",
                color: "var(--color-rose)",
                border: "1px solid var(--color-rose-light)",
                fontWeight: 600,
              }}
            >
              Ir para o produto
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1" style={{ padding: "clamp(1rem, 3vw, 2rem)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
