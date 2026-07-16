---
name: Magical Productivity System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464554'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#b4136d'
  on-secondary: '#ffffff'
  secondary-container: '#fd56a7'
  on-secondary-container: '#600037'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-gap: 12px
---

## Brand & Style

This design system facilitates a "Magical Productivity" experience, merging the high-utility precision of a modern SaaS workspace with the whimsical, optimistic energy of AI-driven creation. The aesthetic is a hybrid of **Minimalism** and **Glassmorphism**, ensuring that while the interface remains functional for deep work, it retains an ethereal, "pixie-dusted" quality.

The UI should evoke a sense of effortless power—as if the software is anticipating the user's needs through "magical" intervention. Visuals are characterized by expansive white space, ultra-refined typography, and occasional "sparkle" moments where AI is active. The interface avoids clutter, opting for high-end, Linear-inspired layouts that use subtle glows rather than heavy ornamentation to signal AI presence.

## Colors

The palette is anchored in a professional **Magical Indigo** which provides the "utility" foundation. This is contrasted by **Soft Pixie Pink** and **Sparkle Gold**, used sparingly for high-value interactions and AI-status indicators. 

The background utilizes a clean **Soft Gray** to reduce eye strain, providing a neutral canvas for glassmorphic layers. Success states use a vibrant **Mint Green** to reinforce the feeling of "magical task completion." Gradients should be used with a light touch, primarily appearing as soft blurs behind active workspace elements or on primary "magic" actions.

## Typography

This design system employs a dual-font strategy. **Lexend** is used for headings to inject a friendly, approachable, and slightly rounded character into the workspace. Its geometry mirrors the roundedness of the UI components. 

**Inter** handles all functional body text and labels, providing the necessary legibility and technical rigor required for a SaaS productivity tool. Scale typography significantly for desktop layouts to create a clear information hierarchy, while using more compact variations for mobile to maintain context.

## Layout & Spacing

The layout follows a **fluid grid** model with a maximum container width of 1440px for desktop to prevent line lengths from becoming unreadable. A strict 8px base unit (the "Pixie Step") governs all padding and margins.

- **Desktop:** 12-column grid with 24px gutters. Sidebars should be fixed (240px-280px) while the main workspace expands.
- **Mobile:** Single column with 16px margins.
- **Rhythm:** Use generous vertical padding between sections (64px+) to maintain a "breathable," premium feel. Use tight stacking (12px) for related property controls in sidebars.

## Elevation & Depth

Depth is established through **Glassmorphism** and **Ambient Shadows**. This design system avoids harsh borders in favor of depth signals that feel "light as air."

1.  **Base Layer:** The soft gray background.
2.  **Surface Layer:** White cards with very soft, large-radius shadows (0px 10px 30px rgba(0,0,0,0.04)).
3.  **Floating Layer:** Glassmorphic overlays (back-drop blur 12px, 80% white opacity) for modals and dropdowns.
4.  **Magic Layer:** For active AI elements, apply a "Glow Border"—a 1px semi-transparent primary color border combined with an outer 4px soft glow in the same hue.

## Shapes

The shape language is overtly **Rounded**, specifically utilizing **2xl (1rem/16px)** as the standard radius for cards and containers. This removes the "sharp edges" of traditional enterprise software, making the workspace feel more inviting. Smaller components like buttons use slightly smaller radii to maintain visual balance, while tags/pills remain fully rounded (pill-shaped).

## Components

### Buttons
Primary buttons use the Indigo palette with a subtle gradient (top-to-bottom) and a 1px white inner border to give them a tactile, "pressable" feel. Secondary buttons are glassmorphic—transparent with a subtle border.

### Pixie Cards
The primary content container. Use a white background, 16px corner radius, and a 1px border (#e2e8f0). When an AI "Pixie" is processing, the card's border should animate with a slow "Sparkle Gold" pulse.

### Inputs & Fields
Input fields are minimal, using a light gray background (#f1f5f9) that transitions to white with a primary-colored glow border on focus.

### Status Indicators (Pixie Sparks)
Instead of standard dots, use small star or sparkle icons for status.
- **Active:** Glowing Gold Sparkle.
- **Success:** Mint Green Sparkle.
- **Error:** Soft Rose Tint (not harsh red).

### Floating Action Bar
A central, glassmorphic command bar at the bottom of the workspace for AI prompts, styled with a high backdrop blur and "Pixie Pink" accents for the submit action.