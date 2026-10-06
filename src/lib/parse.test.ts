import { describe, expect, test } from 'bun:test'

import { parseCelsius, parsePpm, parsePercent, parseSi } from './parse'

describe('parseSi', () => {
  test('resistance tokens', () => {
    expect(parseSi('10k')).toBe(10_000)
    expect(parseSi('4R7')).toBe(4.7)
    expect(parseSi('0R')).toBe(0)
    expect(parseSi('100mR')).toBeCloseTo(0.1)
    expect(parseSi('10mR')).toBeCloseTo(0.01)
  })

  test('power current voltage capacitance inductance', () => {
    expect(parseSi('100mW')).toBeCloseTo(0.1)
    expect(parseSi('63mW')).toBeCloseTo(0.063)
    expect(parseSi('150mA')).toBeCloseTo(0.15)
    expect(parseSi('50V')).toBe(50)
    expect(parseSi('100nF')).toBeCloseTo(100e-9)
    expect(parseSi('100nH')).toBeCloseTo(100e-9)
    expect(parseSi('4u7')).toBeCloseTo(4.7e-6)
  })

  test('empty is undefined', () => {
    expect(parseSi(undefined)).toBeUndefined()
    expect(parseSi('X')).toBeUndefined()
    expect(parseSi('')).toBeUndefined()
  })
})

describe('parse helpers', () => {
  test('percent ppm celsius', () => {
    expect(parsePercent('1%')).toBeCloseTo(0.01)
    expect(parsePpm('100ppm')).toBeCloseTo(100e-6)
    expect(parseCelsius('25C')).toBe(25)
    expect(parseCelsius('125')).toBe(125)
  })
})
