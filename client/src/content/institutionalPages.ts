import {
  institutionalSlugs,
  productRoutes,
  siteConfig,
  toSpaHashPath,
  type InstitutionalSlug,
} from "./siteConfig";

export interface InstitutionalTopic {
  title: string;
  body: string;
}

export interface InstitutionalFaqItem {
  q: string;
  a: string;
}

export interface InstitutionalInfoCard {
  label: string;
  value: string;
  href?: string;
  tone?: "default" | "subtle";
}

export interface InstitutionalActionLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface InstitutionalPageContent {
  slug: InstitutionalSlug;
  sectionLabel: string;
  title: string;
  subtitle: string;
  introParagraphs?: string[];
  infoCards?: InstitutionalInfoCard[];
  callout?: string;
  actionLinks?: InstitutionalActionLink[];
  topics?: InstitutionalTopic[];
  faqTitle?: string;
  faqItems?: InstitutionalFaqItem[];
  contactPrefix?: string;
}

const supportEmailMailto = `mailto:${siteConfig.supportEmail}`;

export const institutionalPages: Record<
  InstitutionalSlug,
  InstitutionalPageContent
> = {
  sobre: {
    slug: institutionalSlugs.sobre,
    sectionLabel: "Sobre o projeto",
    title: siteConfig.brandName,
    subtitle: "Treino possível para mulheres reais, com rotina real.",
    introParagraphs: [
      "Este produto foi criado para mulheres iniciantes ou em retomada que querem consistência sem treino extremo. A proposta é simples: sessões curtas em casa, com progressão em 28 dias e foco em continuidade.",
      "O conteúdo inclui estrutura semanal, biblioteca de exercícios, checklist de constância e respostas para dúvidas mais frequentes. O objetivo principal é ajudar você a voltar a se mover com segurança e confiança.",
      "Seguimos evoluindo a experiência visual e o suporte do programa em ciclos contínuos, mantendo o compromisso com clareza, acessibilidade e aplicação prática no dia a dia.",
    ],
    contactPrefix: "Contato oficial de suporte:",
  },
  contato: {
    slug: institutionalSlugs.contato,
    sectionLabel: "Atendimento",
    title: "Contato e suporte",
    subtitle: "Canal direto para dúvidas do produto e continuidade do plano.",
    infoCards: [
      {
        label: "Email oficial",
        value: siteConfig.supportEmail,
        href: supportEmailMailto,
      },
      {
        label: "Telefone informativo",
        value: siteConfig.supportPhone,
        tone: "subtle",
      },
    ],
    callout:
      "O foco deste produto é constância com treinos curtos e seguros. Antes de abrir chamado, confira FAQ e apoio: muitas respostas já estão mapeadas para agilizar sua evolução.",
    actionLinks: [
      { label: "Abrir FAQ", href: toSpaHashPath(productRoutes.faq) },
      { label: "Ir para Apoio", href: toSpaHashPath(productRoutes.apoio) },
      {
        label: "Abrir Biblioteca",
        href: toSpaHashPath(productRoutes.biblioteca),
      },
    ],
    faqTitle: "Perguntas frequentes antes do contato",
    faqItems: [
      {
        q: "Não encontrei o link de acesso. O que faço?",
        a: "Verifique caixa de entrada, spam e promoções do e-mail da compra. Se ainda não localizar, fale com o suporte pelo e-mail oficial.",
      },
      {
        q: "Perdi alguns dias de treino. Preciso recomeçar tudo?",
        a: "Não. Use o protocolo da página de apoio para retomar com segurança de acordo com o tempo de pausa.",
      },
      {
        q: "Sou iniciante total. Esse plano é para mim?",
        a: "Sim. O programa foi estruturado para iniciantes e retomada, com adaptação de intensidade em cada dia.",
      },
      {
        q: "Onde encontro biblioteca, checklist e FAQ?",
        a: "Use os links de produto para navegar entre Biblioteca, Checklist, FAQ e Apoio sem perder seu progresso.",
      },
      {
        q: "Quando devo entrar em contato por e-mail?",
        a: "Quando houver dúvidas de acesso, dificuldade para continuar o plano ou necessidade de orientação adicional.",
      },
    ],
  },
  "politica-de-privacidade": {
    slug: institutionalSlugs.privacidade,
    sectionLabel: "Institucional",
    title: "Política de Privacidade",
    subtitle:
      "Diretrizes objetivas de tratamento de dados para este produto digital.",
    topics: [
      {
        title: "Dados coletados",
        body: "Podemos utilizar dados básicos de navegação e informações fornecidas por você para garantir acesso ao produto, suporte e comunicação relacionada ao serviço.",
      },
      {
        title: "Finalidade de uso",
        body: "Os dados são usados para operação do produto digital, melhoria da experiência, atendimento de suporte e cumprimento de obrigações legais aplicáveis.",
      },
      {
        title: "Compartilhamento",
        body: "Não comercializamos seus dados pessoais. O compartilhamento ocorre apenas quando necessário para processamento técnico e prestação do serviço.",
      },
      {
        title: "Segurança e retenção",
        body: "Adotamos medidas razoáveis de proteção e mantemos dados somente pelo período necessário para a finalidade informada e obrigações legais.",
      },
      {
        title: "Seus direitos",
        body: "Você pode solicitar informações, atualização ou exclusão de dados dentro dos limites legais pelo canal oficial de suporte.",
      },
    ],
    contactPrefix: "Dúvidas sobre privacidade:",
  },
  "termos-de-servico": {
    slug: institutionalSlugs.termos,
    sectionLabel: "Institucional",
    title: "Termos de Serviço",
    subtitle: "Regras essenciais para o uso responsável deste produto digital.",
    topics: [
      {
        title: "Uso do conteúdo",
        body: "O acesso ao material é destinado ao uso pessoal da aluna, sendo proibida cópia, redistribuição, revenda ou reprodução pública sem autorização.",
      },
      {
        title: "Natureza do produto",
        body: "Este é um produto digital com orientação educacional de treino. Não substitui avaliação médica individualizada.",
      },
      {
        title: "Responsabilidade de uso",
        body: "A execução dos exercícios deve respeitar seus limites. Em caso de dor aguda, lesão ou condição clínica, interrompa e busque orientação profissional.",
      },
      {
        title: "Atualizações do programa",
        body: "O conteúdo pode receber melhorias e ajustes de estrutura para evolução da experiência, preservando o propósito principal do produto.",
      },
      {
        title: "Canal oficial",
        body: "Qualquer dúvida sobre acesso, uso e suporte deve ser tratada pelo e-mail oficial informado neste projeto.",
      },
    ],
    contactPrefix: "Contato para termos e uso:",
  },
  "aviso-legal": {
    slug: institutionalSlugs.avisoLegal,
    sectionLabel: "Institucional",
    title: "Aviso Legal",
    subtitle: "Transparência, responsabilidade e proteção de conteúdo.",
    topics: [
      {
        title: "Propriedade intelectual",
        body: "Textos, estrutura, identidade visual e conteúdos deste produto são protegidos por direitos autorais e não podem ser reproduzidos sem autorização.",
      },
      {
        title: "Limitação de responsabilidade",
        body: "Os conteúdos têm objetivo educacional e de orientação geral. Resultados variam conforme rotina, consistência e contexto individual.",
      },
      {
        title: "Condições de acesso",
        body: "Podemos ajustar estrutura e organização do ambiente digital para melhoria contínua da experiência da aluna.",
      },
      {
        title: "Referências externas",
        body: "Links para plataformas externas são fornecidos para conveniência e podem ter políticas próprias de uso e privacidade.",
      },
    ],
    contactPrefix: "Canal institucional:",
  },
};
