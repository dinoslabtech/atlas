import { describe, expect, test } from 'bun:test'

import { formatSi } from '@/lib/parse'
import { inductorsValues } from '@/seed/families/inductors'

import { derive } from './inductors'

const energy4u7At3A = formatSi(0.5 * 4.7e-6 * 3 * 3, 'J')

describe('inductor derived values', () => {
  test('energy for 4u7 3A', () => {
    expect(derive({ inductance: '4u7', isat: '3A' }, 25)).toEqual([
      { label: 'Energy', value: energy4u7At3A },
    ])
    expect(energy4u7At3A).toBe('21.1uJ')
  })

  test('uses irms then irated when isat is missing', () => {
    expect(derive({ inductance: '4u7', irms: '3A' }, 25)).toEqual([
      { label: 'Energy', value: energy4u7At3A },
    ])
    expect(derive({ inductance: '4u7', irated: '3A' }, 25)).toEqual([
      { label: 'Energy', value: energy4u7At3A },
    ])
  })

  test('prefers isat over irms for the LP specimen', () => {
    expect(derive(inductorsValues.LP, 25)).toEqual([
      { label: 'Energy', value: energy4u7At3A },
      { label: 'Copper drop', value: formatSi(3 * 0.08, 'V') },
    ])
  })

  test('FB copper drop from irated and dcr', () => {
    expect(derive(inductorsValues.FB, 25)).toEqual([
      { label: 'Copper drop', value: formatSi(0.5 * 0.2, 'V') },
    ])
  })

  test('skips rows when tokens are missing', () => {
    expect(derive(inductorsValues.LL, 25)).toEqual([])
    expect(derive({ inductance: '4u7' }, 25)).toEqual([])
    expect(derive({ dcr: '80mR' }, 25)).toEqual([])
  })

  test('ambientC is unused', () => {
    const values = { inductance: '4u7', isat: '3A', dcr: '80mR' }
    expect(derive(values, -40)).toEqual(derive(values, 125))
  })
})
