export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Perdi um dia. Preciso recomeçar?',
    answer: 'Não. Retome no próximo dia útil com o modo leve para manter consistência.',
  },
  {
    question: 'Sinto desconforto no joelho. O que fazer?',
    answer: 'Ative modo de baixo impacto e prefira adaptações com menor amplitude.',
  },
  {
    question: 'Não tenho barra. Consigo seguir?',
    answer: 'Sim. A biblioteca e o assistente sempre mostram substituições sem equipamento.',
  },
  {
    question: 'Quanto tempo por sessão?',
    answer: 'Entre 10 e 20 minutos, de acordo com seu ajuste de onboarding.',
  },
];

export const supportLinks = [
  { label: 'Suporte por e-mail', href: 'mailto:suporte@semprenamoda.com.br' },
  { label: 'FAQ rápido', href: '#faq' },
  { label: 'Guia de retorno', href: '#reativacao' },
];
