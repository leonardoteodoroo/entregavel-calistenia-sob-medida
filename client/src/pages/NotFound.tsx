import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";
import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
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
          className="page-card mb-6 mt-2"
          style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
        >
          <SectionLabel>Oops</SectionLabel>
          <h1
            className="font-display mb-2"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              color: "var(--color-rose)",
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            404
          </h1>
          <h2
            className="font-display mb-4"
            style={{
              fontSize: "clamp(1.2rem, 3.5vw, 1.75rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Página não encontrada
          </h2>
          <p
            className="font-body mb-8"
            style={{
              fontSize: "0.92rem",
              color: "var(--color-taupe)",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            O conteúdo que você procura pode ter sido movido ou não existe mais.
            Volte ao início para continuar seu desafio.
          </p>

          <button
            onClick={() => setLocation("/")}
            className="group flex items-center gap-2 px-5 py-3 rounded font-body transition-all duration-300 active:scale-95"
            style={{
              backgroundColor: "var(--color-rose)",
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Voltar ao início
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <div
            className="mt-10 px-4 py-3 rounded"
            style={{
              backgroundColor: "var(--color-ivory-dark)",
              borderLeft: "3px solid var(--color-taupe)",
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
              Cada passo conta — mesmo os que parecem não levar a lugar nenhum.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
