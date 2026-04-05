import BonusVisual from "@/components/bonus/BonusVisual";

import type { OleosSectionViewModel } from "./oleosEssenciaisEmagrecimentoMvpData";

function formatChip(chip: string): string {
  return chip
    .replace(/^mode:/, "")
    .replace(/^goal:/, "")
    .replace(/_/g, " ");
}

export default function OleosEssenciaisSectionListView({
  viewModel,
  onBack,
  onOpenDetail,
}: {
  viewModel: OleosSectionViewModel;
  onBack: () => void;
  onOpenDetail: (entityId: string) => void;
}) {
  return (
    <div
      className="min-h-[100dvh] px-4 py-8 md:px-8"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(236, 224, 203, 0.5) 0%, rgba(251, 248, 242, 1) 52%)",
      }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#f4eee3]"
          style={{
            borderColor: "rgba(106, 83, 53, 0.25)",
            color: "#3d3327",
          }}
        >
          Voltar para a capa
        </button>

        <header className="mb-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#7b614a" }}
          >
            {viewModel.items.length} conteudos
          </p>
          <h1
            className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ color: "#2f3b31" }}
          >
            {viewModel.title}
          </h1>
          <p
            className="max-w-3xl text-base leading-7"
            style={{ color: "#575b55" }}
          >
            {viewModel.description}
          </p>
        </header>

        {viewModel.items.length ? (
          <section className="grid gap-4 md:grid-cols-2">
            {viewModel.items.map(item => (
              <article
                key={item.id}
                className="rounded-[20px] border bg-white p-5 shadow-[0_10px_30px_-24px_rgba(61,51,39,0.8)]"
                style={{ borderColor: "rgba(203, 186, 162, 0.55)" }}
              >
                <div className="mb-3 overflow-hidden rounded-[14px] border border-[#e5d8c5] bg-[#faf6ef] p-1">
                  <BonusVisual
                    visual={item.visual}
                    className="w-full rounded-[10px]"
                    style={{ width: "100%" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#7b614a" }}
                >
                  {item.eyebrow}
                </p>
                <h2
                  className="mb-2 text-lg font-semibold"
                  style={{ color: "#2f3b31" }}
                >
                  {item.title}
                </h2>
                <p
                  className="mb-4 text-sm leading-6"
                  style={{ color: "#575b55" }}
                >
                  {item.excerpt}
                </p>

                {item.chips.length ? (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {item.chips.map(chip => (
                      <span
                        key={`${item.id}-${chip}`}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: "#f1ebe2", color: "#565043" }}
                      >
                        {formatChip(chip)}
                      </span>
                    ))}
                  </div>
                ) : null}

                {item.detailEntityId ? (
                  <button
                    type="button"
                    onClick={() => onOpenDetail(item.detailEntityId!)}
                    className="rounded-full bg-[#2f4e35] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Ver detalhe
                  </button>
                ) : (
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ backgroundColor: "#f1ebe2", color: "#6f6455" }}
                  >
                    Leitura direta na lista
                  </span>
                )}
              </article>
            ))}
          </section>
        ) : (
          <section className="rounded-[20px] border bg-white p-5">
            <p className="text-sm leading-6" style={{ color: "#575b55" }}>
              Nenhum conteúdo disponível nesta seção no momento.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
