---
name: Obsidian Kinetic
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e0fdff'
  on-primary: '#00373a'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00696f'
  secondary: '#d5baff'
  on-secondary: '#42008a'
  secondary-container: '#7f04ff'
  on-secondary-container: '#e7d5ff'
  tertiary: '#fff5f6'
  on-tertiary: '#66002c'
  tertiary-container: '#ffcfd8'
  on-tertiary-container: '#be0059'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ecdcff'
  secondary-fixed-dim: '#d5baff'
  on-secondary-fixed: '#270057'
  on-secondary-fixed-variant: '#5e00c1'
  tertiary-fixed: '#ffd9e0'
  tertiary-fixed-dim: '#ffb1c3'
  on-tertiary-fixed: '#3f0019'
  on-tertiary-fixed-variant: '#8f0041'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-sm: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system is tailored for an intensive kinesiology, anatomy, and biomechanics mobile study environment. It translates the addictive, sleek polish of high-engagement social media into an authoritative educational tool. The target audience comprises medical students, physical therapy candidates, athletic trainers, and movement specialists who require swift, repetitive flashcard drills without cognitive drag or eye strain.

The design movement blends **Pure-Dark Minimalism** with **Hyper-Polished Tactility**. Canvas depth relies on pure OLED black anchors overlaid with refined charcoal surfaces. Key visual rewards—such as mastery rings, anatomical focus areas, and retention streaks—borrow from social story rings, utilizing vibrant kinetic gradients (electric cyan, hyper-violet, and kinetic magenta) to instill micro-dopamine loops during demanding study workflows.

## Colors

The palette is engineered for OLED power efficiency, nocturnal usage, and immediate visual hierarchy:

- **Base Canvas & Surfaces**:
  - `surface-canvas`: `#000000` (Pure true black base).
  - `surface-elevated`: `#121212` (Cards, sheet overlays, and bottom tab bar).
  - `surface-subtle`: `#1E1E1E` (Tonal button fills, card wells, and inactive module chips).
  - `surface-highlight`: `#262626` (Active states, search fields, and popover anchors).

- **Structural Outlines**:
  - `border-subtle`: `#262626` (Delicate 1px boundary dividers).
  - `border-medium`: `#363636` (Card boundaries, module dividers, and toggles).

- **Typographic Neutrals**:
  - `text-primary`: `#FFFFFF` (Peak legibility for anatomical terminology and test items).
  - `text-secondary`: `#A8A8A8` (Etymology, pronunciations, secondary cues).
  - `text-tertiary`: `#8E8E8E` (Timestamps, counts, shortcuts, disabled elements).

- **Kinetic Accents & Gradient Spectrum**:
  - `gradient-kinetic-ring`: Linear 135deg gradient from Cyan (`#00F2FE`) through Indigo/Violet (`#7F00FF`) to Magenta (`#FF007A`). Used for high-mastery streak rings, story-style anatomy highlights, and review CTA borders.
  - `accent-cyan`: `#00F2FE` (Agonist muscle groups, target joint axes, active selection).
  - `accent-violet`: `#7F00FF` (Antagonist groups, system deep links, category markers).
  - `status-success`: `#00E676` (Mastered cards, 100% test accuracy).
  - `status-warning`: `#FFAB00` (Needs revision).
  - `status-critical`: `#FF3B30` (Lapsed cards, incorrect recall).

## Typography

The type system prioritizes micro-legibility of multisyllabic Latin anatomical terms on handheld displays. **Plus Jakarta Sans** is the sole typographic family, offering clean geometric terminals, open counters, and a modern app-centric aesthetic.

- **Weight Hierarchy**: 
  - Headlines and term titles strictly employ `700` and `600` weights to achieve maximum contrast against `#000000` grounds.
  - Body text uses `400` weight with increased line-height to make dense biomechanical descriptions effortless to scan.
  - Labels and pill tags utilize `600` or `700` weights at condensed sizes (`10px`–`12px`) with `+0.04em` tracking to prevent optical clutter.
- **Numbers & Metrics**: Study counts, percentage dials, and repetition stats leverage proportional figures set at medium-to-bold weights for rapid appraisal.

## Layout & Spacing

The layout embraces a mobile-first fluid model optimized for one-handed reachability:

- **Horizontal Canvas Structure**: Strict `16px` (`margin`) outer margins ensure cards and list rows maintain breathing room from hardware edges. Inner grid gutters scale at `12px` to `16px` for dense dual-column flashcard shelves.
- **Rhythm**: Built around an atomic `4px` grid (`4px`, `8px`, `12px`, `16px`, `24px`).
- **Thumb Zone Anchor**: Interactive navigation, deck flips, swipe controls, and response buttons occupy the lower 40% of the display.
- **Responsive Breakpoints**:
  - **Phone (< 480px)**: Single column stream for reviews; horizontal story rail for anatomical muscle system quick-jumps.
  - **Tablet (481px - 840px)**: Double column card grid; 2-pane split sheet during deep anatomical breakdowns.

