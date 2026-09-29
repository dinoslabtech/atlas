import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'
import { chip } from '../build'
import { diodesFamily, diodesValues } from './diodes'

function classByKey(key: string) {
  const found = diodesFamily.classes.find((item) => item.key === key)
  if (!found) throw new Error(`missing class ${key}`)
  return found
}

function valuesInOrder(key: string): string[] {
  return classByKey(key).fields.map((field) => diodesValues[key]?.[field.id] ?? '')
}

function fieldIds(key: string): string[] {
  return classByKey(key).fields.map((field) => field.id)
}

describe('diodes seed', () => {
  test('class prefixes', () => {
    expect(diodesFamily.classes.map((item) => item.key)).toEqual(['DD', 'DS', 'DZ', 'DL'])
  })

  test('complete specimen IDs', () => {
    expect(formatId('DD', valuesInOrder('DD'))).toBe('DD-150mA-SOD123-100V-0V7')
    expect(formatId('DS', valuesInOrder('DS'))).toBe('DS-1A-SMA-40V-0V3')
    expect(formatId('DZ', valuesInOrder('DZ'))).toBe('DZ-12V-SOD323-500mW-5%')
    expect(formatId('DL', valuesInOrder('DL'))).toBe('DL-RED-0603-20mA-2V0')
  })

  test('complete specimen IDs start with the class prefix', () => {
    for (const key of ['DD', 'DS', 'DZ', 'DL'] as const) {
      expect(formatId(key, valuesInOrder(key)).startsWith(`${key}-`)).toBe(true)
    }
  })

  test('appended fields keep existing order', () => {
    expect(fieldIds('DD')).toEqual(['current', 'package', 'voltage', 'vf'])
    expect(fieldIds('DS')).toEqual(['current', 'package', 'voltage', 'vf'])
    expect(fieldIds('DZ')).toEqual(['voltage', 'package', 'power', 'ztol'])
    expect(fieldIds('DL')).toEqual(['color', 'package', 'current', 'vf'])
  })

  test('DL package stays chip-package', () => {
    const pkg = classByKey('DL').fields.find((field) => field.id === 'package')
    expect(pkg?.kind).toBe(chip)
    expect(formatName('DL', classByKey('DL').fields, valuesInOrder('DL'))).toBe(
      'DL RED 0603 20mA 2V0',
    )
  })
})
