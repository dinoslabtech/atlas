import { derive as capacitors } from './capacitors'
import { derivedConnectors } from './connectors'
import { diodesDerived } from './diodes'
import { icsDerived } from './ics'
import { derive as inductors } from './inductors'
import { derive as resistors } from './resistors'
import { derivedTransistors } from './transistors'
import type { DerivedRow } from './types'

export function deriveForFamily(
  familyId: string,
  classKey: string,
  values: Record<string, string>,
  ambientC: number,
): DerivedRow[] {
  switch (familyId) {
    case 'resistors':
      return resistors(values, ambientC)
    case 'capacitors':
      return capacitors(values, ambientC)
    case 'inductors':
      return inductors(values, ambientC)
    case 'diodes':
      return diodesDerived[classKey as keyof typeof diodesDerived]?.(values, ambientC) ?? []
    case 'transistors':
      return derivedTransistors(values, ambientC)
    case 'ics':
      return icsDerived(values, ambientC)
    case 'connectors':
      return derivedConnectors(values, ambientC)
    default:
      return []
  }
}