## Elevation & Depth

Rather than conventional drop shadows—which disappear or render muddy on true black interfaces—depth is constructed through **Tonal Surface Tiering** and **Subtle Edge Definition**:

- **Tier 0 (Base Canvas)**: `#000000`. Uninterrupted true black backdrop.
- **Tier 1 (Surface Cards & Stream Units)**: `#121212` enclosed in a hairline `1px solid #262626` outline.
- **Tier 2 (Elevated Sheets & Floating Controls)**: `#1E1E1E` encased in a crisp `1px solid #363636` outline. Subtle ambient illumination: `0 8px 32px rgba(0, 0, 0, 0.8)`.
- **Tier 3 (Active Focus Overlays & Dialogs)**: `#262626` with an inner border of `#363636` and a radiant ambient glow derived from primary tokens (`0 0 24px rgba(0, 242, 254, 0.15)`).
- **Glass Elements**: Bottom navigation bar and dynamic sticky headers use frosted dark translucency: `background: rgba(18, 18, 18, 0.85)` with `backdrop-filter: blur(20px)` and a top hairline border of `#262626`.

## Shapes

The design system incorporates geometric softness with a standardized base radius of `8px` (`roundedness: 2`), balancing compact utility with a friendly modern feel:

- **Interactive Primary Elements**: Buttons, text inputs, and flashcard containers use `rounded-lg` (`16px`).
- **Anatomical Flashcards**: Main interactive cards use `rounded-xl` (`24px`) to emulate tactile physical flashcards with modern device ergonomics.
- **Micro Tags & Chips**: Fully pill-shaped (`9999px`) for anatomical system indicators (e.g., "Origin", "Insertion", "Innervation", "Agonist").
- **Circular Badges & Avatars**: Fixed `1:1` aspect ratio, fully circular (`border-radius: 50%`) with double-ring padding for story-style muscle groups.

## Components

### Buttons
- **Primary CTA**: High-contrast pure white pill (`#FFFFFF`) with deep black text (`#000000`, `label-lg`). Under active press: scales down smoothly (`0.98`) with `opacity: 0.9`.
- **Kinetic Accent CTA**: Gradient background (`linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)`) with white text and a soft ambient cyan/violet shadow.
- **Secondary**: Deep charcoal (`#1E1E1E`), border `1px solid #363636`, text `#FFFFFF`.
- **Ghost/Tertiary**: Transparent surface, `#A8A8A8` text, shifting to `#FFFFFF` on active tap.

### Flashcard Units (Core Module)
- **Container**: Elevated `#121212` background, framed with a refined `1px solid #262626` border, shaped to `24px` radius.
- **Muscle Graphic Anchor**: Top half features a high-contrast dark visual of the kinetic chain; isolated muscles or vectors glow with `#00F2FE` (cyan) or `#FF007A` (magenta).
- **Meta Row**: Pill tag labels (`10px`, bold) indicating origin, insertion, and innervation stacked cleanly above the main query.
- **Flip Interaction**: Flip trigger exposes Tier 2 `#1E1E1E` interior with white primary body text and segmented recall buttons.

### Story-Style Muscle Highlights (Navigation Rail)
- **Ring Wrapper**: Outer `64px` diameter circular avatar wrapped in a `2.5px` Instagram-inspired kinetic gradient ring (`#00F2FE` to `#7F00FF` to `#FF007A`), separated from the inner thumbnail by an explicit `2px` `#000000` gap.
- **Inactive/Completed Ring**: Dimmed to `1px solid #363636`.
- **Label**: `12px` center-aligned title beneath the ring in `#A8A8A8` (`label-md`).

### Chips & Pill Tags
- **Category Chips**: Height `28px`, padding `0 12px`, radius `9999px`. Neutral inactive state is `#1E1E1E` with `#8E8E8E` typography; active state adopts `#00F2FE` text with an ultra-subtle tinted border (`rgba(0, 242, 254, 0.4)`).

### Input Fields
- **Search & Quick Recall Input**: Height `44px`, background `#1E1E1E`, border `1px solid #262626`, radius `12px`. Placeholder text set to `#8E8E8E`. Focus state replaces border with sharp `1px solid #00F2FE`.

### Lists & Row Selectors
- **Structure**: Clean edge-to-edge or rounded-inset rows on `#121212` cards.
- **Dividers**: `1px solid #262626` inset by `16px` to match icon margins.
- **Leading Indicator**: Micro icon in `#A8A8A8` or a color-coded muscle badge. Trailing chevron in `#8E8E8E`.

### Bottom Navigation Bar
- **Bar Frame**: Height `64px` (plus mobile safe area), background `rgba(0, 0, 0, 0.85)` with `backdrop-filter: blur(20px)`, top border `1px solid #262626`.
- **Icons**: Minimal `1.5px` stroke outline icons. Active icon transitions to `#FFFFFF` with a micro `4px` glowing cyan dot anchored beneath. Inactive icon rests at `#8E8E8E`.