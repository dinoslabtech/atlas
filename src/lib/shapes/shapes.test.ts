import { describe, expect, test } from 'bun:test'

import {
  boundingHeight,
  boundingWidth,
  familyPreviewKind,
  focusPose,
  layoutShapes,
  lineupPose,
  shapesForClass,
} from '@/lib/shapes'
import { seedFamilies } from '@/seed/taxonomy'

describe('shapesForClass', () => {
  for (const family of seedFamilies) {
    for (const part of family.classes) {
      test(`${family.id} ${part.key} every package token has a shape`, () => {
        const field = part.fields.find(
          (item) => item.id === 'package' || item.id === 'case' || item.id === 'pins',
        )
        const shapes = shapesForClass(part, { familyId: family.id })
        expect(shapes.length).toBeGreaterThan(0)
        if (!field) return
        for (const token of field.examples) {
          expect(shapes.some((shape) => shape.id === token || shape.label.includes(token))).toBe(true)
        }
      })
    }
  }

  test('tantalum cases keep Case labels', () => {
    const ct = seedFamilies.flatMap((family) => family.classes).find((item) => item.key === 'CT')
    expect(ct).toBeDefined()
    const shapes = shapesForClass(ct!, { familyId: 'capacitors' })
    expect(shapes.map((shape) => shape.id).sort()).toEqual(['A', 'B', 'C', 'D', 'E'])
  })

  test('LED color follows the field', () => {
    const dl = seedFamilies.flatMap((family) => family.classes).find((item) => item.key === 'DL')
    const red = shapesForClass(dl!, { familyId: 'diodes', ledColor: 'RED' })
    const blue = shapesForClass(dl!, { familyId: 'diodes', ledColor: 'BLUE' })
    const thtRed = red.find((shape) => shape.type === 'led-tht')
    const thtBlue = blue.find((shape) => shape.type === 'led-tht')
    expect(thtRed && thtRed.type === 'led-tht' ? thtRed.color : '').toBe('#d32f2f')
    expect(thtBlue && thtBlue.type === 'led-tht' ? thtBlue.color : '').toBe('#1e88e5')
  })

  test('SOIC8 is soic, TSSOP14 is tssop, QFN32 is qfn, DIP8 is dip', () => {
    const ic = seedFamilies.flatMap((family) => family.classes).find((item) => item.key === 'IC')
    const shapes = shapesForClass(ic!, { familyId: 'ics' })
    expect(shapes.find((shape) => shape.id === 'SOIC8')?.type).toBe('soic')
    expect(shapes.find((shape) => shape.id === 'TSSOP14')?.type).toBe('tssop')
    expect(shapes.find((shape) => shape.id === 'QFN32')?.type).toBe('qfn')
    expect(shapes.find((shape) => shape.id === 'DIP8')?.type).toBe('dip')
  })

  test('connector types appear beside header pin tokens', () => {
    const jj = seedFamilies.flatMap((family) => family.classes).find((item) => item.key === 'JJ')
    const shapes = shapesForClass(jj!, { familyId: 'connectors', connectorType: 'USBC' })
    expect(shapes.some((shape) => shape.type === 'usbc')).toBe(true)
    expect(shapes.some((shape) => shape.type === 'header')).toBe(true)
  })

  test('LP power footprints stay square; LC metric codes are common-mode', () => {
    const classes = seedFamilies.flatMap((family) => family.classes)
    const lp = classes.find((item) => item.key === 'LP')
    const lc = classes.find((item) => item.key === 'LC')
    const ll = classes.find((item) => item.key === 'LL')
    const fb = classes.find((item) => item.key === 'FB')
    expect(lp && lc && ll && fb).toBeDefined()
    const power = shapesForClass(lp!, { familyId: 'inductors' })
    expect(power.map((shape) => shape.id)).toEqual(['2520', '3015', '4020', '5020', '6028'])
    for (const shape of power) {
      expect(shape.type).toBe('power')
      if (shape.type === 'power') expect(shape.length).toBe(shape.width)
    }
    const common = shapesForClass(lc!, { familyId: 'inductors' })
    expect(common.find((shape) => shape.id === '0805')?.type).toBe('chip')
    expect(common.find((shape) => shape.id === '1206')?.type).toBe('chip')
    expect(common.find((shape) => shape.id === '1812')?.type).toBe('chip')
    expect(common.find((shape) => shape.id === '2012')?.type).toBe('common-mode')
    expect(common.find((shape) => shape.id === '3216')?.type).toBe('common-mode')
    expect(common.find((shape) => shape.id === '4532')?.type).toBe('common-mode')
    const signal = shapesForClass(ll!, { familyId: 'inductors' })
    const bead = shapesForClass(fb!, { familyId: 'inductors' })
    expect(signal.every((shape) => shape.type === 'chip' && shape.style === 'inductor')).toBe(true)
    expect(bead.every((shape) => shape.type === 'chip' && shape.style === 'ferrite')).toBe(true)
  })

  test('every family preview has positive bounds', () => {
    for (const family of seedFamilies) {
      const shape = familyPreviewKind(family.id)
      expect(boundingWidth(shape)).toBeGreaterThan(0)
      expect(boundingHeight(shape)).toBeGreaterThan(0)
    }
  })

  test('family previews use distinct silhouettes', () => {
    expect(familyPreviewKind('resistors').type).toBe('chip')
    expect(familyPreviewKind('capacitors').type).toBe('can')
    expect(familyPreviewKind('inductors').type).toBe('power')
    expect(familyPreviewKind('diodes').type).toBe('led-tht')
    expect(familyPreviewKind('transistors').type).toBe('to92')
    expect(familyPreviewKind('ics').type).toBe('soic')
    expect(familyPreviewKind('connectors').type).toBe('usbc')
  })

  test('focus pose looks at the laid-out body; lineup looks at the origin', () => {
    const rr = seedFamilies.flatMap((family) => family.classes).find((item) => item.key === 'RR')
    expect(rr).toBeDefined()
    const shapes = shapesForClass(rr!, { familyId: 'resistors' })
    const laid = layoutShapes(shapes)
    const item = laid.items.find((entry) => entry.shape.id === '0402')
    expect(item).toBeDefined()
    const focused = focusPose(item!.shape, item!.x)
    expect(focused.target[0]).toBe(item!.x)
    expect(focused.target[1]).toBeGreaterThan(0)
    expect(focused.minDistance).toBeGreaterThan(0)
    expect(focused.maxDistance).toBeGreaterThan(focused.minDistance)
    const tallest = Math.max(...shapes.map(boundingHeight), 1)
    const lineup = lineupPose(shapes, laid.span, tallest)
    expect(lineup.target[0]).toBe(0)
    expect(lineup.minDistance).toBeGreaterThan(0)
  })
})
