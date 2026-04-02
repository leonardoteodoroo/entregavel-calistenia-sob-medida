const CONTENT_LAYOUT_STYLES = `
.oe-layout-content {
  --oe-background: #fbf9f8;
  --oe-on-background: #1b1c1c;
  --oe-on-surface: #1b1c1c;
  --oe-on-surface-variant: #434843;
  --oe-primary: #425646;
  --oe-secondary: #6f5a53;
  --oe-primary-container: #5a6e5d;
  --oe-on-primary-container: #d9f0da;
  --oe-primary-container-text: #425646;
  --oe-secondary-container: #fadcd3;
  --oe-surface-container-lowest: #ffffff;
  --oe-surface-container-low: #f6f3f2;
  --oe-surface-container-highest: #e4e2e1;
  --oe-on-secondary-fixed-variant: #56423c;
  --oe-on-tertiary-fixed-variant: #4b463e;
  min-height: max(884px, 100dvh);
  background-color: var(--oe-background);
  color: var(--oe-on-background);
  font-family: "Manrope", sans-serif;
}

.oe-layout-content .font-headline,
.oe-layout-content .font-newsreader {
  font-family: "Newsreader", serif;
}

.oe-layout-content .font-body,
.oe-layout-content .font-label,
.oe-layout-content .font-manrope {
  font-family: "Manrope", sans-serif;
}

.oe-layout-content .material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24;
}

.oe-layout-content .bg-background {
  background-color: var(--oe-background);
}

.oe-layout-content .text-on-background {
  color: var(--oe-on-background);
}

.oe-layout-content .text-on-surface {
  color: var(--oe-on-surface);
}

.oe-layout-content .text-on-surface-variant {
  color: var(--oe-on-surface-variant);
}

.oe-layout-content .text-primary {
  color: var(--oe-primary);
}

.oe-layout-content .text-secondary {
  color: var(--oe-secondary);
}

.oe-layout-content .bg-primary-container {
  background-color: var(--oe-primary-container);
}

.oe-layout-content .text-on-primary-container {
  color: var(--oe-on-primary-container);
}

.oe-layout-content .text-primary-container {
  color: var(--oe-primary-container-text);
}

.oe-layout-content .bg-secondary-container {
  background-color: var(--oe-secondary-container);
}

.oe-layout-content .bg-surface-container-lowest {
  background-color: var(--oe-surface-container-lowest);
}

.oe-layout-content .bg-surface-container-low {
  background-color: var(--oe-surface-container-low);
}

.oe-layout-content .bg-surface-container-highest {
  background-color: var(--oe-surface-container-highest);
}

.oe-layout-content .text-on-secondary-fixed-variant {
  color: var(--oe-on-secondary-fixed-variant);
}

.oe-layout-content .text-on-tertiary-fixed-variant {
  color: var(--oe-on-tertiary-fixed-variant);
}

.oe-layout-content .oe-bg-secondary-fixed-30 {
  background-color: rgba(250, 220, 211, 0.3);
}

.oe-layout-content .oe-bg-tertiary-fixed-40 {
  background-color: rgba(234, 225, 214, 0.4);
}

.oe-layout-content ::selection {
  background-color: var(--oe-primary-container);
  color: var(--oe-on-primary-container);
}
`;

