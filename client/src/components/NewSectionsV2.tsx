// ============================================================
// NewSectionsV2 — Novas seções estratégicas para V2
// Blocos 1-5: Encaixe, Autosegmentação, Ativação, Expectativa, Progresso
// ============================================================

import { CheckCircle2, AlertCircle, Zap } from "lucide-react";

interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
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
      {children}
    </p>
  );
}

// ── BLOCO 1: ESTE PLANO SERVE PARA VOCÊ PORQUE... ──
export function SectionEncaixe() {
  return (
    <section
      id="encaixe"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <SectionLabel>Encaixe do produto</SectionLabel>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        Este plano serve para você porque...
      </h2>
      <p
        className="font-display mb-6"
        style={{ fontSize: "1rem", color: "var(--color-taupe)", fontStyle: "italic" }}
      >
        Deixa claro se você é a pessoa certa para este desafio.
      </p>

      <div style={{ width: "2.5rem", height: "1px", backgroundColor: "var(--color-rose)", marginBottom: "2rem" }} />

      <div className="space-y-3" style={{ maxWidth: "600px" }}>
        {[
          {
            icon: "✦",
            title: "Você é iniciante ou está em retomada",
            desc: "Este plano foi desenhado para mulheres que estão começando do zero ou voltando após tempo parada. Sem pressão de ser atleta.",
          },
          {
            icon: "✦",
            title: "Você tem 10 a 20 minutos por dia",
            desc: "Não precisa de 1 hora. Cada treino foi pensado para caber em uma rotina real, corrida, com filhos, trabalho, responsabilidades.",
          },
          {
            icon: "✦",
            title: "Você treina em casa",
            desc: "Sem academia, sem deslocamento, sem horário fixo. Você treina quando consegue, no seu espaço.",
          },
          {
            icon: "✦",
            title: "Você não tem equipamento",
            desc: "Todos os exercícios usam apenas o peso do corpo. Sem investimento inicial. Sem barreiras.",
          },
          {
            icon: "✦",
            title: "Você busca constância, não perfeição",
            desc: "Você sabe que um treino de 10 minutos feito é melhor que um treino de 1 hora que não aconteceu. Esse é nosso princípio.",
          },
          {
            icon: "✦",
            title: "Você quer se sentir bem no corpo",
            desc: "Mais energia, mais confiança, mais controle. Menos foco em números da balança, mais em como você se sente.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-3 px-4 py-3 rounded"
            style={{
              backgroundColor: i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
              border: "1px solid var(--color-taupe-light)",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                color: "var(--color-rose)",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              {item.icon}
            </span>
            <div>
              <p
                className="font-body"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.2rem" }}
              >
                {item.title}
              </p>
              <p
                className="font-body"
                style={{ fontSize: "0.8rem", color: "var(--color-warm-gray)", lineHeight: 1.5 }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 px-4 py-3 rounded flex gap-2"
        style={{ backgroundColor: "var(--color-rose-muted)", borderLeft: "3px solid var(--color-rose)" }}
      >
        <CheckCircle2 size={16} style={{ color: "var(--color-rose)", flexShrink: 0, marginTop: "2px" }} />
        <p
          className="font-body"
          style={{ fontSize: "0.85rem", color: "var(--color-charcoal-light)", lineHeight: 1.6 }}
        >
          Se você se reconheceu em pelo menos 4 desses pontos, você está no lugar certo.
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <p className="font-body" style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}>2</p>
      </div>
    </section>
  );
}

// ── BLOCO 2: COMO ESCOLHER SEU CAMINHO ──
export function SectionCaminhos() {
  return (
    <section
      id="escolher-caminho"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <SectionLabel>Autosegmentação</SectionLabel>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        Como escolher seu caminho
      </h2>
      <p
        className="font-display mb-6"
        style={{ fontSize: "1rem", color: "var(--color-taupe)", fontStyle: "italic" }}
      >
        Cada dia tem 3 caminhos. Escolha com honestidade, sem julgamento.
      </p>

      <div style={{ width: "2.5rem", height: "1px", backgroundColor: "var(--color-rose)", marginBottom: "2rem" }} />

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", marginBottom: "2rem" }}>
        {[
          {
            name: "Caminho Leve",
            color: "var(--color-teal-muted)",
            border: "var(--color-teal-light)",
            accent: "var(--color-teal)",
            para: "Para quando você está cansada, com pouco tempo, ou quer começar devagar.",
            quando: "• Primeira semana",
            quando2: "• Dias muito cansativos",
            quando3: "• Quando voltar de pausa",
          },
          {
            name: "Caminho Base",
            color: "var(--color-rose-muted)",
            border: "var(--color-rose-light)",
            accent: "var(--color-rose)",
            para: "O padrão recomendado. Equilíbrio entre desafio e sustentabilidade.",
            quando: "• Maioria dos dias",
            quando2: "• Quando se sente bem",
            quando3: "• Sua base de constância",
          },
          {
            name: "Caminho Avançar",
            color: "oklch(0.96 0.008 10)",
            border: "var(--color-taupe-light)",
            accent: "var(--color-charcoal)",
            para: "Para quando você quer mais desafio. Mais séries, menos descanso.",
            quando: "• Semanas 3 e 4",
            quando2: "• Quando se sente forte",
            quando3: "• Progressão real",
          },
        ].map((caminho, i) => (
          <div
            key={i}
            className="px-5 py-4 rounded"
            style={{
              backgroundColor: caminho.color,
              border: `1px solid ${caminho.border}`,
            }}
          >
            <p
              className="font-body mb-2"
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: caminho.accent,
              }}
            >
              {caminho.name}
            </p>
            <p
              className="font-body mb-3"
              style={{ fontSize: "0.85rem", color: "var(--color-charcoal-light)", lineHeight: 1.6 }}
            >
              {caminho.para}
            </p>
            <div style={{ fontSize: "0.78rem", color: "var(--color-warm-gray)", lineHeight: 1.8 }}>
              <p className="font-body">{caminho.quando}</p>
              <p className="font-body">{caminho.quando2}</p>
              <p className="font-body">{caminho.quando3}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="px-4 py-3 rounded flex gap-2"
        style={{ backgroundColor: "var(--color-ivory-dark)", borderLeft: "3px solid var(--color-taupe)" }}
      >
        <AlertCircle size={16} style={{ color: "var(--color-taupe)", flexShrink: 0, marginTop: "2px" }} />
        <p
          className="font-body"
          style={{ fontSize: "0.85rem", color: "var(--color-charcoal-light)", lineHeight: 1.6 }}
        >
          Mudar de caminho não é fracasso. É inteligência. Escolha o caminho que você consegue manter hoje. Amanhã pode ser diferente.
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <p className="font-body" style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}>3</p>
      </div>
    </section>
  );
}

// ── BLOCO 3: COMECE HOJE EM 5 MINUTOS ──
export function SectionComecaHoje() {
  return (
    <section
      id="comeca-hoje"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <SectionLabel>Ativação imediata</SectionLabel>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        Comece hoje em 5 minutos
      </h2>
      <p
        className="font-display mb-6"
        style={{ fontSize: "1rem", color: "var(--color-taupe)", fontStyle: "italic" }}
      >
        Tudo que você precisa saber para começar agora.
      </p>

      <div style={{ width: "2.5rem", height: "1px", backgroundColor: "var(--color-rose)", marginBottom: "2rem" }} />

      <div className="space-y-3" style={{ maxWidth: "600px" }}>
        {[
          {
            num: "1",
            title: "Escolha seu espaço",
            desc: "Qualquer lugar com 1m x 2m é suficiente. Sala, quarto, varanda. Sem necessidade de espelho.",
          },
          {
            num: "2",
            title: "Use roupas confortáveis",
            desc: "Não precisa ser roupa de academia. Qualquer coisa que você consiga se mexer funciona.",
          },
          {
            num: "3",
            title: "Escolha o dia 1",
            desc: "Abra a seção 'Dia 1' e comece. Não há melhor momento que agora.",
          },
          {
            num: "4",
            title: "Escolha seu caminho",
            desc: "Comece pelo Caminho Leve. Você pode aumentar depois. Hoje é sobre começar.",
          },
          {
            num: "5",
            title: "Faça o treino",
            desc: "Siga os exercícios na ordem. Respeite os tempos de descanso. Respire.",
          },
          {
            num: "6",
            title: "Marque o dia",
            desc: "Após terminar, volte aqui e marque o Dia 1 no checklist. Veja seu progresso começar.",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="flex gap-4 items-start px-4 py-3 rounded"
            style={{
              backgroundColor: i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
              border: "1px solid var(--color-taupe-light)",
            }}
          >
            <span
              className="font-display shrink-0"
              style={{
                fontSize: "1.1rem",
                color: "var(--color-rose)",
                fontWeight: 500,
                lineHeight: 1,
                marginTop: "2px",
              }}
            >
              {step.num}
            </span>
            <div>
              <p
                className="font-body"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-charcoal)" }}
              >
                {step.title}
              </p>
              <p
                className="font-body mt-0.5"
                style={{ fontSize: "0.8rem", color: "var(--color-warm-gray)", lineHeight: 1.5 }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <p className="font-body" style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}>4</p>
      </div>
    </section>
  );
}

// ── BLOCO 4: O QUE ESPERAR EM 7, 14 E 28 DIAS ──
export function SectionOQueEsperar() {
  return (
    <section
      id="o-que-esperar"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <SectionLabel>Alinhamento de expectativa</SectionLabel>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        O que esperar em 7, 14 e 28 dias
      </h2>
      <p
        className="font-display mb-6"
        style={{ fontSize: "1rem", color: "var(--color-taupe)", fontStyle: "italic" }}
      >
        Sinais realistas de progresso. Sem promessas mágicas.
      </p>

      <div style={{ width: "2.5rem", height: "1px", backgroundColor: "var(--color-rose)", marginBottom: "2rem" }} />

      <div className="space-y-4">
        {[
          {
            dias: "Dia 7",
            title: "Primeira semana",
            sinais: [
              "Você completou 7 dias. Isso já é constância.",
              "Os movimentos começam a ficar mais naturais.",
              "Você percebe que está respirando melhor durante os exercícios.",
              "A sensação de 'não consigo' diminui um pouco.",
            ],
          },
          {
            dias: "Dia 14",
            title: "Metade do caminho",
            sinais: [
              "É comum perceber alguns movimentos mais fáceis.",
              "Consegue fazer mais repetições ou descansar menos.",
              "Seu corpo responde melhor. Menos dor, mais controle.",
              "Você percebe que está com mais disposição no dia a dia.",
            ],
          },
          {
            dias: "Dia 28",
            title: "Desafio concluído",
            sinais: [
              "Você criou um hábito. Treinar virou rotina.",
              "Você pode perceber mais tônus e controle corporal.",
              "Você tem mais confiança nos movimentos.",
              "Você quer continuar. Porque descobriu que é capaz.",
            ],
          },
        ].map((marco, i) => (
          <div
            key={i}
            className="px-5 py-4 rounded"
            style={{
              backgroundColor:
                i === 0
                  ? "var(--color-teal-muted)"
                  : i === 1
                  ? "var(--color-rose-muted)"
                  : "var(--color-ivory-dark)",
              border: `1px solid ${
                i === 0
                  ? "var(--color-teal-light)"
                  : i === 1
                  ? "var(--color-rose-light)"
                  : "var(--color-taupe-light)"
              }`,
            }}
          >
            <div className="flex items-baseline gap-2 mb-2">
              <p
                className="font-body"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:
                    i === 0
                      ? "var(--color-teal)"
                      : i === 1
                      ? "var(--color-rose)"
                      : "var(--color-taupe)",
                }}
              >
                {marco.dias}
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "1rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                {marco.title}
              </p>
            </div>
            <ul style={{ marginLeft: "1rem" }}>
              {marco.sinais.map((sinal, j) => (
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
                  {sinal}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mt-6 px-4 py-3 rounded flex gap-2"
        style={{ backgroundColor: "var(--color-ivory-dark)", borderLeft: "3px solid var(--color-taupe)" }}
      >
        <Zap size={16} style={{ color: "var(--color-taupe)", flexShrink: 0, marginTop: "2px" }} />
        <p
          className="font-body"
          style={{ fontSize: "0.85rem", color: "var(--color-charcoal-light)", lineHeight: 1.6 }}
        >
          Esses sinais são realistas. Não prometemos transformação mágica. Com constância, o corpo tende a responder ao estímulo.
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <p className="font-body" style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}>5</p>
      </div>
    </section>
  );
}

// ── BLOCO 5: SINAIS DE PROGRESSO ALÉM DO PESO ──
export function SectionSinaisProgresso() {
  return (
    <section
      id="sinais-progresso"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <SectionLabel>Percepção de valor</SectionLabel>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        Sinais de progresso além do peso
      </h2>
      <p
        className="font-display mb-6"
        style={{ fontSize: "1rem", color: "var(--color-taupe)", fontStyle: "italic" }}
      >
        A balança não conta toda a história. Preste atenção nestes sinais.
      </p>

      <div style={{ width: "2.5rem", height: "1px", backgroundColor: "var(--color-rose)", marginBottom: "2rem" }} />

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))" }}>
        {[
          {
            icon: "⚡",
            title: "Mais energia",
            desc: "Você acorda menos cansada. Tem mais disposição para o dia.",
          },
          {
            icon: "💪",
            title: "Mais força",
            desc: "Você consegue fazer coisas que antes eram difíceis. Carregar compras, subir escadas.",
          },
          {
            icon: "🧘",
            title: "Melhor mobilidade",
            desc: "Você consegue se mexer melhor. Menos rigidez, mais flexibilidade.",
          },
          {
            icon: "😌",
            title: "Menos dor",
            desc: "Com prática consistente, dores de rigidez podem diminuir ao longo das semanas.",
          },
          {
            icon: "😊",
            title: "Mais confiança",
            desc: "Você se sente melhor no próprio corpo. Mais segura, mais presente.",
          },
          {
            icon: "🎯",
            title: "Mais constância",
            desc: "Treinar virou hábito. Você não precisa se forçar tanto para começar.",
          },
          {
            icon: "👖",
            title: "Roupas caem diferente",
            desc: "Você percebe que suas roupas ficam diferentes. Mais folgadas, mais ajustadas.",
          },
          {
            icon: "😴",
            title: "Melhor sono",
            desc: "Você dorme melhor. Mais profundo, mais restaurador.",
          },
          {
            icon: "🧠",
            title: "Melhor foco mental",
            desc: "Você consegue se concentrar melhor. A mente fica mais clara.",
          },
        ].map((sinal, i) => (
          <div
            key={i}
            className="px-4 py-4 rounded"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-taupe-light)",
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{sinal.icon}</p>
            <p
              className="font-body"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-charcoal)",
                marginBottom: "0.25rem",
              }}
            >
              {sinal.title}
            </p>
            <p
              className="font-body"
              style={{ fontSize: "0.78rem", color: "var(--color-warm-gray)", lineHeight: 1.5 }}
            >
              {sinal.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-6 px-4 py-3 rounded flex gap-2"
        style={{ backgroundColor: "var(--color-rose-muted)", borderLeft: "3px solid var(--color-rose)" }}
      >
        <CheckCircle2 size={16} style={{ color: "var(--color-rose)", flexShrink: 0, marginTop: "2px" }} />
        <p
          className="font-body"
          style={{ fontSize: "0.85rem", color: "var(--color-charcoal-light)", lineHeight: 1.6 }}
        >
          Anote esses sinais. Quando a balança não se move, mas você consegue fazer 5 flexões a mais, isso é progresso real.
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <p className="font-body" style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}>6</p>
      </div>
    </section>
  );
}
