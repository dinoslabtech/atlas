import { describe, expect, test } from 'bun:test'

import { diodesValues } from '@/seed/families/diodes'

import { diodesDerived } from './diodes'

describe('derived diodes', () => {
  test('Pd of 150mA * 0.7V', () => {
    expect(diodesDerived.DD({ current: '150mA', vf: '0V7' }, 25)).toEqual([
      { label: 'Pd', value: '105mW' },
    ])
  })

  test('DD seed values give the same Pd', () => {
    expect(diodesDerived.DD(diodesValues.DD ?? {}, 25)).toEqual([{ label: 'Pd', value: '105mW' }])
  })

  test('DS and DL use If * Vf', () => {
    expect(diodesDerived.DS(diodesValues.DS ?? {}, 25)).toEqual([{ label: 'Pd', value: '300mW' }])
    expect(diodesDerived.DL(diodesValues.DL ?? {}, 25)).toEqual([{ label: 'Pd', value: '40mW' }])
  })

  test('DZ Izmax is P / Vz', () => {
    expect(diodesDerived.DZ(diodesValues.DZ ?? {}, 25)).toEqual([{ label: 'Izmax', value: '41.7mA' }])
  })

  test('missing current or vf yields no Pd row', () => {
    expect(diodesDerived.DD({ current: '150mA' }, 25)).toEqual([])
    expect(diodesDerived.DD({ vf: '0V7' }, 25)).toEqual([])
  })
})
