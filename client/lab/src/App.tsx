import React, { useState } from "react";
import {
  Dumbbell,
  CalendarRange,
  BookOpen,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Utensils,
  Moon,
  Calculator,
  Mic,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [ripples, setRipples] = useState<{
    [key: number]: { x: number; y: number; size: number; id: number }[];
  }>({});
  const [checkedDays, setCheckedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("cf-lab-checked-days");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const menus = [
    { icon: Dumbbell, name: "Treino" },
    { icon: CalendarRange, name: "Plano" },
    { icon: BookOpen, name: "Biblioteca" },
    { icon: TrendingUp, name: "Progresso" },
    { icon: Sparkles, name: "Extras" },
  ];

  const toggleDay = (day: number) => {
    setCheckedDays(prev => {
      const next = prev.includes(day)
        ? prev.filter(current => current !== day)
        : [...prev, day];
      localStorage.setItem("cf-lab-checked-days", JSON.stringify(next));
      return next;
    });
  };

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p
      className="font-body mb-3"
      style={{
        fontSize: "0.65rem",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--color-rose)",
      }}
    >
      {children}
    </p>
  );

  const handleItemClick = (
    e: React.MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    setActiveIndex(index);

    const li = e.currentTarget;
    const rect = li.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = { x, y, size, id: Date.now() };

    setRipples(prev => ({
      ...prev,
      [index]: [...(prev[index] || []), newRipple],
    }));

    setTimeout(() => {
      setRipples(prev => {
        const currentRipples = prev[index] || [];
        return {
          ...prev,
          [index]: currentRipples.filter(r => r.id !== newRipple.id),
        };
      });
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-ivory)] font-sans">
      <style>{`
        @keyframes ripple-animation {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        .ripple-span {
          position: absolute;
          border-radius: 50%;
          background-color: var(--color-rose-muted);
          animation: ripple-animation 600ms linear;
          pointer-events: none;
        }
        .page-card {
           background-color: white;
           border-radius: 2rem;
           border: 1px solid var(--color-taupe-light);
           box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .day-check {
          width: clamp(2rem, 8vw, 2.5rem);
          height: clamp(2rem, 8vw, 2.5rem);
          border-radius: 50%;
          border: 1px solid var(--color-taupe-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }
      `}</style>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-24 scroll-smooth">
        <div className="w-full">
          {activeIndex === 2 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 max-w-4xl mx-auto">
              {/* Hero Section */}
              <section className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-rose-muted)] text-[var(--color-rose)] text-[10px] font-bold tracking-widest uppercase">
                  Laboratório MVP · Biblioteca Confiável
                </div>
                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] leading-tight">
                  Alongamento Posterior
                </h1>
                <p className="text-[var(--color-taupe)] text-lg leading-relaxed">
                  Versão isolada para explorar valor percebido de biblioteca de
                  exercícios sem depender de vídeo humano em todos os
                  movimentos. O foco aqui é clareza de execução, segurança e
                  leitura rápida.
                </p>

                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-[var(--color-ivory-dark)] border border-white/50">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-posterior-meio-QF2RdDRJhYd6Pc9FQamCeg.webp"
                    alt="Alongamento posterior"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Objetivo", value: "Reduzir rigidez" },
                    { label: "Foco", value: "Posterior" },
                    { label: "Nível", value: "Iniciante" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/50 p-4 rounded-2xl border border-white/80"
                    >
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-[var(--color-tauest)] opacity-70">
                        {item.label}
                      </span>
                      <span className="block text-xs font-bold text-[var(--color-charcoal)] mt-1">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Steps Section */}
              <section className="pt-8 space-y-6">
                <h2 className="text-2xl font-heading text-[var(--color-charcoal)]">
                  Início, Meio e Fim
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Início", img: "TUbdLpewCBwXYRc9tPABcB" },
                    { title: "Meio", img: "QF2RdDRJhYd6Pc9FQamCeg" },
                    { title: "Fim", img: "RJBycfHoRwUZgLcNyURMPG" },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-white/80 group transform transition-all hover:-translate-y-1"
                    >
                      <img
                        src={`https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-posterior-${step.title.toLowerCase()}-${step.img}.webp`}
                        alt={step.title}
                        className="w-full aspect-[4/5] object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-heading text-lg">{step.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Execution Section */}
              <section className="pt-8 space-y-4">
                <h2 className="text-2xl font-heading text-[var(--color-charcoal)]">
                  Execução Correta
                </h2>
                <div className="bg-white/60 p-6 rounded-3xl border border-white/80 space-y-3 text-[var(--color-charcoal-light)]">
                  {[
                    "Pés na largura do quadril.",
                    "Destrave levemente os joelhos.",
                    "Dobre o quadril para trás e incline o tronco.",
                    "Sustente por alguns segundos respirando.",
                  ].map((li, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-rose-muted)] text-[var(--color-rose)] flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <p className="text-sm pt-0.5">{li}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : activeIndex === 3 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
              <section id="checklist" className="mb-6 mt-2">
                <SectionLabel>Progresso</SectionLabel>
                <h2
                  className="font-heading mb-2"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    color: "var(--color-charcoal)",
                    fontWeight: 400,
                  }}
                >
                  Progresso
                </h2>
                <div
                  style={{
                    width: "2.5rem",
                    height: "1px",
                    backgroundColor: "var(--color-rose)",
                    marginBottom: "2.8rem",
                  }}
                />

                <h2
                  className="font-heading mb-2"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--color-charcoal)",
                    fontWeight: 400,
                  }}
                >
                  Seus 28 dias
                </h2>
                <p
                  className="font-heading mb-6"
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-taupe)",
                    fontStyle: "italic",
                  }}
                >
                  Marque cada dia concluído. Veja sua constância tomar forma.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: "Primeiro treino", day: 1, icon: "✦" },
                    { label: "Primeira semana", day: 7, icon: "✦✦" },
                    { label: "Metade do desafio", day: 14, icon: "✦✦✦" },
                    { label: "Desafio concluído", day: 28, icon: "✦✦✦✦" },
                  ].map(milestone => {
                    const achieved = checkedDays.includes(milestone.day);
                    return (
                      <div
                        key={milestone.day}
                        className="px-4 py-3 rounded-2xl text-center"
                        style={{
                          backgroundColor: achieved
                            ? "var(--color-rose-muted)"
                            : "white",
                          border: `1px solid ${achieved ? "var(--color-rose-light)" : "var(--color-taupe-light)"}`,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <p
                          className="font-heading mb-1"
                          style={{
                            fontSize: "0.8rem",
                            color: achieved
                              ? "var(--color-rose)"
                              : "var(--color-taupe-light)",
                          }}
                        >
                          {milestone.icon}
                        </p>
                        <p
                          className="font-sans"
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            color: achieved
                              ? "var(--color-rose)"
                              : "var(--color-taupe)",
                          }}
                        >
                          {milestone.label}
                        </p>
                        <p
                          className="font-sans"
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--color-taupe)",
                            marginTop: "0.2rem",
                          }}
                        >
                          {achieved ? "Conquistado" : `Dia ${milestone.day}`}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <p className="font-sans mb-3 text-[0.65rem] font-medium tracking-[0.15em] uppercase text-[var(--color-taupe)]">
                    Marque os dias concluídos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 28 }, (_, i) => i + 1).map(day => {
                      const checked = checkedDays.includes(day);
                      return (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className="day-check"
                          style={{
                            backgroundColor: checked
                              ? "var(--color-rose)"
                              : "white",
                            borderColor: checked
                              ? "var(--color-rose)"
                              : "var(--color-taupe-light)",
                            color: checked ? "white" : "var(--color-taupe)",
                          }}
                          title={`Dia ${day}`}
                        >
                          {checked ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <span style={{ fontSize: "0.7rem" }}>{day}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p
                    className="font-sans mt-3"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-taupe)",
                      fontStyle: "italic",
                    }}
                  >
                    {checkedDays.length === 0
                      ? "Clique nos dias para marcar como concluído."
                      : checkedDays.length === 28
                        ? "Parabéns! Você completou os 28 dias."
                        : `${checkedDays.length} de 28 dias concluídos. Continue.`}
                  </p>
                </div>

                <div
                  className="mt-6 px-4 py-3 rounded-2xl"
                  style={{
                    backgroundColor: "var(--color-ivory-dark)",
                    borderLeft: "3px solid var(--color-taupe)",
                  }}
                >
                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-charcoal-light)",
                      lineHeight: 1.6,
                    }}
                  >
                    Constância não é fazer tudo perfeitamente. É aparecer na
                    maioria dos dias, mesmo quando não está com vontade.
                  </p>
                </div>

                {/* Visual Progress Chart */}
                <div className="mt-12 bg-white/40 p-6 rounded-3xl border border-white/80">
                  <SectionLabel>Visão Semanal</SectionLabel>
                  <p className="font-heading italic text-[var(--color-taupe)] text-sm mb-8">
                    Sua regularidade dividida por fases
                  </p>

                  <div className="flex h-36 gap-4 px-2">
                    {[1, 2, 3, 4].map(week => {
                      const daysInWeek = Array.from(
                        { length: 7 },
                        (_, i) => (week - 1) * 7 + i + 1
                      );
                      const completedCount = daysInWeek.filter(d =>
                        checkedDays.includes(d)
                      ).length;
                      const percentage = (completedCount / 7) * 100;

                      return (
                        <div
                          key={week}
                          className="flex-1 flex flex-col items-center h-full group"
                        >
                          {/* Background da barra (Track) */}
                          <div
                            className="relative w-8 sm:w-10 h-full rounded-full overflow-hidden flex items-end border border-[var(--color-taupe-light)]"
                            style={{ backgroundColor: "white" }}
                          >
                            {/* Barra preenchida */}
                            <motion.div
                              initial={{ height: "0%" }}
                              animate={{ height: `${percentage}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="w-full rounded-full"
                              style={{ backgroundColor: "var(--color-rose)" }}
                            />
                            {/* Hover label */}
                            {percentage > 0 && (
                              <div className="absolute inset-x-0 bottom-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-bold text-white drop-shadow-md">
                                  {completedCount}/7
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-taupe)] mt-3">
                            S0{week}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dashboard Stats (Moved to bottom) */}
                <div className="mt-10">
                  <SectionLabel>Estatística Atual</SectionLabel>
                  <p className="font-heading italic text-[var(--color-taupe)] text-sm mb-4">
                    Clareza de evolução em 28 dias
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Dias concluídos",
                        value: `${checkedDays.length}/28`,
                      },
                      {
                        label: "Sequência",
                        value: `${(() => {
                          if (checkedDays.length === 0) return 0;
                          const sorted = [...checkedDays].sort((a, b) => a - b);
                          let maxStreak = 0;
                          let currentStreak = 0;
                          for (let i = 0; i < sorted.length; i++) {
                            if (i > 0 && sorted[i] === sorted[i - 1] + 1) {
                              currentStreak++;
                            } else {
                              currentStreak = 1;
                            }
                            maxStreak = Math.max(maxStreak, currentStreak);
                          }
                          return maxStreak;
                        })()} dias`,
                      },
                      {
                        label: "Semana atual",
                        value: Math.ceil(
                          (Math.max(...checkedDays, 0) || 1) / 7
                        ),
                      },
                      {
                        label: "Próximo dia",
                        value:
                          Math.max(...checkedDays, 0) + 1 > 28
                            ? 28
                            : Math.max(...checkedDays, 0) + 1,
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white p-5 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[var(--color-taupe-light)] opacity-90 transition-all hover:shadow-md"
                      >
                        <p className="text-[10px] font-sans font-medium uppercase tracking-wider text-[var(--color-taupe)] mb-1.5">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-heading font-bold text-[var(--color-charcoal)] leading-none">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  {[1, 2, 3, 4].map(week => (
                    <button
                      key={week}
                      className="group flex items-center justify-between px-4 py-3.5 rounded-2xl font-sans transition-all duration-300 active:scale-95 bg-white border border-[var(--color-taupe-light)] hover:border-[var(--color-rose-light)] hover:shadow-md"
                    >
                      <span className="text-xs font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-rose)] transition-colors">
                        Semana {week}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--color-taupe)] group-hover:text-[var(--color-rose)] group-hover:translate-x-0.5 transition-all"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          ) : activeIndex === 4 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
              <section>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-heading text-[var(--color-charcoal)] mb-1">
                      Extras
                    </h2>
                    <p className="text-[var(--color-taupe)] text-sm">
                      Conteúdos premium para potencializar sua evolução na
                      calistenia.
                    </p>
                  </div>
                  <Sparkles
                    className="text-[var(--color-rose)] opacity-50"
                    size={20}
                  />
                </div>

                {/* Featured Card */}
                <div className="mt-8 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#536976] to-[#292E49] p-8 text-white shadow-xl">
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">
                      Novo
                    </span>
                    <h3 className="text-2xl font-heading font-bold mb-3 leading-tight max-w-[200px]">
                      Guia de Sobrevivência: Doces
                    </h3>
                    <p className="text-white/70 text-sm mb-6 max-w-[220px]">
                      Aprenda a lidar com a vontade de açúcar sem estragar sua
                      dieta.
                    </p>
                    <button className="px-6 py-2.5 bg-white text-[var(--color-charcoal)] rounded-xl text-xs font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg">
                      Acessar E-book
                    </button>
                  </div>
                  {/* Decorative element (SVG Icon inspired by image) */}
                  <div className="absolute bottom-[-10%] right-[-5%] opacity-10 rotate-12">
                    <BookOpen size={180} />
                  </div>
                </div>

                {/* Grid Resources */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-6 rounded-[2rem] border border-[var(--color-taupe-light)] shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
                      <Utensils size={20} />
                    </div>
                    <h4 className="font-heading font-bold text-[var(--color-charcoal)] leading-tight mb-2">
                      Cardápio 1500 kcal
                    </h4>
                    <p className="text-[10px] text-[var(--color-taupe)] uppercase tracking-wider">
                      Plano alimentar completo
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-[var(--color-taupe-light)] shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 mb-4">
                      <Moon size={20} />
                    </div>
                    <h4 className="font-heading font-bold text-[var(--color-charcoal)] leading-tight mb-2">
                      Alongamento Sono
                    </h4>
                    <p className="text-[10px] text-[var(--color-taupe)] uppercase tracking-wider">
                      Rotina relaxante noturna
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-[var(--color-taupe-light)] shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
                      <Calculator size={20} />
                    </div>
                    <h4 className="font-heading font-bold text-[var(--color-charcoal)] leading-tight mb-2">
                      Calculadora TMB
                    </h4>
                    <p className="text-[10px] text-[var(--color-taupe)] uppercase tracking-wider">
                      Calcule seu gasto diário
                    </p>
                  </div>
                </div>

                {/* Final List */}
                <div className="mt-10">
                  <h2 className="text-xl font-heading text-[var(--color-charcoal)] mb-6">
                    Mais Conteúdos
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white flex items-center justify-between p-4 rounded-2xl border border-[var(--color-taupe-light)] shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-ivory-dark)] flex items-center justify-center text-[var(--color-taupe)]">
                          <Mic size={20} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[var(--color-charcoal)]">
                            Podcast: Mente Blindada
                          </h5>
                          <p className="text-[10px] text-[var(--color-taupe)]">
                            Áudio • 12 min
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors">
                        <TrendingUp size={14} className="rotate-90" />{" "}
                        {/* Symbolizing play or icon from image */}
                      </button>
                    </div>

                    <div className="bg-white flex items-center justify-between p-4 rounded-2xl border border-[var(--color-taupe-light)] shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-ivory-dark)] flex items-center justify-center text-[var(--color-taupe)]">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[var(--color-charcoal)]">
                            Checklist: Treino de Viagem
                          </h5>
                          <p className="text-[10px] text-[var(--color-taupe)]">
                            PDF • 1.2 MB
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh] text-[var(--color-taupe)] animate-pulse">
              <span className="text-xl font-heading italic">
                Conteúdo de {menus[activeIndex].name} em desenvolvimento...
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Full-width Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[42px] bg-white flex justify-center shadow-[0_-4px_12px_rgba(0,0,0,0.03)] overflow-hidden z-50">
        <ul className="flex w-[350px] relative">
          {/* Active Indicator SVG */}
          <div
            className="absolute top-0 left-[-40px] w-[150px] h-[42px] z-0 transition-transform duration-500"
            style={{
              transform: `translateX(${activeIndex * 70}px)`,
              transitionTimingFunction:
                "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            }}
          >
            <svg
              width="150"
              height="42"
              viewBox="0 0 150 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_8px_20px_rgba(139,74,82,0.35)] overflow-visible"
            >
              <defs>
                <linearGradient
                  id="bubble-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8b4a52" />
                  <stop offset="50%" stopColor="#a35d66" />
                  <stop offset="100%" stopColor="#8b4a52" />
                </linearGradient>
              </defs>
              <path
                d="M 10 0 C 30 0, 40 42, 75 42 C 110 42, 120 0, 140 0 Z"
                fill="url(#bubble-gradient)"
              />
            </svg>
          </div>

          {/* Menu Items */}
          {menus.map((menu, index) => {
            const isActive = activeIndex === index;
            return (
              <li
                key={index}
                className="relative w-[70px] h-[42px] z-10 cursor-pointer"
                onClick={e => handleItemClick(e, index)}
              >
                {/* Ripple Container */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  {ripples[index]?.map(ripple => (
                    <span
                      key={ripple.id}
                      className="ripple-span"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                    />
                  ))}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full h-full">
                  <span
                    className={`relative block transition-all duration-500 ${
                      isActive
                        ? "-translate-y-2.5 scale-110"
                        : "translate-y-0 scale-100"
                    }`}
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  >
                    <menu.icon
                      className={`w-4 h-4 transition-colors duration-500 ${
                        isActive ? "text-white" : "text-[var(--color-taupe)]"
                      }`}
                    />
                  </span>
                  <span
                    className={`absolute text-[8px] transition-all duration-500 whitespace-nowrap ${
                      isActive
                        ? "opacity-100 translate-y-3 text-white font-medium"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  >
                    {menu.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
