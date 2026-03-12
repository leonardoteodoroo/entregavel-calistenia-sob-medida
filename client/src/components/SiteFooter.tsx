import {
  footerHelpLinks,
  footerInstitutionalLinks,
  siteConfig,
  socialLinks,
  type SiteLink,
} from "@/content/siteConfig";
import { ExternalLink } from "lucide-react";

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3
        className="font-body mb-3"
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-charcoal)",
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function FooterLink({ label, href, external }: SiteLink) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="font-body inline-flex items-center gap-1 mb-2.5 transition-colors"
      style={{
        fontSize: "0.84rem",
        color: "var(--color-charcoal-light)",
        lineHeight: 1.5,
      }}
    >
      {label}
      {external ? <ExternalLink size={12} /> : null}
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: "white",
        borderTop: "1px solid var(--color-taupe-light)",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
        }}
      >
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <FooterSection title="Atendimento & Suporte">
            <p
              className="font-body mb-2"
              style={{
                fontSize: "0.84rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.5,
              }}
            >
              Contato: {siteConfig.supportPhone}
            </p>
            <p
              className="font-body mb-3"
              style={{
                fontSize: "0.84rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.5,
              }}
            >
              Email:{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                style={{ color: "var(--color-rose)", fontWeight: 500 }}
              >
                {siteConfig.supportEmail}
              </a>
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-warm-gray)",
                lineHeight: 1.6,
                maxWidth: "330px",
              }}
            >
              Canal oficial para dúvidas de acesso, orientação de continuidade e
              suporte do programa.
            </p>
          </FooterSection>

          <FooterSection title="Central de Ajuda">
            <div className="flex flex-col">
              {footerHelpLinks.map(link => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </FooterSection>

          <FooterSection title="Institucional">
            <div className="flex flex-col mb-4">
              {footerInstitutionalLinks.map(link => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
            <div
              className="pt-3"
              style={{ borderTop: "1px solid var(--color-taupe-light)" }}
            >
              <p
                className="font-body mb-2"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-taupe)",
                }}
              >
                Redes oficiais
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-body transition-colors"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-charcoal-light)",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </FooterSection>
        </div>

        <div
          className="mt-8 pt-4"
          style={{ borderTop: "1px solid var(--color-taupe-light)" }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.75rem",
              color: "var(--color-warm-gray)",
              lineHeight: 1.6,
            }}
          >
            © {new Date().getFullYear()} {siteConfig.brandName} · CNPJ:{" "}
            {siteConfig.cnpj} · Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
