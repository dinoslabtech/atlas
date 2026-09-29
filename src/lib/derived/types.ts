export type DerivedRow = {
  label: string
  value: string
}

export type DerivedFn = (values: Record<string, string>, ambientC: number) => DerivedRow[]
