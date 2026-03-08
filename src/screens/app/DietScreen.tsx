import {
  BookOpenCheck,
  Calculator,
  CirclePlay,
  Download,
  MoonStar,
  Podcast,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { ScreenFrame } from "../../components/ScreenFrame";

interface QuickResourceCard {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconClassName: string;
}

interface ExtraContentItem {
  title: string;
  meta: string;
  Icon: LucideIcon;
  ActionIcon: LucideIcon;
}

const quickResourceCards: QuickResourceCard[] = [
  {
    title: "Cardápio 1500 kcal",
    description: "Plano alimentar completo",
    Icon: Utensils,
    iconClassName:
      "bg-[color:var(--color-action-secondary-hover)] text-[color:var(--color-action-primary)]",
  },
  {
    title: "Alongamento Sono",
    description: "Rotina relaxante noturna",
    Icon: MoonStar,
    iconClassName:
      "bg-[color:var(--color-surface-subtle)] text-[color:var(--color-action-strong)]",
  },
  {
    title: "Calculadora TMB",
    description: "Calcule seu gasto diário",
    Icon: Calculator,
    iconClassName:
      "bg-[color:var(--color-status-warning-surface)] text-[color:var(--color-status-warning)]",
  },
];

const extraContentItems: ExtraContentItem[] = [
  {
    title: "Podcast: Mente Blindada",
    meta: "Áudio • 12 min",
    Icon: Podcast,
    ActionIcon: CirclePlay,
  },
  {
    title: "Checklist: Treino de Viagem",
    meta: "PDF • 1.2 MB",
    Icon: BookOpenCheck,
    ActionIcon: Download,
  },
];

export const ExtrasScreen = () => (
  <ScreenFrame
    title="Extras"
    subtitle="Conteúdos premium para potencializar sua evolução na calistenia."
    rightSlot={
      <Sparkles className="h-5 w-5 text-[color:var(--color-action-primary)]" />
    }
  >
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border-default)] bg-[linear-gradient(135deg,var(--color-action-primary)_0%,var(--color-action-strong)_100%)] p-5 shadow-[var(--shadow-card-hover)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,var(--color-text-on-brand)_0%,transparent_48%)] opacity-20" />
        <BookOpenCheck className="pointer-events-none absolute -bottom-3 right-3 h-24 w-24 text-[color:var(--color-text-on-brand)] opacity-20" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-[color:var(--color-text-on-brand)] bg-[color:var(--color-action-primary-active)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[color:var(--color-text-on-brand)]">
            NOVO
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[color:var(--color-text-on-brand)]">
            Guia de Sobrevivência: Doces
          </h2>
          <p className="mt-2 max-w-[32ch] text-sm text-[color:var(--color-text-on-brand)]">
            Aprenda a lidar com a vontade de açúcar sem estragar sua dieta.
          </p>
          <button
            type="button"
            className="mt-5 rounded-lg bg-[color:var(--color-surface-card)] px-4 py-2.5 text-sm font-bold text-[color:var(--color-text-primary)] transition hover:opacity-90"
          >
            Acessar E-book
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {quickResourceCards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-3 shadow-[var(--shadow-sm)]"
          >
            <div
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${card.iconClassName}`}
            >
              <card.Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-xl font-bold leading-tight text-[color:var(--color-text-primary)]">
              {card.title}
            </h3>
            <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
              {card.description}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[color:var(--color-text-primary)]">
          Mais Conteúdos
        </h2>
        {extraContentItems.map((item) => (
          <article
            key={item.title}
            className="flex items-center justify-between rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-3"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-action-secondary-hover)] text-[color:var(--color-action-primary)]">
                <item.Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[color:var(--color-text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  {item.meta}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-section)] text-[color:var(--color-text-secondary)] transition hover:text-[color:var(--color-text-primary)]"
              aria-label={`Ação para ${item.title}`}
            >
              <item.ActionIcon className="h-4 w-4" />
            </button>
          </article>
        ))}
      </section>
    </div>
  </ScreenFrame>
);
