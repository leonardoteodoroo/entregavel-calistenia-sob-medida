import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";

const TERMS_TOPICS = [
  {
    title: "Uso do conteúdo",
    body: "O acesso ao material é destinado ao uso pessoal da aluna, sendo proibida cópia, redistribuição, revenda ou reprodução pública sem autorização.",
  },
  {
    title: "Natureza do produto",
    body: "Este é um produto digital com orientação educacional de treino. Não substitui avaliação médica individualizada.",
  },
  {
    title: "Responsabilidade de uso",
    body: "A execução dos exercícios deve respeitar seus limites. Em caso de dor aguda, lesão ou condição clínica, interrompa e busque orientação profissional.",
  },
  {
    title: "Atualizações do programa",
    body: "O conteúdo pode receber melhorias e ajustes de estrutura para evolução da experiência, preservando o propósito principal do produto.",
  },
  {
    title: "Canal oficial",
    body: "Qualquer dúvida sobre acesso, uso e suporte deve ser tratada pelo e-mail oficial informado neste projeto.",
  },
];

export default function TermosPage() {
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
          id="termos"
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
            Termos de Serviço
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Regras essenciais para o uso responsável deste produto digital.
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
            {TERMS_TOPICS.map((item, index) => (
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
            Contato para termos e uso:{" "}
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
