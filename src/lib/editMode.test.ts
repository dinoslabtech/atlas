import { describe, expect, test } from 'bun:test'

import { isEditMode } from './editMode'

describe('isEditMode', () => {
  test('only ?edit=1 turns the workshop on', () => {
    expect(isEditMode('?edit=1')).toBe(true)
    expect(isEditMode('?edit=1&x=2')).toBe(true)
    expect(isEditMode('?x=2&edit=1')).toBe(true)
    expect(isEditMode('')).toBe(false)
    expect(isEditMode('?edit=true')).toBe(false)
    expect(isEditMode('?edit=0')).toBe(false)
    expect(isEditMode('?foo=1')).toBe(false)
  })
})
