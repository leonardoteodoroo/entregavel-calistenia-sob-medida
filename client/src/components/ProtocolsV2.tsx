// ============================================================
// ProtocolsV2 — Seções de protocolo e apoio para V2
// Bloco 6: Perdi dias, e agora?
// Bloco 8: Apoio/Suporte/Vídeos
// ============================================================

import { AlertCircle, Video, BookOpen, MessageCircle } from "lucide-react";

// ── BLOCO 6: PERDI DIAS, E AGORA? ──
export function SectionPerdidias() {
  return (
    <section
      id="perdi-dias"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <p
        className="font-body mb-3"
        style={{
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-rose)",
        }}
      >
        Protocolo de retorno
      </p>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        Perdi dias, e agora?
      </h2>
      <p
        className="font-display mb-6"
        style={{
          fontSize: "1rem",
          color: "var(--color-taupe)",
          fontStyle: "italic",
        }}
      >
        Isso é comum. Aqui está um protocolo simples para retomar com segurança.
      </p>

      <div
        style={{
          width: "2.5rem",
          height: "1px",
          backgroundColor: "var(--color-rose)",
          marginBottom: "2rem",
        }}
      />

      <div className="space-y-4">
        {[
          {
            titulo: "Se perdeu 1-3 dias",
            cor: "var(--color-teal-muted)",
            borda: "var(--color-teal-light)",
            acento: "var(--color-teal)",
            passos: [
              "Retome do dia em que parou.",
              "Se estiver sem ritmo, repita o dia anterior como reentrada.",
              "Use o Caminho Leve no primeiro dia de volta.",
              "No dia seguinte, volte ao Caminho Base se se sentir bem.",
            ],
          },
          {
            titulo: "Se perdeu 4-7 dias",
            cor: "var(--color-rose-muted)",
            borda: "var(--color-rose-light)",
            acento: "var(--color-rose)",
            passos: [
              "Retome 2 dias antes do ponto em que parou.",
              "Faça esses 2 dias no Caminho Leve para readaptação.",
              "Se o corpo responder bem, volte ao fluxo normal.",
              "Marque no checklist para visualizar o retorno.",
            ],
          },
          {
            titulo: "Se perdeu mais de 7 dias",
            cor: "var(--color-ivory-dark)",
            borda: "var(--color-taupe-light)",
            acento: "var(--color-taupe)",
            passos: [
              "Recomece pela estrutura da Semana 1.",
              "Use Caminho Leve nos primeiros 3 dias.",
              "Depois evolua para Caminho Base conforme conforto.",
              "Objetivo da retomada: constância antes de intensidade.",
            ],
          },
        ].map((protocolo, i) => (
          <div
            key={i}
            className="px-5 py-4 rounded"
            style={{
              backgroundColor: protocolo.cor,
              border: `1px solid ${protocolo.borda}`,
            }}
          >
            <p
              className="font-body mb-3"
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: protocolo.acento,
              }}
            >
              {protocolo.titulo}
            </p>
            <ul style={{ marginLeft: "1rem" }}>
              {protocolo.passos.map((passo, j) => (
                <li
                  key={j}
                  className="font-body"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.6,
                    listStyleType: "disc",
                    marginBottom: "0.3rem",
                  }}
                >
                  {passo}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mt-6 px-4 py-3 rounded flex gap-2"
        style={{
          backgroundColor: "var(--color-rose-muted)",
          borderLeft: "3px solid var(--color-rose)",
        }}
      >
        <AlertCircle
          size={16}
          style={{
            color: "var(--color-rose)",
            flexShrink: 0,
            marginTop: "2px",
          }}
        />
        <p
          className="font-body"
          style={{
            fontSize: "0.85rem",
            color: "var(--color-charcoal-light)",
            lineHeight: 1.6,
          }}
        >
          É comum sentir regressão após uma pausa, mas ela costuma ser
          temporária. Retomar com calma melhora a confiança e reduz
          desconfortos.
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <p
          className="font-body"
          style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
        >
          34
        </p>
      </div>
    </section>
  );
}

// ── BLOCO 8: APOIO / SUPORTE / VÍDEOS ──
export function SectionApoioSuporte() {
  return (
    <section
      id="apoio-suporte"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <p
        className="font-body mb-3"
        style={{
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-rose)",
        }}
      >
        Recursos e suporte
      </p>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        Apoio, vídeos e suporte
      </h2>
      <p
        className="font-display mb-6"
        style={{
          fontSize: "1rem",
          color: "var(--color-taupe)",
          fontStyle: "italic",
        }}
      >
        Esta área reúne os recursos de apoio em liberação.
      </p>

      <div
        style={{
          width: "2.5rem",
          height: "1px",
          backgroundColor: "var(--color-rose)",
          marginBottom: "2rem",
        }}
      />

      {/* Blocos de recursos */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            icon: <Video size={24} />,
            title: "Vídeos de demonstração",
            desc: "Vídeos curtos de execução e ajustes de postura serão publicados aqui.",
            status: "Vídeos de demonstração em atualização",
            color: "var(--color-teal-muted)",
            border: "var(--color-teal-light)",
            accent: "var(--color-teal)",
          },
          {
            icon: <BookOpen size={24} />,
            title: "Biblioteca de exercícios",
            desc: "Variações e progressões para evoluir os movimentos com segurança.",
            status: "Biblioteca em liberação",
            color: "var(--color-rose-muted)",
            border: "var(--color-rose-light)",
            accent: "var(--color-rose)",
          },
          {
            icon: <MessageCircle size={24} />,
            title: "Suporte e dúvidas",
            desc: "Canal dedicado para dúvidas técnicas e orientação de continuidade.",
            status: "Canal de suporte será disponibilizado nesta área",
            color: "var(--color-ivory-dark)",
            border: "var(--color-taupe-light)",
            accent: "var(--color-taupe)",
          },
        ].map((recurso, i) => (
          <div
            key={i}
            className="px-5 py-5 rounded flex flex-col"
            style={{
              backgroundColor: recurso.color,
              border: `1px solid ${recurso.border}`,
            }}
          >
            <div
              style={{
                color: recurso.accent,
                marginBottom: "0.75rem",
              }}
            >
              {recurso.icon}
            </div>
            <p
              className="font-body mb-1"
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--color-charcoal)",
              }}
            >
              {recurso.title}
            </p>
            <p
              className="font-body mb-3 flex-1"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.6,
              }}
            >
              {recurso.desc}
            </p>
            <div
              className="px-3 py-2 rounded text-center"
              style={{
                backgroundColor: "white",
                border: `1px solid ${recurso.accent}`,
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "0.75rem",
                  color: recurso.accent,
                  fontStyle: "normal",
                  fontWeight: 500,
                }}
              >
                {recurso.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de FAQ rápido */}
      <div className="mt-8">
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
          Dúvidas frequentes sobre suporte
        </p>
        <div className="space-y-3">
          {[
            {
              q: "Como faço para acessar os vídeos?",
              a: "Nesta versão, os vídeos ainda estão em atualização. Quando forem liberados, o acesso será por esta seção.",
            },
            {
              q: "Posso fazer perguntas sobre minha forma?",
              a: "Por enquanto, use as orientações de adaptação e observação de cada dia. O canal dedicado de suporte será publicado aqui.",
            },
            {
              q: "E se eu não conseguir fazer um exercício?",
              a: "Use a adaptação técnica do dia e escolha o Caminho Leve. Se ainda houver dúvida, registre para enviar quando o canal abrir.",
            },
            {
              q: "Há comunidade ou grupo de apoio?",
              a: "Ainda não há comunidade oficial ativa nesta versão. Qualquer novidade será comunicada nesta área.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="px-4 py-3 rounded"
              style={{
                backgroundColor:
                  i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
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
      </div>

      <div className="flex justify-end mt-6">
        <p
          className="font-body"
          style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
        >
          36
        </p>
      </div>
    </section>
  );
}
