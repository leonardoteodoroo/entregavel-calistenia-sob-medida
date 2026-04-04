import React, { useState } from "react";
import {
  Menu,
  ArrowLeft,
  MoreVertical,
  Calendar,
  Droplet,
  Leaf,
  Trees,
  FlaskConical,
  Snowflake,
  Sun,
  Waves,
  Target,
  Zap,
  User,
  Flower2,
  Sparkles,
  MoveRight,
  MoveLeft,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"apothecary" | "ritual">(
    "apothecary"
  );

  return (
    <div className="bg-stone-200 min-h-screen flex items-center justify-center font-sans">
      {/* Mobile Device Container */}
      <div className="w-full max-w-[420px] h-[100dvh] md:h-[850px] bg-bg-warm md:rounded-[40px] md:shadow-2xl overflow-hidden relative flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          {activeTab === "apothecary" ? <ApothecaryView /> : <RitualView />}
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full z-50 rounded-t-[2rem] bg-bg-warm/90 backdrop-blur-xl shadow-[0_-12px_24px_-4px_rgba(27,28,28,0.06)]">
          <div className="flex justify-around items-center px-4 pb-8 pt-4">
            <button
              onClick={() => setActiveTab("apothecary")}
              className={`flex flex-col items-center justify-center transition-all duration-500 ${
                activeTab === "apothecary"
                  ? "bg-primary-light/50 text-primary-dark rounded-full px-5 py-2 scale-100"
                  : "text-stone-400 hover:text-primary-dark scale-90"
              }`}
            >
              <Sparkles
                size={20}
                strokeWidth={activeTab === "apothecary" ? 2 : 1.5}
              />
              <span className="text-[10px] uppercase tracking-widest font-semibold mt-1">
                Focus
              </span>
            </button>
            <button
              onClick={() => setActiveTab("ritual")}
              className={`flex flex-col items-center justify-center transition-all duration-500 ${
                activeTab === "ritual"
                  ? "bg-primary-dark text-white rounded-full px-5 py-2 scale-100"
                  : "text-stone-400 hover:text-primary-dark scale-90"
              }`}
            >
              <Flower2
                size={20}
                strokeWidth={activeTab === "ritual" ? 2 : 1.5}
              />
              <span className="text-[10px] uppercase tracking-widest font-semibold mt-1">
                Rituals
              </span>
            </button>
            <button className="flex flex-col items-center justify-center text-stone-400 hover:text-primary-dark transition-all scale-90 duration-500">
              <FlaskConical size={20} strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest font-semibold mt-1">
                Apothecary
              </span>
            </button>
            <button className="flex flex-col items-center justify-center text-stone-400 hover:text-primary-dark transition-all scale-90 duration-500">
              <User size={20} strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest font-semibold mt-1">
                Profile
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function ApothecaryView() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Navigation */}
      <nav className="sticky top-0 w-full z-40 bg-bg-warm/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 h-16 w-full">
          <button className="text-primary-dark hover:bg-stone-200/50 transition-colors p-2 rounded-full -ml-2">
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <span className="text-xl font-serif text-primary-dark tracking-tight italic">
            Apothecary
          </span>
          <div className="h-8 w-8 rounded-full bg-stone-200 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="User profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvP-zyj-M42fouFXzlUIjY5KoXqFVF4zUAzSQJNr9Ze6pb-TlP-p9NAYQ0kS52wFncq16cXjWGp9wZVHwyBVu1ZST0CVrYSmk2nEBu2UD8aZoWpA3jGBHUl9K39rBGYbDtHx4ZOxHxN3eYWkwQNzSIMhTEyGv7Ol9W-gc_PIScpbwHKDIOTYGUlQIdw9FqeSb6S75_VILXqn4uGSc6UgTM2kAgUffuDsNTwzAKskWwJrQHOHZJxeVXKcgx1BAIF1WXaB9Z4b2wN2Wc"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </nav>

      <main className="pt-8 pb-12 px-6">
        {/* Hero Section */}
        <header className="mb-12">
          <span className="text-primary-dark uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
            Interactive Pocket Guide
          </span>
          <h1 className="font-serif text-[2.75rem] font-light text-stone-900 leading-[1.1] mb-6">
            Mapping the{" "}
            <span className="italic font-medium text-primary-dark">Self</span>
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed max-w-[90%]">
            A curation of botanical wisdom designed to recalibrate your internal
            landscape through the art of essential oils.
          </p>
        </header>

        {/* Emotional Hotspots Grid */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl mb-8 ml-1 text-stone-900">
            Emotional Hotspots
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Anxiety */}
            <div className="aspect-square bg-card-1 rounded-2xl p-5 flex flex-col justify-between group cursor-pointer hover:bg-stone-200 transition-all duration-500">
              <div className="flex justify-between items-start">
                <Waves
                  className="text-primary-dark group-hover:scale-110 transition-transform"
                  size={24}
                  strokeWidth={1.5}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  01
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-1 text-stone-900">
                  Anxiety
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Grounding Rituals
                </p>
              </div>
            </div>

            {/* Compulsion */}
            <div className="aspect-square bg-card-2 rounded-2xl p-5 flex flex-col justify-between text-white group cursor-pointer hover:opacity-90 transition-all duration-500 mt-8">
              <div className="flex justify-between items-start">
                <Target
                  className="group-hover:scale-110 transition-transform"
                  size={24}
                  strokeWidth={1.5}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                  02
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-1">Compulsion</h3>
                <p className="text-xs opacity-80 font-medium">Clarity & Ease</p>
              </div>
            </div>

            {/* Fatigue */}
            <div className="aspect-square bg-card-3 rounded-2xl p-5 flex flex-col justify-between text-stone-800 group cursor-pointer hover:opacity-90 transition-all duration-500 -mt-8">
              <div className="flex justify-between items-start">
                <Sun
                  className="group-hover:scale-110 transition-transform"
                  size={24}
                  strokeWidth={1.5}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                  03
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-1">Fatigue</h3>
                <p className="text-xs opacity-80 font-medium">
                  Vibrant Essence
                </p>
              </div>
            </div>

            {/* Motivation */}
            <div className="aspect-square bg-card-4 rounded-2xl p-5 flex flex-col justify-between group cursor-pointer hover:bg-stone-300 transition-all duration-500">
              <div className="flex justify-between items-start">
                <Zap
                  className="text-stone-700 group-hover:scale-110 transition-transform"
                  size={24}
                  strokeWidth={1.5}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  04
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-1 text-stone-900">
                  Motivation
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Ignite Purpose
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Botanical Shelf Carousel */}
        <section className="mb-16 -mx-6 px-6 overflow-hidden">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-serif text-2xl text-stone-900">
              The Botanical Shelf
            </h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-card-1 flex items-center justify-center text-stone-600">
                <MoveLeft size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-card-1 flex items-center justify-center text-stone-600">
                <MoveRight size={16} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-4">
            <BotanicalCard
              name="Lemon"
              tag="DETOXIFYING"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuBFh-EN2pq4u8slxDwYfobXr1yEBdAkZZiYlB3S7F_s19MgZzQ0igQzZnY0fsm_0Xy5jmyuWkpusxBA2K9vWWuryZ9chhdK44uw7jaZimhS6ED9lZHRVDJyXV6-3jOhK6fBnXYfJYWFatC0WwVgrWTkALaTdP7N8Pok1PeNp2hzhj5M354uSYCPq_csQbxDskpzFYAv0H0-TvtFMh2H9sWVCRYejuloCEwl_NehPK_VcLRmGv59ex-OmsDlg3WZOUCDjWf87rMegPJ_"
            />
            <BotanicalCard
              name="Rosemary"
              tag="COGNITIVE"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuAorLQ0xGQuGuo3vaKUvGNACRtw-x9_3TifPo2w-WZlPbu_a5M4yFMJ3ku_AqIo2cjFZEMRBn_uNLjI9KDy2Vk7tOvFmxeBBypg0dKFsWR2Cg1hv_8TonRJysNMKkOW_H98EKn28GJUAGoTX1RRwlH7tX3pWSK9a5sEeyLuyXsjqa4-z5gwMMrQph04YVyGc8PFfBW_egb0gq7kQZtsXHKzj_Hy-_SxQEzS-xXibfytJtTwHfcqNVwsASFD5pb-w4WeKOT68_GdtNps"
            />
            <BotanicalCard
              name="Peppermint"
              tag="ENERGIZING"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuBDaVBKyrZDs5uiXcZGpy5OJRa4CxUfo822zvkRhJUroH4qPBbMF6podgoQm5N4vtT2b1axjXouY06IssNHSZHSBprb_k3eKcNsmAhFGKOZm_GY93gMfGSuJiWk66_SpEuQmyF2SkyQ_1wa3dG6zjo_XkyZaNguytZjW1rFNr-llHAvRa4mIGoCFKro6RP6Al5sN0bPSEKWF_92mP_Gt-ukaROFbS0OvD3tk5yc-Z8a8zh0nL82vw0nmbSQ99WPxXFMuB3bXwtQ02jz"
            />
          </div>
        </section>

        {/* Metabolism Section */}
        <section className="mb-16">
          <div className="bg-card-1 rounded-3xl overflow-hidden p-8 flex flex-col gap-8 items-center">
            <div className="relative w-32 h-48 flex-none">
              <svg
                className="w-full h-full fill-primary-light/50"
                viewBox="0 0 200 400"
              >
                <path d="M100,20 C120,20 140,50 140,100 C140,150 160,200 160,280 C160,360 140,380 100,380 C60,380 40,360 40,280 C40,200 60,150 60,100 C60,50 80,20 100,20 Z"></path>
              </svg>
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-stone-500 ring-8 ring-stone-500/20 animate-pulse"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-primary-dark ring-8 ring-primary-dark/20"></div>
              </div>
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-stone-600 ring-8 ring-stone-600/20"></div>
              </div>
            </div>
            <div className="flex-1 space-y-6 w-full">
              <h2 className="font-serif text-[2rem] leading-tight text-stone-900">
                Metabolism <br />
                <span className="italic text-primary-dark">
                  Activation Points
                </span>
              </h2>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <span className="text-stone-500 font-bold text-lg">01</span>
                  <div>
                    <p className="font-bold text-sm text-stone-900">
                      Solar Plexus
                    </p>
                    <p className="text-xs text-stone-600 mt-1">
                      Apply Grapefruit oil in circular motions to stimulate
                      digestive warmth.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary-dark font-bold text-lg">
                    02
                  </span>
                  <div>
                    <p className="font-bold text-sm text-stone-900">
                      Pulse Points
                    </p>
                    <p className="text-xs text-stone-600 mt-1">
                      Ginger essence on wrists to invigorate systemic flow.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-card-2 p-10 rounded-3xl text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-card-3 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div>
            <h2 className="font-serif text-3xl text-white mb-4 relative z-10">
              Craft Your Personal Alchemist Routine
            </h2>
            <p className="text-primary-light/80 text-sm mb-8 relative z-10 max-w-sm mx-auto">
              Get a tailored selection of oils based on your biological rhythm
              and goals.
            </p>
            <button className="bg-bg-warm text-primary-dark px-8 py-4 rounded-full font-bold tracking-widest text-[10px] uppercase hover:bg-stone-100 transition-all active:scale-95 relative z-10">
              Start My Protocol
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function BotanicalCard({
  name,
  tag,
  img,
}: {
  name: string;
  tag: string;
  img: string;
}) {
  return (
    <div className="snap-start flex-none w-56 bg-white rounded-2xl p-3 shadow-sm border border-stone-100">
      <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 relative">
        <img
          className="w-full h-full object-cover"
          alt={name}
          src={img}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <span className="absolute bottom-3 left-4 text-white font-serif text-xl">
          {name}
        </span>
      </div>
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] text-stone-500 font-bold tracking-wider">
          {tag}
        </span>
        <button className="text-primary-dark text-[10px] font-bold uppercase tracking-tighter hover:underline">
          Read More
        </button>
      </div>
    </div>
  );
}

