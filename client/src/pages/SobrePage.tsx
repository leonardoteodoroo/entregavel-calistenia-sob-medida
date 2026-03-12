import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";

export default function SobrePage() {
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
          id="sobre"
          className="page-card mb-8 mt-2"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Sobre o projeto</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Calistenia Feminina Sob Medida
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Treino possível para mulheres reais, com rotina real.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div style={{ maxWidth: "640px" }}>
            <p
              className="font-body mb-4"
              style={{
                fontSize: "0.95rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.75,
              }}
            >
              Este produto foi criado para mulheres iniciantes ou em retomada
              que querem consistência sem treino extremo. A proposta é simples:
              sessões curtas em casa, com progressão em 28 dias e foco em
              continuidade.
            </p>
            <p
              className="font-body mb-4"
              style={{
                fontSize: "0.95rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.75,
              }}
            >
              O conteúdo inclui estrutura semanal, biblioteca de exercícios,
              checklist de constância e respostas para dúvidas mais frequentes.
              O objetivo principal é ajudar você a voltar a se mover com
              segurança e confiança.
            </p>
            <p
              className="font-body mb-6"
              style={{
                fontSize: "0.95rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.75,
              }}
            >
              Seguimos evoluindo a experiência visual e o suporte do programa em
              ciclos contínuos, mantendo o compromisso com clareza, acessibilidade
              e aplicação prática no dia a dia.
            </p>
          </div>

          <div
            className="rounded px-5 py-4"
            style={{
              backgroundColor: "var(--color-ivory-dark)",
              border: "1px solid var(--color-taupe-light)",
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-warm-gray)",
                lineHeight: 1.6,
              }}
            >
              Contato oficial de suporte:{" "}
              <a
                href="mailto:sac@semprenamoda.com.br"
                style={{ color: "var(--color-rose)", fontWeight: 600 }}
              >
                sac@semprenamoda.com.br
              </a>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
