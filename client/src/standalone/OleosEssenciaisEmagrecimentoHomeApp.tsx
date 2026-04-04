const HOME_LAYOUT_STYLES = `
.oe-layout-home {
  --oe-surface: #fdf9f4;
  --oe-surface-container: #f1ede8;
  --oe-surface-container-low: #f7f3ee;
  --oe-outline-variant: #c4c8be;
  --oe-primary: #50604b;
  --oe-primary-fixed: #d6e8cc;
  --oe-on-primary: #ffffff;
  --oe-on-primary-fixed: #111f0e;
  --oe-on-surface: #1c1c19;
  --oe-on-surface-variant: #444841;
  --oe-tertiary: #884d27;
  --oe-tertiary-fixed: #ffdbc9;
  min-height: max(884px, 100dvh);
  background-color: var(--oe-surface);
  color: var(--oe-on-surface);
  font-family: "IBM Plex Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.oe-layout-home .font-headline {
  font-family: "Libre Baskerville", serif;
}

.oe-layout-home .font-body,
.oe-layout-home .font-label,
.oe-layout-home .label-md {
  font-family: "IBM Plex Sans", sans-serif;
}

.oe-layout-home .label-md {
  font-size: 0.65rem;
  font-weight: 600;
}

.oe-layout-home .material-symbols-outlined {
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
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.oe-layout-home .hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.oe-layout-home .hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.oe-layout-home .bg-surface {
  background-color: var(--oe-surface);
}

.oe-layout-home .bg-surface-container {
  background-color: var(--oe-surface-container);
}

.oe-layout-home .bg-surface-container-low {
  background-color: var(--oe-surface-container-low);
}

.oe-layout-home .bg-primary {
  background-color: var(--oe-primary);
}

.oe-layout-home .bg-primary-fixed {
  background-color: var(--oe-primary-fixed);
}

.oe-layout-home .text-on-primary {
  color: var(--oe-on-primary);
}

.oe-layout-home .text-on-primary-fixed {
  color: var(--oe-on-primary-fixed);
}

.oe-layout-home .text-on-surface {
  color: var(--oe-on-surface);
}

.oe-layout-home .text-on-surface-variant {
  color: var(--oe-on-surface-variant);
}

.oe-layout-home .text-primary {
  color: var(--oe-primary);
}

.oe-layout-home .text-tertiary {
  color: var(--oe-tertiary);
}

.oe-layout-home .border-outline-variant {
  border-color: var(--oe-outline-variant);
}

.oe-layout-home .border-primary {
  border-color: var(--oe-primary);
}

.oe-layout-home .border-tertiary {
  border-color: var(--oe-tertiary);
}

.oe-layout-home ::selection {
  background-color: var(--oe-tertiary-fixed);
}
`;

