import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'

import { connectorsFamily, connectorsValues } from './connectors'

const jj = connectorsFamily.classes[0]!

function valuesInOrder(values: Record<string, string>): string[] {
  return jj.fields.map((item) => values[item.id] ?? '')
}

describe('connectors family', () => {
  test('JJ is specified with type, pins, pitch, orientation, mount', () => {
    expect(connectorsFamily.specified).toBe(true)
    expect(jj.key).toBe('JJ')
    expect(jj.fields.map((item) => item.id)).toEqual(['type', 'pins', 'pitch', 'orientation', 'mount'])
    expect(jj.fields.map((item) => item.examples)).toEqual([
      ['HDR', 'USBC', 'RJ45', 'TB'],
      ['1x10', '1x8', '2x5', '2PIN'],
      ['2.54mm', '1.27mm', '5.08mm'],
      ['VERT', 'RA'],
      ['PTH', 'SMD'],
    ])
  })

  test('default specimen is the 2.54 mm vertical PTH header', () => {
    const values = valuesInOrder(connectorsValues.JJ ?? {})
    expect(formatId('JJ', values)).toBe('JJ-HDR-1x10-2.54mm-VERT-PTH')
    expect(formatName('JJ', jj.fields, values)).toBe('JJ HDR 1x10 2.54mm VERT PTH')
  })

  test('USB-C keeps other fields as X', () => {
    const values = valuesInOrder({ type: 'USBC' })
    expect(formatId('JJ', values)).toBe('JJ-USBC-X-X-X-X')
    expect(formatName('JJ', jj.fields, values)).toBe('JJ USBC X X X X')
  })
})
