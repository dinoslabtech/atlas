import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, test } from 'bun:test'

import { seedFamilies } from './taxonomy'

const housesDir = join(import.meta.dir, '../../docs/houses')

function houseText(): string {
  return readdirSync(housesDir)
    .filter((name) => name.endsWith('.md') && name !== 'README.md')
    .map((name) => readFileSync(join(housesDir, name), 'utf8'))
    .join('\n')
}

describe('houses docs', () => {
  test('do not describe specified Classes as empty', () => {
    const text = houseText()
    expect(text).not.toMatch(/has zero fields/i)
    expect(text).not.toMatch(/Not on current \w+ ID/)
    expect(text).not.toMatch(/RR is three fields/)
    expect(text).not.toMatch(/RR does not carry power/)
    for (const family of seedFamilies) {
      for (const part of family.classes) {
        if (part.fields.length === 0) continue
        expect(text).not.toMatch(new RegExp(`Key \`${part.key}\` has zero fields`))
      }
    }
  })
})
