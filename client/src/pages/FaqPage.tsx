import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";
import { faq } from "@/lib/planData";
import { useLocation } from "wouter";

export default function FaqPage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div
        style={{
          padding: 0,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <section
          id="faq"
          className="page-card mb-6 mt-2"
          style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
        >
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Perguntas frequentes
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Respostas diretas para as dúvidas mais comuns.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div className="space-y-3" style={{ maxWidth: "620px" }}>
            {faq.map((item, i) => (
              <div
                key={i}
                className="px-5 py-4 rounded"
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <p
                  className="font-body mb-2"
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
                    lineHeight: 1.65,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-6 px-4 py-3 rounded"
            style={{
              backgroundColor: "var(--color-teal-muted)",
              borderLeft: "3px solid var(--color-teal)",
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.6,
              }}
            >
              Se você perdeu dias, precisa ajustar intensidade ou quer planejar
              continuidade após o dia 28, use a página de apoio.
            </p>
            <button
              onClick={() => setLocation("/apoio")}
              className="mt-3 px-3 py-2 rounded font-body"
              style={{
                fontSize: "0.72rem",
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
                color: "var(--color-charcoal)",
              }}
            >
              Ir para apoio e continuidade
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
