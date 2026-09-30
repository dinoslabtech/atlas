import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { DerivedRow } from '@/lib/derived/types'

type DerivedPanelProps = {
  rows: DerivedRow[]
  ambientC: number
  onAmbientC: (value: number) => void
}

export function DerivedPanel({ rows, ambientC, onAmbientC }: DerivedPanelProps) {
  if (rows.length === 0) return null
  return (
    <section aria-label="Derived values" className="panel px-4 py-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium">Derived from the selection</h2>
          <p className="mt-1 text-xs text-muted-foreground">Not part of the ID. Changes with the fields and ambient temperature.</p>
        </div>
        <div className="w-36">
          <Label htmlFor="ambient-c">Ambient °C</Label>
          <Input
            id="ambient-c"
            type="number"
            value={ambientC}
            min={-55}
            max={155}
            onChange={(event) => onAmbientC(Number(event.target.value))}
          />
        </div>
      </div>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-3 rounded-md bg-muted/50 px-3 py-2">
            <dt className="text-xs text-muted-foreground">{row.label}</dt>
            <dd className="font-mono text-sm">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
