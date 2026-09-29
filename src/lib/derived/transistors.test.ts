import { describe, expect, test } from 'bun:test'

import { transistorsValues } from '@/seed/families/transistors'

import { derivedTransistors } from './transistors'

describe('derived transistors', () => {
  test('BJT shows Ic * V estimate and power rating', () => {
    expect(derivedTransistors(transistorsValues.QN, 25)).toEqual([
      { label: 'Dissipation estimate', value: '8W' },
      { label: 'Power rating', value: '250mW' },
      { label: 'Estimate vs rating', value: 'over' },
    ])
  })

  test('BJT estimate within rating is ok', () => {
    expect(
      derivedTransistors({ current: '200mA', voltage: '1V', power: '250mW' }, 25),
    ).toEqual([
      { label: 'Dissipation estimate', value: '200mW' },
      { label: 'Power rating', value: '250mW' },
      { label: 'Estimate vs rating', value: 'ok' },
    ])
  })

  test('MOSFET 3A^2 * 20mR is 180mW conduction loss', () => {
    expect(derivedTransistors(transistorsValues.MN, 25)).toEqual([
      { label: 'Conduction loss', value: '180mW' },
    ])
    expect(derivedTransistors({ current: '3A', rds: '20mR' }, 25)).toEqual([
      { label: 'Conduction loss', value: '180mW' },
    ])
  })

  test('missing Ic, V, P or Rds yields no row', () => {
    expect(derivedTransistors({ current: '200mA', voltage: '40V' }, 25)).toEqual([])
    expect(derivedTransistors({ current: '3A' }, 25)).toEqual([])
  })
})
