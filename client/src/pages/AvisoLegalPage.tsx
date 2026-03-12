import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";

const LEGAL_TOPICS = [
  {
    title: "Propriedade intelectual",
    body: "Textos, estrutura, identidade visual e conteúdos deste produto são protegidos por direitos autorais e não podem ser reproduzidos sem autorização.",
  },
  {
    title: "Limitação de responsabilidade",
    body: "Os conteúdos têm objetivo educacional e de orientação geral. Resultados variam conforme rotina, consistência e contexto individual.",
  },
  {
    title: "Condições de acesso",
    body: "Podemos ajustar estrutura e organização do ambiente digital para melhoria contínua da experiência da aluna.",
  },
  {
    title: "Referências externas",
    body: "Links para plataformas externas são fornecidos para conveniência e podem ter políticas próprias de uso e privacidade.",
  },
];

export default function AvisoLegalPage() {
  return (
    <Layout>
      <div
        style={{
          padding: "clamp(1rem, 3vw, 2rem)",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <section
          id="aviso-legal"
          className="page-card mb-8 mt-2"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Institucional</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Aviso Legal
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Transparência, responsabilidade e proteção de conteúdo.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div className="space-y-3 mb-6">
            {LEGAL_TOPICS.map((item, index) => (
              <div
                key={item.title}
                className="rounded px-4 py-3"
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <p
                  className="font-body mb-1"
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--color-charcoal)",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="font-body"
            style={{
              fontSize: "0.8rem",
              color: "var(--color-warm-gray)",
              lineHeight: 1.6,
            }}
          >
            Canal institucional:{" "}
            <a
              href="mailto:sac@semprenamoda.com.br"
              style={{ color: "var(--color-rose)", fontWeight: 600 }}
            >
              sac@semprenamoda.com.br
            </a>
          </p>
        </section>
      </div>
    </Layout>
  );
}
