import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";
import {
  SectionApoioSuporte,
  SectionPerdidias,
} from "@/components/ProtocolsV2";
import { useLocation } from "wouter";

const MOTIVACAO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/motivacao-bg-AMJWfg8yscZEPVcYCh4AwP.webp";

export default function ApoioPage() {
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
        <SectionPerdidias />
        <SectionApoioSuporte />

        <section
          id="continuidade"
          className="page-card mb-8 overflow-hidden"
          style={{ padding: 0 }}
        >
          <div className="relative">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${MOTIVACAO_BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.25,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-ivory) 0%, rgba(249,246,240,0.92) 100%)",
              }}
            />

            <div
              className="relative z-10"
              style={{ padding: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              <SectionLabel>Encerramento</SectionLabel>
              <h2
                className="font-display mb-4"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  color: "var(--color-charcoal)",
                  fontWeight: 400,
                  maxWidth: "520px",
                  lineHeight: 1.2,
                }}
              >
                Apoio e continuidade
              </h2>

              <div
                style={{
                  width: "2.5rem",
                  height: "1px",
                  backgroundColor: "var(--color-rose)",
                  marginBottom: "2rem",
                }}
              />

              <div style={{ maxWidth: "620px" }}>
                <p
                  className="font-body mb-4"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  Você chegou até aqui. Isso não é pouca coisa. Em um mundo
                  cheio de distrações, você escolheu aparecer para si mesma, dia
                  após dia, com o que tinha disponível.
                </p>
                <p
                  className="font-body mb-6"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  Na prática, constância tende a vencer intensidade isolada. Um
                  treino de 10 minutos feito com presença vale mais do que uma
                  hora adiada indefinidamente.
                </p>

                <div
                  className="px-5 py-4 rounded mb-6"
                  style={{
                    backgroundColor: "var(--color-rose-muted)",
                    borderLeft: "3px solid var(--color-rose)",
                  }}
                >
                  <p
                    className="font-display"
                    style={{
                      fontSize: "1.05rem",
                      color: "var(--color-charcoal)",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}
                  >
                    "O corpo que você terá amanhã depende do que você escolhe
                    fazer a partir de hoje."
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    onClick={() => setLocation("/checklist")}
                    className="px-4 py-3 rounded text-left"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-taupe-light)",
                    }}
                  >
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: "var(--color-charcoal)",
                      }}
                    >
                      Atualizar checklist
                    </p>
                  </button>
                  <button
                    onClick={() => setLocation("/semana/1")}
                    className="px-4 py-3 rounded text-left"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-taupe-light)",
                    }}
                  >
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: "var(--color-charcoal)",
                      }}
                    >
                      Recomeçar com semana 1
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
