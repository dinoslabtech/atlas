export type FamilyTheme = {
  id: string
  /** CSS color for the card accent bar and identity wash. */
  accent: string
  /** Text on top of `accent` (Sajid contrast pair). */
  onAccent: string
  /** Three.js-safe hex for the family scene. */
  sceneBg: string
  sceneGround: string
  grid: string
  gridFine: string
}

const THEMES: Record<string, FamilyTheme> = {
  resistors: {
    id: 'resistors',
    accent: 'hsl(40 28% 58%)',
    onAccent: 'hsl(171 72% 10%)',
    sceneBg: '#1a1610',
    sceneGround: '#2a2418',
    grid: '#4a4030',
    gridFine: '#322c22',
  },
  capacitors: {
    id: 'capacitors',
    accent: 'hsl(28 42% 52%)',
    onAccent: 'hsl(171 72% 10%)',
    sceneBg: '#1c120e',
    sceneGround: '#301c14',
    grid: '#5a3828',
    gridFine: '#3a241c',
  },
  inductors: {
    id: 'inductors',
    accent: 'hsl(22 48% 48%)',
    onAccent: 'hsl(171 10% 93%)',
    sceneBg: '#1a0e0c',
    sceneGround: '#321810',
    grid: '#5a3020',
    gridFine: '#3a2016',
  },
  diodes: {
    id: 'diodes',
    accent: 'hsl(48 55% 52%)',
    onAccent: 'hsl(171 72% 10%)',
    sceneBg: '#16140c',
    sceneGround: '#2a2614',
    grid: '#4a4424',
    gridFine: '#322e18',
  },
  transistors: {
    id: 'transistors',
    accent: 'hsl(210 12% 58%)',
    onAccent: 'hsl(171 72% 10%)',
    sceneBg: '#10141a',
    sceneGround: '#1c2834',
    grid: '#3c5060',
    gridFine: '#283848',
  },
  ics: {
    id: 'ics',
    accent: 'hsl(171 28% 38%)',
    onAccent: 'hsl(171 10% 93%)',
    sceneBg: '#0c1614',
    sceneGround: '#143028',
    grid: '#2a5048',
    gridFine: '#1c3832',
  },
  connectors: {
    id: 'connectors',
    accent: 'hsl(42 62% 56%)',
    onAccent: 'hsl(171 72% 10%)',
    sceneBg: '#161208',
    sceneGround: '#2e2410',
    grid: '#5a4824',
    gridFine: '#3a3018',
  },
}

const FALLBACK: FamilyTheme = THEMES.resistors!

export function familyTheme(familyId: string): FamilyTheme {
  return THEMES[familyId] ?? FALLBACK
}

export function familyIds(): string[] {
  return Object.keys(THEMES)
}
