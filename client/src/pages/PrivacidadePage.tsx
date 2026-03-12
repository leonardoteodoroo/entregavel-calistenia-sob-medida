import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";

const PRIVACY_TOPICS = [
  {
    title: "Dados coletados",
    body: "Podemos utilizar dados básicos de navegação e informações fornecidas por você para garantir acesso ao produto, suporte e comunicação relacionada ao serviço.",
  },
  {
    title: "Finalidade de uso",
    body: "Os dados são usados para operação do produto digital, melhoria da experiência, atendimento de suporte e cumprimento de obrigações legais aplicáveis.",
  },
  {
    title: "Compartilhamento",
    body: "Não comercializamos seus dados pessoais. O compartilhamento ocorre apenas quando necessário para processamento técnico e prestação do serviço.",
  },
  {
    title: "Segurança e retenção",
    body: "Adotamos medidas razoáveis de proteção e mantemos dados somente pelo período necessário para a finalidade informada e obrigações legais.",
  },
  {
    title: "Seus direitos",
    body: "Você pode solicitar informações, atualização ou exclusão de dados dentro dos limites legais pelo canal oficial de suporte.",
  },
];

export default function PrivacidadePage() {
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
          id="politica-privacidade"
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
            Política de Privacidade
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Diretrizes objetivas de tratamento de dados para este produto
            digital.
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
            {PRIVACY_TOPICS.map((item, index) => (
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
            Dúvidas sobre privacidade:{" "}
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
