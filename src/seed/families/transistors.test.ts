import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'

import { transistorsFamily, transistorsValues } from './transistors'

function classByKey(key: string) {
  const found = transistorsFamily.classes.find((item) => item.key === key)
  if (!found) throw new Error(`missing class ${key}`)
  return found
}

function valuesInOrder(key: string): string[] {
  const part = classByKey(key)
  return part.fields.map((field) => transistorsValues[key]?.[field.id] ?? '')
}

describe('transistors family', () => {
  test('prefixes are QN QP MN MP', () => {
    expect(transistorsFamily.classes.map((item) => item.key)).toEqual(['QN', 'QP', 'MN', 'MP'])
  })

  test('channel stays in the Key', () => {
    for (const part of transistorsFamily.classes) {
      expect(part.fields.some((field) => field.id === 'channel')).toBe(false)
    }
  })

  test('documented prefixes remain the leading fields', () => {
    expect(formatId('QN', valuesInOrder('QN'))).toMatch(/^QN-200mA-SOT23-40V/)
    expect(formatId('QP', valuesInOrder('QP'))).toMatch(/^QP-200mA-SOT23-40V/)
    expect(formatId('MN', valuesInOrder('MN'))).toMatch(/^MN-3A-SOT23-30V/)
    expect(formatId('MP', valuesInOrder('MP'))).toMatch(/^MP-3A-SOT23-30V/)
  })

  test('complete IDs', () => {
    expect(formatId('QN', valuesInOrder('QN'))).toBe('QN-200mA-SOT23-40V-100-250mW')
    expect(formatName('QN', classByKey('QN').fields, valuesInOrder('QN'))).toBe(
      'QN 200mA SOT23 40V 100 250mW',
    )
    expect(formatId('QP', valuesInOrder('QP'))).toBe('QP-200mA-SOT23-40V-100-250mW')
    expect(formatName('QP', classByKey('QP').fields, valuesInOrder('QP'))).toBe(
      'QP 200mA SOT23 40V 100 250mW',
    )
    expect(formatId('MN', valuesInOrder('MN'))).toBe('MN-3A-SOT23-30V-20mR-2V5')
    expect(formatName('MN', classByKey('MN').fields, valuesInOrder('MN'))).toBe(
      'MN 3A SOT23 30V 20mR 2V5',
    )
    expect(formatId('MP', valuesInOrder('MP'))).toBe('MP-3A-SOT23-30V-20mR-2V5')
    expect(formatName('MP', classByKey('MP').fields, valuesInOrder('MP'))).toBe(
      'MP 3A SOT23 30V 20mR 2V5',
    )
  })

  test('hfe/power and rds/vgs are appended', () => {
    expect(classByKey('QN').fields.map((field) => field.id)).toEqual([
      'current',
      'package',
      'voltage',
      'hfe',
      'power',
    ])
    expect(classByKey('QP').fields.map((field) => field.id)).toEqual([
      'current',
      'package',
      'voltage',
      'hfe',
      'power',
    ])
    expect(classByKey('MN').fields.map((field) => field.id)).toEqual([
      'current',
      'package',
      'voltage',
      'rds',
      'vgs',
    ])
    expect(classByKey('MP').fields.map((field) => field.id)).toEqual([
      'current',
      'package',
      'voltage',
      'rds',
      'vgs',
    ])
  })
})
