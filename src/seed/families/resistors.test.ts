import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'
import { resistorsFamily, resistorsValues } from './resistors'

function classByKey(key: string) {
  const found = resistorsFamily.classes.find((item) => item.key === key)
  if (!found) throw new Error(`missing class ${key}`)
  return found
}

function valuesInOrder(key: string): string[] {
  return classByKey(key).fields.map((field) => resistorsValues[key]?.[field.id] ?? '')
}

describe('resistors seed', () => {
  test('prefix still RR-10k-1%-0402 when only first 3 values', () => {
    expect(formatId('RR', ['10k', '1%', '0402'])).toBe('RR-10k-1%-0402')
  })

  test('complete default IDs append the new fields', () => {
    expect(formatId('RR', valuesInOrder('RR'))).toBe('RR-10k-1%-0402-63mW-50V')
    expect(formatId('RX', valuesInOrder('RX'))).toBe('RX-10k-1%-0402-100mW-100ppm-TK-50V')
    expect(formatId('RW', valuesInOrder('RW'))).toBe('RW-10R-1%-0805-500mW-50ppm-NI-50V')
    expect(formatId('RS', valuesInOrder('RS'))).toBe('RS-10mR-1%-2512-2W-75ppm-4T-50V')
    expect(formatId('RN', valuesInOrder('RN'))).toBe('RN-10k-1%-0402x4-63mW-4-ISO-100ppm-50V')
  })

  test('complete default names match the IDs', () => {
    expect(formatName('RR', classByKey('RR').fields, valuesInOrder('RR'))).toBe(
      'RR 10k 1% 0402 63mW 50V',
    )
    expect(formatName('RX', classByKey('RX').fields, valuesInOrder('RX'))).toBe(
      'RX 10k 1% 0402 100mW 100ppm TK 50V',
    )
    expect(formatName('RN', classByKey('RN').fields, valuesInOrder('RN'))).toBe(
      'RN 10k 1% 0402x4 63mW 4 ISO 100ppm 50V',
    )
  })

  test('unset RN voltage copies as X', () => {
    const values = valuesInOrder('RN')
    values[values.length - 1] = ''
    expect(formatId('RN', values)).toBe('RN-10k-1%-0402x4-63mW-4-ISO-100ppm-X')
  })

  test('appended fields stay after the existing sequence', () => {
    expect(classByKey('RR').fields.map((field) => field.id)).toEqual([
      'resistance',
      'tolerance',
      'package',
      'power',
      'voltage',
    ])
    expect(classByKey('RX').fields.map((field) => field.id)).toEqual([
      'resistance',
      'tolerance',
      'package',
      'power',
      'tcr',
      'tech',
      'voltage',
    ])
    expect(classByKey('RW').fields.map((field) => field.id)).toEqual([
      'resistance',
      'tolerance',
      'package',
      'power',
      'tcr',
      'winding',
      'voltage',
    ])
    expect(classByKey('RS').fields.map((field) => field.id)).toEqual([
      'resistance',
      'tolerance',
      'package',
      'power',
      'tcr',
      'term',
      'voltage',
    ])
    expect(classByKey('RN').fields.map((field) => field.id)).toEqual([
      'resistance',
      'tolerance',
      'package',
      'power',
      'count',
      'config',
      'tcr',
      'voltage',
    ])
  })

  test('RR package examples include 1210 and 2010', () => {
    const pkg = classByKey('RR').fields.find((field) => field.id === 'package')
    expect(pkg?.examples).toContain('1210')
    expect(pkg?.examples).toContain('2010')
  })
})