export default function OleosEssenciaisGranolaApp() {
  return (
    <div className="oe-layout-content bg-background text-on-background font-body">
      <style>{CONTENT_LAYOUT_STYLES}</style>

      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-[#fbf9f8]/80 px-6 backdrop-blur-md">
        <button className="scale-95 rounded-full p-2 text-[#434843] transition-colors duration-200 ease-in-out hover:bg-[#f6f3f2]">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-newsreader text-xl font-semibold italic tracking-tight text-[#425646]">
          The Ritual
        </h1>
        <button className="scale-95 rounded-full p-2 text-[#434843] transition-colors duration-200 ease-in-out hover:bg-[#f6f3f2]">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <main className="overflow-x-hidden pb-24 pt-16">
        <section className="relative px-6 pb-12 pt-8">
          <div className="mb-8">
            <span className="mb-2 block text-sm font-label uppercase tracking-widest text-primary">
              Body Care Series
            </span>
            <h2 className="font-headline text-4xl italic leading-tight tracking-tight text-on-surface">
              The Ritual of Toning
            </h2>
            <p className="mt-2 text-lg font-body text-on-surface-variant">
              Anti-Cellulite Protocol No. 2
            </p>
          </div>

          <div className="relative ml-4 mt-6">
            <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-sm">
              <img
                className="h-full w-full object-cover"
                alt="Premium glass amber essential oil bottles arranged on a stone surface with a wooden body massager and soft botanical shadows"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6w10xBfeeQfnehzFHiRTbICvrCnKSflPgycfq4dWplC5obYAMVbmnp6ZUhkTRli_0K9XUb-7XVOOSHkM0wnYW4kLU5WLLgz7b3TKLmZMI1t17vYt4MKtyRtHu4e6PNz335pSvxlM9OnNHSQRr6uFRJnsUKHz759oNgHKxqMiBvxvjUUyQ1Gp4Kfga3XzyNfjvu-9d8BkNXPP8WPYhbI6LiJ4sBZe3ZTu_wiY03gPr8J32O1wEoiuXh0JuhnL74OShorPdTBAm8iOc"
              />
            </div>
            <div className="-left-8 -z-10 absolute -bottom-6 h-40 w-40 rounded-full bg-secondary-container opacity-20 mix-blend-multiply blur-3xl" />
          </div>
        </section>

        <section className="mb-12 px-6">
          <div className="flex items-center gap-6 rounded-xl bg-surface-container-low p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined text-3xl">
                calendar_today
              </span>
            </div>
            <div>
              <p className="text-sm font-label uppercase tracking-wider text-on-surface-variant">
                Recommended Frequency
              </p>
              <p className="font-headline text-2xl font-semibold text-primary">
                2x per week
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 px-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="font-headline text-2xl italic text-on-surface">
              The Composition
            </h3>
            <span className="text-xs font-label text-on-surface-variant">
              55.5ml Total Volume
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center rounded-xl bg-surface-container-lowest p-4 shadow-sm">
              <span className="material-symbols-outlined mr-4 text-primary-container">
                water_drop
              </span>
              <div className="flex-1">
                <p className="font-body text-on-surface">
                  30ml Fractionated Coconut Oil
                </p>
                <p className="text-xs font-label text-on-surface-variant">
                  Carrier Base
                </p>
              </div>
            </div>
            <div className="flex items-center rounded-xl bg-surface-container-lowest p-4 shadow-sm">
              <span className="material-symbols-outlined mr-4 text-primary-container">
                energy_savings_leaf
              </span>
              <div className="flex-1">
                <p className="font-body text-on-surface">15 drops Grapefruit</p>
                <p className="text-xs font-label text-on-surface-variant">
                  Detoxifying &amp; Invigorating
                </p>
              </div>
            </div>
            <div className="flex items-center rounded-xl bg-surface-container-lowest p-4 shadow-sm">
              <span className="material-symbols-outlined mr-4 text-primary-container">
                eco
              </span>
              <div className="flex-1">
                <p className="font-body text-on-surface">10 drops Rosemary</p>
                <p className="text-xs font-label text-on-surface-variant">
                  Circulatory Support
                </p>
              </div>
            </div>
            <div className="flex items-center rounded-xl bg-surface-container-lowest p-4 shadow-sm">
              <span className="material-symbols-outlined mr-4 text-primary-container">
                forest
              </span>
              <div className="flex-1">
                <p className="font-body text-on-surface">10 drops Eucalyptus</p>
                <p className="text-xs font-label text-on-surface-variant">
                  Skin Refreshing
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 px-6">
          <h3 className="font-headline mb-6 text-2xl italic text-on-surface">
            Preparation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-xl bg-surface-container-low p-5">
              <span className="material-symbols-outlined mb-3 text-secondary">
                science
              </span>
              <p className="font-body leading-relaxed text-on-surface">
                Combine all ingredients in a sterile{" "}
                <span className="font-semibold text-primary">
                  glass dropper bottle
                </span>
                . Swirl gently to integrate the botanical essences with the
                carrier oil.
              </p>
            </div>
            <div className="oe-bg-secondary-fixed-30 rounded-xl p-5">
              <span className="material-symbols-outlined mb-2 text-on-secondary-fixed-variant">
                ac_unit
              </span>
              <p className="text-sm font-body text-on-secondary-fixed-variant">
                Store in a cool, dark sanctuary.
              </p>
            </div>
            <div className="oe-bg-tertiary-fixed-40 rounded-xl p-5">
              <span className="material-symbols-outlined mb-2 text-on-tertiary-fixed-variant">
                sunny_snowing
              </span>
              <p className="text-sm font-body text-on-tertiary-fixed-variant">
                Keep away from direct sunlight.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 px-6">
          <h3 className="font-headline mb-6 text-2xl italic text-on-surface">
            The Application
          </h3>
          <div className="space-y-12">
            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="font-headline flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-xl italic text-primary">
                  1
                </div>
                <div>
                  <h4 className="font-headline mb-1 text-lg text-on-surface">
                    Dispense &amp; Prepare
                  </h4>
                  <p className="font-body text-on-surface-variant">
                    Dispense 5-10 drops into your palms. Notice the aroma as it
                    activates with the air.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="font-headline flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-xl italic text-primary">
                  2
                </div>
                <div>
                  <h4 className="font-headline mb-1 text-lg text-on-surface">
                    Warm &amp; Emulsify
                  </h4>
                  <p className="font-body text-on-surface-variant">
                    Warm by rubbing hands together and massage into affected
                    areas using firm, circular motions.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="font-headline flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-xl italic text-primary">
                  3
                </div>
                <div>
                  <h4 className="font-headline mb-1 text-lg text-on-surface">
                    Guided Massage
                  </h4>
                  <p className="font-body text-on-surface-variant">
                    Use the body massager with consistent pressure to stimulate
                    lymphatic drainage.
                  </p>
                </div>
              </div>
              <div className="mt-4 aspect-video overflow-hidden rounded-xl">
                <img
                  className="h-full w-full object-cover grayscale-[30%]"
                  alt="Close-up of a wooden body massager tool being used on smooth skin with a focus on tactile texture and calm atmosphere"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnpKW1V6ghWF9Ixq_in9JWQ9_yQP2wv_MW-OLy0sxKNqc17TNkzdny6bTmloalR24LoHYYUZtEtOhfYGqPhWHcAdGeA53_nVhOOh4nykUr_2DZXxvJoA8GpMtyDgeXg8tVSqkugVMfahBSGmuaWNBN_wVWmByyETvoeXw0v1CKYHhPl-nGg7lrzdQAqvZO4wOU9fwDONrskCwzOs2MyMzQn1CFIGBsL2HNqDRPgdtG6Qwm7dq0XD03LFIoRKr1KsnRkCWx9-QqjP3m"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="font-headline flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-xl italic text-primary">
                  4
                </div>
                <div>
                  <h4 className="font-headline mb-1 text-lg text-on-surface">
                    Absorption
                  </h4>
                  <p className="font-body text-on-surface-variant">
                    Let the oils absorb for a few minutes before dressing.
                    Experience the gentle tingling sensation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t px-6 py-12 text-center"
          style={{ borderColor: "rgba(195, 200, 193, 0.1)" }}
        >
          <p className="font-headline italic text-on-surface-variant">
            Elevating the mundane to the sacred.
          </p>
        </section>
      </main>

      <nav className="fixed bottom-0 z-50 flex h-20 w-full items-center justify-around rounded-t-[2rem] bg-[#fbf9f8]/90 px-8 pb-4 shadow-[0_-12px_24px_-4px_rgba(27,28,28,0.06)] backdrop-blur-xl">
        <a
          className="flex scale-90 flex-col items-center justify-center text-[#434843] opacity-70 transition-opacity duration-300 hover:opacity-100"
          href="#"
        >
          <span className="material-symbols-outlined">spa</span>
          <span className="font-manrope text-[11px] font-medium tracking-wide">
            Sanctuary
          </span>
        </a>
        <a
          className="flex scale-90 flex-col items-center justify-center text-[#434843] opacity-70 transition-opacity duration-300 hover:opacity-100"
          href="#"
        >
          <span className="material-symbols-outlined">science</span>
          <span className="font-manrope text-[11px] font-medium tracking-wide">
            Apothecary
          </span>
        </a>
        <a
          className="flex scale-90 flex-col items-center justify-center rounded-full bg-[#5A6E5D] px-5 py-1 text-[#ffffff] duration-300"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            self_care
          </span>
          <span className="font-manrope text-[11px] font-medium tracking-wide">
            Rituals
          </span>
        </a>
        <a
          className="flex scale-90 flex-col items-center justify-center text-[#434843] opacity-70 transition-opacity duration-300 hover:opacity-100"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-manrope text-[11px] font-medium tracking-wide">
            Profile
          </span>
        </a>
      </nav>
    </div>
  );
}