function RitualView() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Navigation */}
      <nav className="sticky top-0 w-full z-40 bg-bg-warm/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 h-16 w-full">
          <button className="text-stone-600 hover:bg-stone-200/50 transition-colors p-2 rounded-full -ml-2">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <span className="text-xl font-semibold text-primary-dark font-serif tracking-tight italic">
            The Ritual
          </span>
          <button className="text-stone-600 hover:bg-stone-200/50 transition-colors p-2 rounded-full -mr-2">
            <MoreVertical size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <main className="pt-6 pb-12 px-6">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="mb-8">
            <span className="text-primary-dark text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Body Care Series
            </span>
            <h2 className="text-[2.5rem] font-serif italic tracking-tight text-stone-900 leading-[1.1]">
              The Ritual of Toning
            </h2>
            <p className="text-stone-600 mt-3 text-lg">
              Anti-Cellulite Protocol No. 2
            </p>
          </div>

          <div className="relative mt-6 ml-2">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-sm">
              <img
                className="w-full h-full object-cover"
                alt="Essential oils"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6w10xBfeeQfnehzFHiRTbICvrCnKSflPgycfq4dWplC5obYAMVbmnp6ZUhkTRli_0K9XUb-7XVOOSHkM0wnYW4kLU5WLLgz7b3TKLmZMI1t17vYt4MKtyRtHu4e6PNz335pSvxlM9OnNHSQRr6uFRJnsUKHz759oNgHKxqMiBvxvjUUyQ1Gp4Kfga3XzyNfjvu-9d8BkNXPP8WPYhbI6LiJ4sBZe3ZTu_wiY03gPr8J32O1wEoiuXh0JuhnL74OShorPdTBAm8iOc"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-card-3 rounded-full mix-blend-multiply opacity-40 blur-3xl -z-10"></div>
          </div>
        </section>

        {/* Frequency Highlight */}
        <section className="mb-12">
          <div className="bg-card-1 p-5 rounded-3xl flex items-center gap-5">
            <div className="h-14 w-14 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark shrink-0">
              <Calendar size={24} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                Recommended Frequency
              </p>
              <p className="text-2xl font-serif font-semibold text-primary-dark">
                2x per week
              </p>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="text-[1.75rem] font-serif italic text-stone-900">
              The Composition
            </h3>
            <span className="text-[10px] font-bold text-stone-500 tracking-wider uppercase">
              55.5ml Total
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
              <Droplet
                className="text-primary-dark/70 mr-4 shrink-0"
                size={20}
                strokeWidth={1.5}
              />
              <div className="flex-1">
                <p className="text-stone-900 font-medium text-sm">
                  30ml Fractionated Coconut Oil
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Carrier Base</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
              <Leaf
                className="text-primary-dark/70 mr-4 shrink-0"
                size={20}
                strokeWidth={1.5}
              />
              <div className="flex-1">
                <p className="text-stone-900 font-medium text-sm">
                  15 drops Grapefruit
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Detoxifying & Invigorating
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
              <Leaf
                className="text-primary-dark/70 mr-4 shrink-0"
                size={20}
                strokeWidth={1.5}
              />
              <div className="flex-1">
                <p className="text-stone-900 font-medium text-sm">
                  10 drops Rosemary
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Circulatory Support
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
              <Trees
                className="text-primary-dark/70 mr-4 shrink-0"
                size={20}
                strokeWidth={1.5}
              />
              <div className="flex-1">
                <p className="text-stone-900 font-medium text-sm">
                  10 drops Eucalyptus
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Skin Refreshing</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Bento */}
        <section className="mb-12">
          <h3 className="text-[1.75rem] font-serif italic text-stone-900 mb-6">
            Preparation
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card-1 p-6 rounded-3xl col-span-2">
              <FlaskConical
                className="text-stone-500 mb-4"
                size={24}
                strokeWidth={1.5}
              />
              <p className="text-stone-800 leading-relaxed text-sm">
                Combine all ingredients in a sterile{" "}
                <span className="text-primary-dark font-semibold">
                  glass dropper bottle
                </span>
                . Swirl gently to integrate the botanical essences with the
                carrier oil.
              </p>
            </div>
            <div className="bg-card-3/40 p-5 rounded-3xl">
              <Snowflake
                className="text-stone-700 mb-3"
                size={20}
                strokeWidth={1.5}
              />
              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                Store in a cool, dark sanctuary.
              </p>
            </div>
            <div className="bg-card-4/50 p-5 rounded-3xl">
              <Sun
                className="text-stone-700 mb-3"
                size={20}
                strokeWidth={1.5}
              />
              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                Keep away from direct sunlight.
              </p>
            </div>
          </div>
        </section>

        {/* Application Guide */}
        <section className="mb-12">
          <h3 className="text-[1.75rem] font-serif italic text-stone-900 mb-8">
            The Application
          </h3>
          <div className="space-y-10">
            {/* Step 1 */}
            <div className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-full bg-stone-200 shrink-0 flex items-center justify-center font-serif italic text-xl text-primary-dark">
                1
              </div>
              <div>
                <h4 className="font-serif text-xl text-stone-900 mb-2">
                  Dispense & Prepare
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Dispense 5-10 drops into your palms. Notice the aroma as it
                  activates with the air.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-full bg-stone-200 shrink-0 flex items-center justify-center font-serif italic text-xl text-primary-dark">
                2
              </div>
              <div>
                <h4 className="font-serif text-xl text-stone-900 mb-2">
                  Warm & Emulsify
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Warm by rubbing hands together and massage into affected areas
                  using firm, circular motions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-full bg-stone-200 shrink-0 flex items-center justify-center font-serif italic text-xl text-primary-dark">
                3
              </div>
              <div className="w-full">
                <h4 className="font-serif text-xl text-stone-900 mb-2">
                  Guided Massage
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Use the body massager with consistent pressure to stimulate
                  lymphatic drainage.
                </p>
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover grayscale-[20%]"
                    alt="Massage tool"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnpKW1V6ghWF9Ixq_in9JWQ9_yQP2wv_MW-OLy0sxKNqc17TNkzdny6bTmloalR24LoHYYUZtEtOhfYGqPhWHcAdGeA53_nVhOOh4nykUr_2DZXxvJoA8GpMtyDgeXg8tVSqkugVMfahBSGmuaWNBN_wVWmByyETvoeXw0v1CKYHhPl-nGg7lrzdQAqvZO4wOU9fwDONrskCwzOs2MyMzQn1CFIGBsL2HNqDRPgdtG6Qwm7dq0XD03LFIoRKr1KsnRkCWx9-QqjP3m"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-full bg-stone-200 shrink-0 flex items-center justify-center font-serif italic text-xl text-primary-dark">
                4
              </div>
              <div>
                <h4 className="font-serif text-xl text-stone-900 mb-2">
                  Absorption
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Let the oils absorb for a few minutes before dressing.
                  Experience the gentle tingling sensation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-10 text-center border-t border-stone-200/60">
          <p className="font-serif italic text-stone-500 text-lg">
            Elevating the mundane to the sacred.
          </p>
        </section>
      </main>
    </div>
  );
}
