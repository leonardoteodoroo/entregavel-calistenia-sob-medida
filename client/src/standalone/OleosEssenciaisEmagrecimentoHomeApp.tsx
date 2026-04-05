import BonusVisual from "@/components/bonus/BonusVisual";

import type {
  OleosHomeViewModel,
  OleosSectionId,
} from "./oleosEssenciaisEmagrecimentoMvpData";

interface OleosEssenciaisEmagrecimentoHomeAppProps {
  viewModel: OleosHomeViewModel;
  onOpenSection: (sectionId: OleosSectionId) => void;
}

const ACCENT_STYLES: Record<
  OleosHomeViewModel["sectionCards"][number]["accent"],
  {
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonText: string;
  }
> = {
  sage: {
    badgeBg: "#e6f0e4",
    badgeText: "#3f6144",
    buttonBg: "#2f4e35",
    buttonText: "#ffffff",
  },
  rose: {
    badgeBg: "#f8e7e0",
    badgeText: "#7a4a3c",
    buttonBg: "#6a3c32",
    buttonText: "#ffffff",
  },
  gold: {
    badgeBg: "#f4e9d9",
    badgeText: "#7a5f2f",
    buttonBg: "#5e4c28",
    buttonText: "#ffffff",
  },
};

export default function OleosEssenciaisEmagrecimentoHomeApp({
  viewModel,
  onOpenSection,
}: OleosEssenciaisEmagrecimentoHomeAppProps) {
  return (
    <div
      className="min-h-[100dvh] px-4 py-8 md:px-8"
      style={{
        background:
          "radial-gradient(circle at 14% 12%, rgba(234, 223, 202, 0.48) 0%, rgba(250, 247, 241, 1) 60%)",
      }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <section
          className="mb-10 overflow-hidden rounded-[30px] border p-6 md:p-8"
          style={{
            borderColor: "rgba(170, 147, 116, 0.35)",
            background:
              "linear-gradient(145deg, rgba(247, 241, 228, 1) 0%, rgba(239, 233, 221, 1) 100%)",
          }}
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ color: "#7b614a" }}
          >
            Bonus Especial
          </p>
          <h1
            className="mb-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl"
            style={{ color: "#2f3b31" }}
          >
            {viewModel.title}
          </h1>
          <p
            className="mb-5 max-w-3xl text-base leading-7"
            style={{ color: "#4f544d" }}
          >
            {viewModel.subtitle}
          </p>
          <div className="overflow-hidden rounded-[20px] border border-[#d7c9b7] bg-white p-2">
            <BonusVisual
              visual={viewModel.heroVisual}
              className="w-full rounded-[14px]"
              style={{ width: "100%" }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-2">
          {viewModel.editorialBlocks.map(block => (
            <article
              key={block.title}
              className="rounded-[22px] border bg-white p-5 shadow-[0_12px_35px_-28px_rgba(36,26,18,0.85)]"
              style={{ borderColor: "rgba(201, 182, 155, 0.58)" }}
            >
              <h2
                className="mb-3 text-xl font-semibold leading-tight"
                style={{ color: "#2f3b31" }}
              >
                {block.title}
              </h2>
              {block.paragraphs.map(paragraph => (
                <p
                  key={paragraph}
                  className="mb-3 text-sm leading-6"
                  style={{ color: "#4f544d" }}
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        {viewModel.sourceReferences.length ? (
          <section className="mb-10 rounded-[22px] border bg-white p-5">
            <h2
              className="mb-3 text-xl font-semibold leading-tight"
              style={{ color: "#2f3b31" }}
            >
              Fontes
            </h2>
            {viewModel.sourceReferences.map(source => (
              <p
                key={source}
                className="text-sm leading-6"
                style={{ color: "#4f544d" }}
              >
                {source}
              </p>
            ))}
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {viewModel.sectionCards.map(card => {
            const accent = ACCENT_STYLES[card.accent];

            return (
              <article
                key={card.id}
                className="rounded-[22px] border bg-white p-5 shadow-[0_12px_35px_-28px_rgba(36,26,18,0.85)]"
                style={{ borderColor: "rgba(201, 182, 155, 0.58)" }}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{
                      backgroundColor: accent.badgeBg,
                      color: accent.badgeText,
                    }}
                  >
                    {card.count} conteúdos
                  </span>
                </div>

                <h2
                  className="mb-2 text-xl font-semibold leading-tight"
                  style={{ color: "#2f3b31" }}
                >
                  {card.title}
                </h2>
                <p
                  className="mb-5 text-sm leading-6"
                  style={{ color: "#5b6058" }}
                >
                  {card.description}
                </p>

                <button
                  type="button"
                  onClick={() => onOpenSection(card.id)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: accent.buttonBg,
                    color: accent.buttonText,
                  }}
                >
                  Abrir seção
                </button>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
