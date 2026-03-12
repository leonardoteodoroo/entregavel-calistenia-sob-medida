import { ExternalLink } from "lucide-react";

const HELP_LINKS = [
  { label: "Sobre Nós", href: "#/sobre" },
  { label: "Biblioteca", href: "#/biblioteca" },
  { label: "Checklist", href: "#/checklist" },
  { label: "Perguntas Frequentes - FAQ", href: "#/faq" },
  { label: "Apoio", href: "#/apoio" },
  { label: "Contato", href: "#/contato" },
  {
    label: "Veja: BLOG Sempre Na Moda 🧡",
    href: "https://semprenamoda.com.br/blogs/todos-os-posts",
    external: true,
  },
];

const INSTITUTIONAL_LINKS = [
  { label: "Política de Privacidade", href: "#/politica-de-privacidade" },
  { label: "Termos de Serviço", href: "#/termos-de-servico" },
  { label: "Aviso Legal", href: "#/aviso-legal" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/semprenamoda.loja/" },
  { label: "Instagram", href: "https://www.instagram.com/semprenamoda.loja/" },
  { label: "Pinterest", href: "https://pinterest.com/semprenamodaloja/" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@semprenamodaloja?sub_confirmation=1",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@semprenamoda.loja/" },
];

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

function FooterLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
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
              Contato: (62) 99991-8702
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
                href="mailto:sac@semprenamoda.com.br"
                style={{ color: "var(--color-rose)", fontWeight: 500 }}
              >
                sac@semprenamoda.com.br
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
              {HELP_LINKS.map(link => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  external={link.external}
                />
              ))}
            </div>
          </FooterSection>

          <FooterSection title="Institucional">
            <div className="flex flex-col mb-4">
              {INSTITUTIONAL_LINKS.map(link => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
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
                {SOCIAL_LINKS.map(link => (
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
            © {new Date().getFullYear()} Calistenia Feminina Sob Medida · CNPJ:
            41.024.752/0001-70 · Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
