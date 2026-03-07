import { Link } from 'react-router-dom';
import { ScreenFrame } from '../../components/ScreenFrame';
import { faqItems, supportLinks } from '../../data/supportContent';

export const SupportScreen = () => (
  <ScreenFrame title="FAQ e Apoios" subtitle="Suporte leve para manter consistência">
    <div className="space-y-3" id="faq">
      {faqItems.map((item) => (
        <article key={item.question} className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-white">{item.question}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-muted-text)]">{item.answer}</p>
        </article>
      ))}

      <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] p-4">
        <h3 className="text-sm font-semibold text-white">Canais de apoio</h3>
        <div className="mt-2 flex flex-col gap-2 text-sm text-[color:var(--color-accent)]">
          {supportLinks.map((link) => (
            <a key={link.label} href={link.href} className="underline underline-offset-4">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <Link to="/app/perfil" className="block text-center text-xs text-[color:var(--color-muted-text)]">
        Voltar para perfil
      </Link>
    </div>
  </ScreenFrame>
);
