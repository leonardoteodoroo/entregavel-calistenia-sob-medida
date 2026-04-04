# Design System Strategy: The Digital Apothecary

## 1. Overview & Creative North Star

The Creative North Star for this design system is **"The Curated Sanctuary."**

We are moving beyond the "utility app" aesthetic to create a digital environment that feels like a high-end lifestyle magazine crossed with a tranquil therapeutic space. This system rejects the rigid, boxy constraints of traditional Material Design in favor of **Intentional Asymmetry** and **Editorial Breathing Room.**

To achieve this, we use "The Sage" archetype’s wisdom (clean, structured typography) and "The Healer’s" touch (soft, organic shapes and tonal depth). Layouts should feature overlapping elements—such as a botanical image with an organic mask partially covering a text block—to create a sense of physical layering and human craft.

---

## 2. Colors: Tonal Atmosphere

The palette is rooted in the earth. We avoid stark whites and pure blacks, opting instead for the warmth of oatmeal and the groundedness of deep charcoal.

### The "No-Line" Rule

**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections.
Boundaries must be created through:

- **Background Shifts:** Transitioning from `surface` (#fbf9f8) to `surface-container-low` (#f6f3f2).
- **Tonal Nesting:** A card using `surface-container-lowest` (#ffffff) sitting atop a `surface-container` (#f0eded) background.

### Surface Hierarchy & Nesting

Treat the UI as a series of stacked, fine papers.

- **Level 0 (Base):** `surface` for the primary background.
- **Level 1 (Sectioning):** `surface-container-low` for large content blocks (e.g., a guide's description area).
- **Level 2 (Interaction):** `surface-container-highest` or `surface-bright` for interactive elements that need to "pop."

### The "Glass & Gradient" Rule

To add "soul," use subtle gradients for Hero backgrounds. Transition from `primary` (#425646) to `primary-container` (#5a6e5d) at a 155-degree angle. For floating navigation or modal headers, apply **Glassmorphism**: use `surface` at 80% opacity with a `20px` backdrop blur to allow botanical imagery to bleed through softly.

---

## 3. Typography: The Editorial Voice

The contrast between the high-fashion serif and the modern sans-serif creates the "Sage & Healer" tension: authority meets empathy.

- **Display & Headlines (Newsreader):** Use `display-lg` to `headline-sm` for editorial titles. These should feel expansive. Encourage "Optical Kerning" for titles—tighten the letter spacing slightly (-2%) to enhance the luxury feel.
- **Body & Labels (Manrope):** Use `body-lg` for all long-form reading. Manrope’s geometric but friendly curves ensure the "Healer" archetype remains accessible and clear.
- **The Hierarchy of Wisdom:**
  - **Headlines:** Convey the "Sage"—authoritative, calm, and sophisticated.
  - **Body:** Convey the "Healer"—clear, supportive, and easy to digest.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are too "tech." We use light and layering to define space.

- **The Layering Principle:** Avoid `elevation-1/2/3` presets. Instead, use the **Surface Scale**. A `surface-container-lowest` card on a `surface-container` background creates a "natural lift" that feels like a physical object.
- **Ambient Shadows:** If a floating element (like a FAB) requires a shadow, use a custom style: `Offset: 0, 12px; Blur: 24px; Spread: -4px; Color: rgba(27, 28, 28, 0.06)`. This creates a soft, ambient glow rather than a harsh drop shadow.
- **The Ghost Border:** If a button or input requires definition against a similar background, use `outline-variant` (#c3c8c1) at **15% opacity**. It should be felt, not seen.
- **Organic Masks:** Images should never be simple rectangles. Apply `xl` (1.5rem) roundedness or use "Squircle" masks to mimic the shapes of smooth river stones or essential oil drops.

---

## 5. Components

### Buttons & CTAs

- **Primary:** Solid `primary` (#425646) with `on-primary` text. Use `full` (9999px) roundedness for a pebble-like feel.
- **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
- **Tertiary:** Text-only in `primary`, using `title-sm` typography.

### Cards & Discovery

- **The Rule of Space:** Forbid divider lines. Separate list items using the **Spacing Scale** (e.g., `spacing-4` or `1.4rem` vertical margin).
- **Card Style:** Use `surface-container-low` with `xl` (1.5rem) corners. Content should be padded with `spacing-5` (1.7rem) to ensure a premium, airy feel.

### Input Fields & Essential Oil Selectors

- **Text Inputs:** Use `surface-container-lowest` as the fill. The label should be `label-md` in `on-surface-variant`.
- **Organic Chips:** For selecting "Scent Profiles" or "Benefits," use `secondary-fixed` (#fadcd3) with `on-secondary-fixed` text.

### Signature Component: The "Ritual Card"

A specialized component for oil recipes. It uses an **Organic Mask** for the image on the left, `headline-sm` for the title, and a `surface-variant` background to distinguish it from standard educational content.

---

## 6. Do’s and Don'ts

### Do:

- **Do** use asymmetrical margins. For example, give a headline a `spacing-8` left margin and a `spacing-4` right margin to create editorial tension.
- **Do** use `on-surface-variant` (#434843) for secondary text to keep the interface soft and approachable.
- **Do** use organic, high-quality photography of plants and oils with soft-focus backgrounds.

### Don’t:

- **Don’t** use high-contrast dividers or 1px borders. It shatters the "therapeutic" illusion.
- **Don’t** use standard "vibrant" system greens. Stick strictly to the botanical `primary` (#425646) and `primary-container` (#5a6e5d).
- **Don’t** crowd the screen. If you think there is enough white space, add 20% more. Premium design lives in the gaps.
- **Don't** use sharp 90-degree corners. The minimum radius allowed is `md` (0.75rem).
