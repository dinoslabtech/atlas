/**
 * Dino's Lab hue 171 from dinoslab.com (#0f5f53), laid out Sajid-style:
 * background, text, accent, tertiary. Lightness ladder, top highlight,
 * inset + short + long shadow, ease cubic-bezier(0.3, 0.8, 0.2, 1.3).
 */

export const PALETTE = {
  lab: 'hsl(171 55% 62%)',
  labBright: 'hsl(171 58% 74%)',
  labDeep: 'hsl(171 73% 22%)',
  labHover: 'hsl(171 70% 28%)',
  labInk: 'hsl(171 72% 14%)',
  void: 'hsl(171 16% 4%)',
  paper: 'hsl(171 16% 6.5%)',
  panel: 'hsl(171 14% 10.5%)',
  raised: 'hsl(171 14% 13.5%)',
  mist: 'hsl(171 16% 16%)',
  ink: 'hsl(171 10% 93%)',
  muted: 'hsl(171 12% 70%)',
  line: 'hsl(171 12% 20%)',
  highlight: 'hsl(171 18% 30%)',
} as const

export const EASE_LAB = 'cubic-bezier(0.3, 0.8, 0.2, 1.3)'
