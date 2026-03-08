import { Link } from "react-router-dom";
import { ScreenFrame } from "../../components/ScreenFrame";
import { faqItems, supportLinks } from "../../data/supportContent";

export const SupportScreen = () => (
  <ScreenFrame
    title="FAQ e Apoios"
    subtitle="Suporte leve para manter consistência"
  >
    <div className="space-y-3" id="faq">
      {faqItems.map((item) => (
        <article
          key={item.question}
          className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4"
        >
          <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
            {item.question}
          </h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {item.answer}
          </p>
        </article>
      ))}

      <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
        <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
          Canais de apoio
        </h3>
        <div className="mt-2 flex flex-col gap-2 text-sm text-[color:var(--color-link-default)]">
          {supportLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <Link
        to="/app/perfil"
        className="block text-center text-xs text-[color:var(--color-text-secondary)]"
      >
        Voltar para perfil
      </Link>
    </div>
  </ScreenFrame>
);
