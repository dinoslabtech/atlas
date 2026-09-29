export type FieldKind = 'token' | 'chip-package' | 'tolerance-plusminus'

export type FieldDef = {
  id: string
  label: string
  examples: string[]
  kind?: FieldKind
}

export type PartClass = {
  key: string
  name: string
  fields: FieldDef[]
}

export type Family = {
  id: string
  name: string
  group?: string
  specified: boolean
  classes: PartClass[]
}

export type ClassValues = Record<string, string>

export type ExampleValues = Record<string, ClassValues>
