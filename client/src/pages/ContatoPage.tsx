import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";
import { useLocation } from "wouter";

const CONTACT_FAQ = [
  {
    q: "Não encontrei o link de acesso. O que faço?",
    a: "Verifique caixa de entrada, spam e promoções do e-mail da compra. Se ainda não localizar, fale com o suporte pelo e-mail oficial.",
  },
  {
    q: "Perdi alguns dias de treino. Preciso recomeçar tudo?",
    a: "Não. Use o protocolo da página de apoio para retomar com segurança de acordo com o tempo de pausa.",
  },
  {
    q: "Sou iniciante total. Esse plano é para mim?",
    a: "Sim. O programa foi estruturado para iniciantes e retomada, com adaptação de intensidade em cada dia.",
  },
  {
    q: "Onde encontro biblioteca, checklist e FAQ?",
    a: "Use o menu lateral para navegar entre Biblioteca, Checklist, FAQ e Apoio sem perder seu progresso.",
  },
  {
    q: "Quando devo entrar em contato por e-mail?",
    a: "Quando houver dúvidas de acesso, dificuldade para continuar o plano ou necessidade de orientação adicional.",
  },
];

export default function ContatoPage() {
  const [, setLocation] = useLocation();

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
          id="contato"
          className="page-card mb-8 mt-2"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Atendimento</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Contato e suporte
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Canal direto para dúvidas do produto e continuidade do plano.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div
            className="grid gap-3 mb-6"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            }}
          >
            <div
              className="rounded px-5 py-4"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              <p
                className="font-body mb-1"
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-taupe)",
                  fontWeight: 500,
                }}
              >
                Email oficial
              </p>
              <a
                href="mailto:sac@semprenamoda.com.br"
                className="font-body"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-rose)",
                  fontWeight: 600,
                }}
              >
                sac@semprenamoda.com.br
              </a>
            </div>

            <div
              className="rounded px-5 py-4"
              style={{
                backgroundColor: "var(--color-ivory-dark)",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              <p
                className="font-body mb-1"
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-taupe)",
                  fontWeight: 500,
                }}
              >
                Telefone informativo
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                (62) 99991-8702
              </p>
            </div>
          </div>

          <div
            className="px-5 py-4 rounded mb-6"
            style={{
              backgroundColor: "var(--color-rose-muted)",
              borderLeft: "3px solid var(--color-rose)",
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.6,
              }}
            >
              O foco deste produto é constância com treinos curtos e seguros.
              Antes de abrir chamado, confira FAQ e apoio: muitas respostas já
              estão mapeadas para agilizar sua evolução.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setLocation("/faq")}
              className="px-3 py-2 rounded font-body"
              style={{
                fontSize: "0.74rem",
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
                color: "var(--color-charcoal)",
              }}
            >
              Abrir FAQ
            </button>
            <button
              onClick={() => setLocation("/apoio")}
              className="px-3 py-2 rounded font-body"
              style={{
                fontSize: "0.74rem",
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
                color: "var(--color-charcoal)",
              }}
            >
              Ir para Apoio
            </button>
          </div>

          <p
            className="font-body mb-4"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-taupe)",
            }}
          >
            Perguntas frequentes antes do contato
          </p>

          <div className="space-y-3">
            {CONTACT_FAQ.map((item, i) => (
              <div
                key={item.q}
                className="px-4 py-3 rounded"
                style={{
                  backgroundColor: i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <p
                  className="font-body mb-1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                  }}
                >
                  {item.q}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
