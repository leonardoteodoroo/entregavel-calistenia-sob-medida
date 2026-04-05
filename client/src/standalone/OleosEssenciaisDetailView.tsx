import BonusVisual from "@/components/bonus/BonusVisual";

import type { OleosDetailViewModel } from "./oleosEssenciaisEmagrecimentoMvpData";

interface OleosEssenciaisDetailViewProps {
  viewModel: OleosDetailViewModel;
  onBackToSection: () => void;
  onBackHome: () => void;
}

export default function OleosEssenciaisDetailView({
  viewModel,
  onBackToSection,
  onBackHome,
}: OleosEssenciaisDetailViewProps) {
  return (
    <div
      className="min-h-[100dvh] px-4 py-8 md:px-8"
      style={{
        background:
          "radial-gradient(circle at 14% 10%, rgba(234, 222, 203, 0.52) 0%, rgba(250, 247, 242, 1) 58%)",
      }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onBackHome}
            className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#f2ebde]"
            style={{
              borderColor: "rgba(106, 83, 53, 0.25)",
              color: "#3d3327",
            }}
          >
            Voltar para a capa
          </button>
          <button
            type="button"
            onClick={onBackToSection}
            className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#f2ebde]"
            style={{
              borderColor: "rgba(106, 83, 53, 0.25)",
              color: "#3d3327",
            }}
          >
            Voltar para a seção
          </button>
        </div>

        <header className="mb-6">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#7b614a" }}
          >
            {viewModel.eyebrow}
          </p>
          <h1
            className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ color: "#2f3b31" }}
          >
            {viewModel.title}
          </h1>
          <p className="text-sm leading-6" style={{ color: "#5b6058" }}>
            {viewModel.sectionTitle ?? "Conteúdo especial"} · {viewModel.kind}
          </p>
        </header>

        <div className="mb-8 overflow-hidden rounded-[24px] border bg-white p-2 shadow-[0_12px_30px_-26px_rgba(36,26,18,0.85)]">
          <BonusVisual
            visual={viewModel.visual}
            className="w-full rounded-[18px]"
            style={{ width: "100%" }}
            loading="eager"
            decoding="async"
          />
        </div>

        {viewModel.summaryParagraphs.length ? (
          <section className="mb-8 rounded-[20px] border bg-white p-5">
            <h2
              className="mb-3 text-xl font-semibold tracking-tight"
              style={{ color: "#2f3b31" }}
            >
              Contexto
            </h2>
            {viewModel.summaryParagraphs.map(paragraph => (
              <p
                key={paragraph}
                className="mb-3 text-sm leading-7"
                style={{ color: "#53574f" }}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {viewModel.ingredients.length ? (
          <section className="mb-8 rounded-[20px] border bg-white p-5">
            <h2
              className="mb-3 text-xl font-semibold tracking-tight"
              style={{ color: "#2f3b31" }}
            >
              Ingredientes
            </h2>
            <ul className="space-y-2">
              {viewModel.ingredients.map(item => (
                <li
                  key={item}
                  className="rounded-xl bg-[#f6f0e6] px-3 py-2 text-sm leading-6"
                  style={{ color: "#4f544d" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {viewModel.steps.length ? (
          <section className="mb-8 rounded-[20px] border bg-white p-5">
            <h2
              className="mb-3 text-xl font-semibold tracking-tight"
              style={{ color: "#2f3b31" }}
            >
              Modo de Preparo
            </h2>
            <ol className="space-y-2">
              {viewModel.steps.map(step => (
                <li
                  key={step}
                  className="rounded-xl bg-[#f6f0e6] px-3 py-2 text-sm leading-6"
                  style={{ color: "#4f544d" }}
                >
                  {step}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {viewModel.observations.length ? (
          <section className="mb-8 rounded-[20px] border bg-white p-5">
            <h2
              className="mb-3 text-xl font-semibold tracking-tight"
              style={{ color: "#2f3b31" }}
            >
              Observações
            </h2>
            <ul className="space-y-2">
              {viewModel.observations.map(observation => (
                <li
                  key={observation}
                  className="rounded-xl bg-[#fbf4ea] px-3 py-2 text-sm leading-6"
                  style={{ color: "#4f544d" }}
                >
                  {observation}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {viewModel.referencedOils.length ? (
          <section className="mb-8 rounded-[20px] border bg-white p-5">
            <h2
              className="mb-3 text-xl font-semibold tracking-tight"
              style={{ color: "#2f3b31" }}
            >
              Óleos citados
            </h2>
            <div className="flex flex-wrap gap-2">
              {viewModel.referencedOils.map(oil => (
                <span
                  key={oil}
                  className="rounded-full bg-[#f1ebe2] px-3 py-1 text-xs font-medium"
                  style={{ color: "#565043" }}
                >
                  {oil}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {viewModel.sources.length ? (
          <section className="rounded-[20px] border bg-white p-5">
            <h2
              className="mb-3 text-xl font-semibold tracking-tight"
              style={{ color: "#2f3b31" }}
            >
              Fontes
            </h2>
            <ul className="space-y-1">
              {viewModel.sources.map(source => (
                <li
                  key={source}
                  className="text-sm leading-6"
                  style={{ color: "#4f544d" }}
                >
                  {source}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
