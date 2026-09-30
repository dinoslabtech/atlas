export type FamilyTheme = {
  id: string
  /** CSS color for the card accent bar and identity wash. */
  accent: string
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
    sceneBg: '#14110e',
    sceneGround: '#1c1914',
    grid: '#3a3428',
    gridFine: '#2a261e',
  },
  capacitors: {
    id: 'capacitors',
    accent: 'hsl(28 42% 52%)',
    sceneBg: '#16110e',
    sceneGround: '#1e1612',
    grid: '#3d2c24',
    gridFine: '#2c201a',
  },
  inductors: {
    id: 'inductors',
    accent: 'hsl(22 48% 48%)',
    sceneBg: '#16100e',
    sceneGround: '#1e1512',
    grid: '#3d2a22',
    gridFine: '#2c1e18',
  },
  diodes: {
    id: 'diodes',
    accent: 'hsl(48 55% 52%)',
    sceneBg: '#15140e',
    sceneGround: '#1c1a12',
    grid: '#3d3820',
    gridFine: '#2c2918',
  },
  transistors: {
    id: 'transistors',
    accent: 'hsl(210 8% 62%)',
    sceneBg: '#101214',
    sceneGround: '#16181c',
    grid: '#2c3238',
    gridFine: '#202428',
  },
  ics: {
    id: 'ics',
    accent: 'hsl(171 6% 42%)',
    sceneBg: '#0e1414',
    sceneGround: '#141c1c',
    grid: '#243030',
    gridFine: '#1a2222',
  },
  connectors: {
    id: 'connectors',
    accent: 'hsl(42 62% 56%)',
    sceneBg: '#15120e',
    sceneGround: '#1c1812',
    grid: '#3d3420',
    gridFine: '#2c2618',
  },
}

const FALLBACK: FamilyTheme = THEMES.resistors!

export function familyTheme(familyId: string): FamilyTheme {
  return THEMES[familyId] ?? FALLBACK
}

export function familyIds(): string[] {
  return Object.keys(THEMES)
}
