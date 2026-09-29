import { describe, expect, test } from 'bun:test'

import { seedFamilies } from '@/seed/taxonomy'
import { parseHash } from './hash'

describe('parseHash', () => {
  test('empty hash is the homepage', () => {
    expect(parseHash('', seedFamilies)).toEqual({ screen: 'home' })
    expect(parseHash('#', seedFamilies)).toEqual({ screen: 'home' })
    expect(parseHash('#/', seedFamilies)).toEqual({ screen: 'home' })
  })

  test('family path opens that family on its first class', () => {
    expect(parseHash('#/resistors', seedFamilies)).toEqual({
      screen: 'family',
      familyId: 'resistors',
      classKey: 'RR',
    })
  })

  test('family and class path opens that class', () => {
    expect(parseHash('#/diodes/DL', seedFamilies)).toEqual({
      screen: 'family',
      familyId: 'diodes',
      classKey: 'DL',
    })
  })

  test('unknown family is the homepage', () => {
    expect(parseHash('#/nope', seedFamilies)).toEqual({ screen: 'home' })
  })
})
