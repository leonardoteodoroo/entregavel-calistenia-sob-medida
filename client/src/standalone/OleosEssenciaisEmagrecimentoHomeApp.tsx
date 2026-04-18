import BonusVisual from "@/components/bonus/BonusVisual";
import {
  Waves,
  Target,
  Sun,
  Zap,
  Sparkles,
  Flower2,
  FlaskConical,
  User,
  ArrowRight,
} from "lucide-react";

import type {
  OleosHomeViewModel,
  OleosSectionId,
} from "./oleosEssenciaisEmagrecimentoMvpData";
import { toPublicPath } from "@/content/siteConfig";

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
      className="min-h-[100dvh] pb-24"
      style={{
        backgroundColor: "#faf7f1", // bg-warm do design premium
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 
          BARRA DE NAVEGAÇÃO SUPERIOR (ESTILO PREMIUM) 
      */}
      <nav className="sticky top-0 w-full z-40 bg-[#faf7f1]/80 backdrop-blur-xl border-b border-[#e5e7eb]/30">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2f4e35] flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-[#2f3b31] tracking-tight italic">
              Digital Apothecary
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-stone-200 overflow-hidden border border-[#d1cfc7]">
            <User size={18} className="m-auto mt-1 text-stone-500" />
          </div>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        {/* 
            HERO SECTION EDITORIAL 
        */}
        <header className="pt-12 pb-16 md:pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-[#2f4e35] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">
                Guia Interativo de Bolso
              </span>
              <h1 className="text-[2.75rem] md:text-[3.5rem] font-light text-[#2f3b31] leading-[1.1] mb-6">
                {viewModel.title}
              </h1>
              <p className="text-[#4f544d] text-lg leading-relaxed max-w-[90%] mb-8">
                {viewModel.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenSection("section:oleos-essenciais")}
                  className="bg-[#2f4e35] text-white px-8 py-4 rounded-full font-bold tracking-widest text-[10px] uppercase hover:shadow-lg transition-all active:scale-95"
                >
                  Explorar Óleos
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/5] md:aspect-square rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-black/5">
                <BonusVisual
                  visual={viewModel.heroVisual}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </header>

        {/* 
            EMOTIONAL HOTSPOTS (NOVOS CARDS INTERATIVOS) 
        */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold text-[#2f3b31]">
              Focos de Ação Emocional
            </h2>
            <div className="h-px flex-1 mx-8 bg-[#d1cfc7]/30 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Anxiety */}
            <div className="aspect-[3/4] bg-[#e6f0e4] rounded-3xl overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all duration-500">
              <img
                src={toPublicPath(
                  "assets/images/bonus/oleos/anxiety-hotspot.png"
                )}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                alt="Apoio para Ansiedade"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-[#2f3b31]/40 to-transparent">
                <Waves className="text-[#2f4e35]" size={24} strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-bold text-[#1a241c]">
                    Ansiedade
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2f4e35]/80">
                    Aterramento
                  </p>
                </div>
              </div>
            </div>

            {/* Compulsion */}
            <div className="aspect-[3/4] bg-[#f8e7e0] rounded-3xl overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all duration-500 md:mt-8">
              <img
                src={toPublicPath(
                  "assets/images/bonus/oleos/hero-apothecary.png"
                )}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                alt="Compulsão"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-[#3d2a23]/50 to-transparent text-white">
                <Target size={24} strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-bold">Compulsão</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    Clareza e Saciedade
                  </p>
                </div>
              </div>
            </div>

            {/* Fatigue */}
            <div className="aspect-[3/4] bg-[#f4e9d9] rounded-3xl overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all duration-500 lg:mt-0">
              <img
                src={toPublicPath(
                  "assets/images/bonus/oleos/hero-apothecary.png"
                )}
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                alt="Fadiga"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-[#3d321d]/40 to-transparent text-[#2f3b31]">
                <Sun size={24} strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-bold">Fadiga</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    Vigor Matinal
                  </p>
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div className="aspect-[3/4] bg-[#e6f0e4] rounded-3xl overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all duration-500 md:mt-8">
              <img
                src={toPublicPath(
                  "assets/images/bonus/oleos/hero-apothecary.png"
                )}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                alt="Motivação"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-[#2f3b31]/40 to-transparent">
                <Zap className="text-[#2f4e35]" size={24} strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-bold text-[#1a241c]">
                    Motivação
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2f4e35]/80">
                    Foco no Objetivo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
            SEÇÃO DE CONTEÚDO DINÂMICO (EDITORIAL BLOCKS) 
        */}
        <section className="mb-20 grid gap-8 md:grid-cols-2">
          {viewModel.editorialBlocks.map(block => (
            <article
              key={block.title}
              className="rounded-[32px] border bg-white p-8 shadow-[0_20px_50px_-20px_rgba(36,26,18,0.15)]"
              style={{ borderColor: "rgba(201, 182, 155, 0.2)" }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-[#2f3b31]">
                {block.title}
              </h2>
              {block.paragraphs.map(paragraph => (
                <p
                  key={paragraph}
                  className="mb-4 text-base leading-relaxed text-[#4f544d]"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        {/* 
            METABOLISM SECTION (NOVO COMPONENTE VISUAL) 
        */}
        <section className="mb-20">
          <div className="bg-[#e6f0e4] rounded-[40px] overflow-hidden p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-48 h-72 flex-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={toPublicPath(
                  "assets/images/bonus/oleos/botanical-metabolism.png"
                )}
                className="w-full h-full object-cover"
                alt="Ativação Metabólica"
              />
              {/* Pontos de Pulso Animados */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white ring-8 ring-white/20 animate-pulse"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#2f4e35] ring-8 ring-[#2f4e35]/20 animate-pulse delay-700"></div>
              </div>
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white ring-8 ring-white/20 animate-pulse delay-300"></div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl leading-tight text-[#2f3b31] font-semibold">
                Pontos de <br />
                <span className="italic text-[#2f4e35] font-normal">
                  Ativação Metabólica
                </span>
              </h2>
              <p className="text-[#4f544d] leading-relaxed">
                A aplicação tópica em pontos estratégicos potencializa a
                absorção dos compostos voláteis, trabalhando em sinergia com o
                seu sistema endócrino.
              </p>
              <ul className="grid gap-6 sm:grid-cols-2">
                <li className="flex gap-4 items-start">
                  <span className="text-[#2f4e35] font-bold text-lg">01</span>
                  <div>
                    <p className="font-bold text-sm text-[#2f3b31]">
                      Plexo Solar
                    </p>
                    <p className="text-xs text-[#5b6058] mt-1">
                      Aplique óleos cítricos em movimentos circulares para
                      estimular o calor digestivo.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-[#2f4e35] font-bold text-lg">02</span>
                  <div>
                    <p className="font-bold text-sm text-[#2f3b31]">
                      Pontos de Pulso
                    </p>
                    <p className="text-xs text-[#5b6058] mt-1">
                      Essência de gengibre nos pulsos para revigorar o fluxo
                      sistêmico.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 
            SEÇÕES DO CONTEÚDO (APRENDIZADO E PROTOCOLOS) 
        */}
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-semibold text-[#2f3b31]">
            Explorar Protocolos
          </h2>
          <div className="h-px flex-1 bg-[#d1cfc7]/30"></div>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {viewModel.sectionCards.map(card => {
            const accent = ACCENT_STYLES[card.accent];

            return (
              <article
                key={card.id}
                className="rounded-[32px] border bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                style={{ borderColor: "rgba(201, 182, 155, 0.2)" }}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: accent.badgeBg,
                        color: accent.badgeText,
                      }}
                    >
                      {card.count} conteúdos
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-[#2f3b31]">
                    {card.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-[#5b6058]">
                    {card.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenSection(card.id)}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold uppercase tracking-widest transition-all hover:opacity-90"
                  style={{
                    backgroundColor: accent.buttonBg,
                    color: accent.buttonText,
                  }}
                >
                  Abrir seção
                  <ArrowRight size={14} />
                </button>
              </article>
            );
          })}
        </section>
      </div>

      {/* 
          BARRA DE NAVEGAÇÃO INFERIOR ESTILO APP 
      */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-[2.5rem] bg-white/80 backdrop-blur-xl shadow-[0_-12px_40px_-10px_rgba(27,28,28,0.1)] border-t border-[#e5e7eb]/20">
        <div className="flex justify-around items-center px-4 pb-8 pt-5 max-w-lg mx-auto">
          <button className="flex flex-col items-center justify-center text-[#2f4e35]">
            <Sparkles size={22} strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1.5">
              Início
            </span>
          </button>
          <button className="flex flex-col items-center justify-center text-stone-400">
            <Flower2 size={22} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1.5">
              Rituais
            </span>
          </button>
          <button className="flex flex-col items-center justify-center text-stone-400">
            <FlaskConical size={22} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1.5">
              Botânica
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
