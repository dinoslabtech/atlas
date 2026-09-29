import { capacitorsFamily, capacitorsValues } from './families/capacitors'
import { connectorsFamily, connectorsValues } from './families/connectors'
import { diodesFamily, diodesValues } from './families/diodes'
import { icsFamily, icsValues } from './families/ics'
import { inductorsFamily, inductorsValues } from './families/inductors'
import { resistorsFamily, resistorsValues } from './families/resistors'
import { transistorsFamily, transistorsValues } from './families/transistors'
import type { ExampleValues, Family } from './types'

export const seedFamilies: Family[] = [
  resistorsFamily,
  capacitorsFamily,
  inductorsFamily,
  diodesFamily,
  transistorsFamily,
  icsFamily,
  connectorsFamily,
]

export const seedValues: ExampleValues = {
  ...resistorsValues,
  ...capacitorsValues,
  ...inductorsValues,
  ...diodesValues,
  ...transistorsValues,
  ...icsValues,
  ...connectorsValues,
}

export const DEFAULT_FAMILY_ID = 'resistors'
export const DEFAULT_CLASS_KEY = 'RR'