export default function OleosEssenciaisEmagrecimentoHomeApp() {
  return (
    <div className="oe-layout-home bg-surface text-on-surface font-body antialiased">
      <style>{HOME_LAYOUT_STYLES}</style>

      <header
        className="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-stone-50/90 px-6 py-4 backdrop-blur-md"
        style={{ borderColor: "rgba(196, 200, 190, 0.3)" }}
      >
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">
            analytics
          </span>
          <h1 className="font-headline text-lg font-bold tracking-tight text-primary">
            Botanical Systems
          </h1>
        </div>
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border bg-primary-fixed">
          <img
            alt="User profile"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0eBueN4prqiBhec-xZANmx4yQZGhpa3GHyAazb-irop66IZY8xZQnq65aMlC3u7DGHgUKn3btwXPGLaUO5b-Y6jgM02n-SveE_2Fsm6tLX8sdOUrST3FC3gvMfX82II4VVvOtUdmca4W_mfmzOVPQUGggMDL-A8jEQuzAwamKRDZ2TMVaR7aIjezmYvpU5GaRS0Kuol0DCmiFBxPFmKBViloOhK7SiKUo3Oy8F4NVocVAqOV2WiNqchyxL4aZRuEOpSSnCeWloEN_"
          />
        </div>
      </header>

      <main className="pb-32 pt-24">
        <section className="mb-16 px-6">
          <div className="mx-auto max-w-md">
            <span className="label-md mb-3 block text-xs font-semibold uppercase tracking-wider text-tertiary">
              Physiological Mechanics
            </span>
            <h2 className="font-headline mb-6 text-3xl font-bold leading-tight text-primary">
              Quantifying the Link: Neurobiology &amp; Weight Regulation
            </h2>
            <div className="mb-8">
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Eo0vxyYGi_caqtN3hjcr9YRaYBwrTXfQBEPRgSD4c27SfZrwJHqsTBPQHmP16hDlZgvpCjWRtUe3JamDz1wSxhaEymbjOaqzU1Lfxbr2uAzFwUPVTa2-Ku_irZqvmGNggeLFwPV57Aq1Nzyzuk1ddsFSPZtHf2OjivjcPW3SgWQppi6rZwo1w9ElWICtNh-1zNMyNfr7L9Wbg6bRFIYi8F2IeIJPMO1qnrNcbjgkiCb0xRMcU0dTY7O2uJ_CMrrNsoe6pOdb0Wls"
                  alt="Neurobiology and weight regulation"
                />
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Effective weight management requires a systemic approach beyond
                caloric deficits. The limbic system directly regulates hunger
                signaling and impulse control. Volatile organic compounds from
                essential oils serve as direct chemical messengers to the
                olfactory bulb, modulating neuro-responses that trigger reactive
                eating behaviors.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-6 flex items-end justify-between px-6">
            <div>
              <span className="label-md mb-1 block text-[10px] uppercase tracking-widest text-tertiary">
                Bio-Active Compounds
              </span>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Functional Extracts
              </h3>
            </div>
            <span className="text-xs font-semibold uppercase tracking-tighter text-primary">
              Slide to Compare
            </span>
          </div>
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6">
            <div className="flex min-w-[260px] snap-start flex-col rounded-lg border border-outline-variant bg-surface-container-low p-5">
              <div className="mb-4 h-32 overflow-hidden rounded bg-surface">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx1CenoH0ujbE1et0vI1wg4A11pLA6mg5rz9uTnuUtprZeFlOjW5zo17M0tQxnCuxeGgBpztaFd2Bs3q1F-h4aI9o_UsXKzcko-_VOPlGnA3j_LxnP4W8Gv2glRaSzKY2srdIrMrk6PQGks6sxdEXmWuKBLVdxVyCNpThwKqYicHEnis7laIQotsKaSW12Zk3ecQSbdW5gzdkOwgNkWTxbun_sIFzO6L-PK-uvI63mGjJ8C51q2UAUcUgeJdpcziAJ2rZewZg5LMcS"
                  alt="Mentha Piperita"
                />
              </div>
              <h4 className="font-headline mb-1 text-lg font-bold text-primary">
                Mentha Piperita
              </h4>
              <p className="mb-4 text-xs leading-normal text-on-surface-variant">
                Targeting the ventromedial nucleus of the hypothalamus to
                suppress appetite signals.
              </p>
              <div className="mt-auto flex gap-2">
                <span className="rounded border border-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight text-primary">
                  Metabolic
                </span>
                <span className="rounded border border-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight text-primary">
                  Stimulant
                </span>
              </div>
            </div>

            <div className="flex min-w-[260px] snap-start flex-col rounded-lg border border-outline-variant bg-surface-container-low p-5">
              <div className="mb-4 h-32 overflow-hidden rounded bg-surface">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkJ15MKnuTOgxdQFV3DPJTnXRn_Gh2eBzt3wForLRNDzW1CTTwpPrWqR1afg0UTpmfrMB0ZgL5UMOaHscFozE-3BYZqalNbDaiAG40yAfMRqq6sHtcSxZEGwahC4bJ_xUl6vmNdYtgUPt3OzOQWT_fzt8iwnlJcgXcCTyKb0Oc8WUI3aKoBD2xUgMxUQtgQTy-IkHvQL2niX35y6oZ0n1Mt1SCjJkpNKigLM--gYc0Ay5Uv-PJRFXxDCXQl7_zP-u4YhbKrRmhDbJ-"
                  alt="Citrus Bergamia"
                />
              </div>
              <h4 className="font-headline mb-1 text-lg font-bold text-primary">
                Citrus Bergamia
              </h4>
              <p className="mb-4 text-xs leading-normal text-on-surface-variant">
                Facilitates GABAergic activity, reducing HPA-axis activation and
                subsequent cortisol release.
              </p>
              <div className="mt-auto flex gap-2">
                <span className="rounded border border-tertiary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight text-tertiary">
                  Cortisol
                </span>
                <span className="rounded border border-tertiary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight text-tertiary">
                  Inhibition
                </span>
              </div>
            </div>

            <div className="flex min-w-[260px] snap-start flex-col rounded-lg border border-outline-variant bg-surface-container-low p-5">
              <div className="mb-4 h-32 overflow-hidden rounded bg-surface">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqUp88YBYPHFPJRR8u-9G9m4pbfkD_9TTkwDiWSEk1COTMwGTOXsmQfXG4gGxsyliWdsu9hA74CKo5pGE2uI0yLGl4yrksEjfWS_jXKyMeTFlXQ3W2b8ngkbETn3CEzOdPfu4l0PASEqZNWB4Wyu_IOCH_X-q8UMHJElFuc-7yvOzsM7omtA8joaw-Lz5oahZhOpJpNTd3MEdldS8_SUK8RS_rHr3kGKKYc7_p_0FqYlNgwAacJkTPxX3rKyf3dE4Iq9JzDQdQ6CxX"
                  alt="Citrus Paradisi"
                />
              </div>
              <h4 className="font-headline mb-1 text-lg font-bold text-primary">
                Citrus Paradisi
              </h4>
              <p className="mb-4 text-xs leading-normal text-on-surface-variant">
                High D-limonene content initiates lipase enzyme activity for
                adipose tissue breakdown.
              </p>
              <div className="mt-auto flex gap-2">
                <span className="rounded border border-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight text-primary">
                  Lipolysis
                </span>
                <span className="rounded border border-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight text-primary">
                  Drainage
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 px-6">
          <div className="relative overflow-hidden rounded-lg bg-primary p-8 text-on-primary">
            <h3
              className="font-headline mb-8 border-b pb-4 text-center text-xl font-bold uppercase tracking-widest"
              style={{ borderColor: "rgba(214, 232, 204, 0.2)" }}
            >
              Neural Transmission Flow
            </h3>
            <div className="relative">
              <div
                className="absolute bottom-4 left-[15px] top-4 w-0.5"
                style={{ backgroundColor: "rgba(214, 232, 204, 0.4)" }}
              />
              <div className="space-y-12">
                <div className="relative z-10 flex items-start gap-6">
                  <div className="ring-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-fixed text-sm font-bold text-on-primary-fixed ring-4">
                    01
                  </div>
                  <div>
                    <h5 className="mb-1 text-base font-semibold">
                      Amygdala Response
                    </h5>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(214, 232, 204, 0.8)" }}
                    >
                      The amygdala interprets psychological stressors as
                      physiological threats, triggering glucose demand.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="ring-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-fixed text-sm font-bold text-on-primary-fixed ring-4">
                    02
                  </div>
                  <div>
                    <h5 className="mb-1 text-base font-semibold">
                      VOC Signal Transmission
                    </h5>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(214, 232, 204, 0.8)" }}
                    >
                      Olfactory receptors bypass the thalamus, providing direct
                      inhibitory feedback to the stress center.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="ring-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-fixed text-sm font-bold text-on-primary-fixed ring-4">
                    03
                  </div>
                  <div>
                    <h5 className="mb-1 text-base font-semibold">
                      Dopaminergic Regulation
                    </h5>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(214, 232, 204, 0.8)" }}
                    >
                      Stabilization of neurotransmitter levels reduces the
                      intensity of cravings by satisfying the reward circuit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 px-6">
          <h3 className="font-headline mb-6 border-l-4 border-primary pl-4 text-xl font-bold text-on-surface">
            Standard Operational Protocols
          </h3>
          <div className="space-y-3">
            <details className="group rounded border border-outline-variant bg-surface-container">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
                <span className="text-sm font-bold uppercase tracking-wide text-primary">
                  Metabolic Induction (AM)
                </span>
                <span className="material-symbols-outlined text-sm group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 text-xs leading-relaxed text-on-surface-variant">
                Procedure: Steam inhalation of Peppermint (0.1ml) + Lemon
                (0.05ml). Function: Acute mental alertness and preemptive hunger
                signal suppression before first nutrient intake.
              </div>
            </details>

            <details className="group rounded border border-outline-variant bg-surface-container">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
                <span className="text-sm font-bold uppercase tracking-wide text-primary">
                  Cortisol Stabilization (16:00)
                </span>
                <span className="material-symbols-outlined text-sm group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 text-xs leading-relaxed text-on-surface-variant">
                Procedure: Passive diffusion of Bergamot in high-stress
                environments. Function: Mitigation of the afternoon circadian
                cortisol dip which leads to compensatory sugar consumption.
              </div>
            </details>

            <details className="group rounded border border-outline-variant bg-surface-container">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
                <span className="text-sm font-bold uppercase tracking-wide text-primary">
                  Endocrine Recovery (PM)
                </span>
                <span className="material-symbols-outlined text-sm group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 text-xs leading-relaxed text-on-surface-variant">
                Procedure: Topical application (diluted) of Lavandula to primary
                pulse points. Function: Optimization of Delta-wave sleep to
                maintain healthy Leptin/Ghrelin hormone ratios for the following
                24h cycle.
              </div>
            </details>
          </div>
        </section>

        <section className="mb-12 px-6">
          <div className="flex flex-col items-center gap-8 rounded-lg border border-outline-variant bg-surface-container-low p-8 md:flex-row">
            <div className="flex-1">
              <h4 className="font-headline mb-4 text-2xl font-bold text-primary">
                Access the Full Empirical Data.
              </h4>
              <p className="mb-6 text-sm text-on-surface-variant">
                Download the comprehensive white paper on botanical chemical
                pathways and metabolic results.
              </p>
              <button className="w-full rounded bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-on-primary shadow-lg">
                Request Full Report
              </button>
            </div>
            <div className="h-40 w-full overflow-hidden rounded opacity-60 md:w-1/3">
              <img
                className="h-full w-full object-cover grayscale"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8qFoZ-VVnHr6A8vw1CDfAhcNlPcDz-cMK9iYzXAtdTosErIcj6Wd991pNK_elel2RW7t7eQp3d5ZQBWkgx_th0ULG0vk2d4SJ0tgsdcOtzYUNl2Ifms2a-Akko2ZZgPsYfJuOSDClfofCK9s-x02CsLJEqqxt7aptIs-nht8WMQqhCd5unyK5QOXNbQqn6Y5ZjpqLloh6hltH6kwKcq7dL96L14zOQnOs2-Yl6tPwt3hKUrOsb1Mm5x70te-9t22CoemnHxxICF16"
                alt="Empirical data report"
              />
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-outline-variant bg-stone-50/95 px-4 pb-4 pt-2 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center p-2 text-primary">
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            monitoring
          </span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider">
            Regulate
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 text-stone-400">
          <span className="material-symbols-outlined text-[20px]">biotech</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider">
            Science
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 text-stone-400">
          <span className="material-symbols-outlined text-[20px]">
            clinical_notes
          </span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider">
            Protocols
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 text-stone-400">
          <span className="material-symbols-outlined text-[20px]">hub</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider">
            Systems
          </span>
        </div>
      </nav>
    </div>
  );
}
