export type InstitutionalSlug =
  | "sobre"
  | "contato"
  | "politica-de-privacidade"
  | "termos-de-servico"
  | "aviso-legal";

export interface SiteLink {
  label: string;
  href: string;
  external?: boolean;
}

export const siteConfig = {
  brandName: "Calistenia Feminina Sob Medida",
  brandShortName: "Calistenia Feminina",
  brandTagline: "Sob medida",
  supportEmail: "sac@semprenamoda.com.br",
  supportPhone: "(62) 99991-8702",
  cnpj: "41.024.752/0001-70",
  blogUrl: "https://semprenamoda.com.br/blogs/todos-os-posts",
  gtmId: "GTM-M4CHW3MC",
} as const;

export const productRoutes = {
  home: "/",
  biblioteca: "/biblioteca",
  checklist: "/checklist",
  faq: "/faq",
  apoio: "/apoio",
} as const;

export const standaloneRoutes = {
  receitasLowCarb: "/receitas-low-carb/",
} as const;

export const institutionalSlugs: Record<
  "sobre" | "contato" | "privacidade" | "termos" | "avisoLegal",
  InstitutionalSlug
> = {
  sobre: "sobre",
  contato: "contato",
  privacidade: "politica-de-privacidade",
  termos: "termos-de-servico",
  avisoLegal: "aviso-legal",
};

function normalizeBasePath(baseValue: string): string {
  if (!baseValue) return "/";
  return baseValue.endsWith("/") ? baseValue : `${baseValue}/`;
}

export function getBasePath(): string {
  return normalizeBasePath(import.meta.env.BASE_URL || "/");
}

export function toPublicPath(pathOrSlug: string): string {
  const normalized = pathOrSlug.replace(/^\/+/, "");
  return `${getBasePath()}${normalized}`;
}

export function toSpaHashPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getBasePath()}#${normalized}`;
}

export const socialLinks: SiteLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/semprenamoda.loja/",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/semprenamoda.loja/",
    external: true,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/semprenamodaloja/",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@semprenamodaloja?sub_confirmation=1",
    external: true,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@semprenamoda.loja/",
    external: true,
  },
];

export const footerHelpLinks: SiteLink[] = [
  { label: "Sobre Nós", href: toPublicPath(institutionalSlugs.sobre) },
  { label: "Biblioteca", href: toSpaHashPath(productRoutes.biblioteca) },
  { label: "Checklist", href: toSpaHashPath(productRoutes.checklist) },
  {
    label: "Perguntas Frequentes - FAQ",
    href: toSpaHashPath(productRoutes.faq),
  },
  { label: "Apoio", href: toSpaHashPath(productRoutes.apoio) },
  { label: "Contato", href: toPublicPath(institutionalSlugs.contato) },
  {
    label: "Veja: BLOG Sempre Na Moda 🧡",
    href: siteConfig.blogUrl,
    external: true,
  },
];

export const footerInstitutionalLinks: SiteLink[] = [
  {
    label: "Política de Privacidade",
    href: toPublicPath(institutionalSlugs.privacidade),
  },
  {
    label: "Termos de Serviço",
    href: toPublicPath(institutionalSlugs.termos),
  },
  { label: "Aviso Legal", href: toPublicPath(institutionalSlugs.avisoLegal) },
];

export const institutionalHeaderLinks: Array<{
  label: string;
  slug: InstitutionalSlug;
}> = [
  { label: "Sobre", slug: institutionalSlugs.sobre },
  { label: "Contato", slug: institutionalSlugs.contato },
  { label: "Privacidade", slug: institutionalSlugs.privacidade },
  { label: "Termos", slug: institutionalSlugs.termos },
  { label: "Aviso Legal", slug: institutionalSlugs.avisoLegal },
];
