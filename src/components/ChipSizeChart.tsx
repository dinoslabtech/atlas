import { CHIP_SIZES } from '@/seed/packages'
import { cn } from '@/lib/utils'

const PX_PER_MM = 36

type ChipSizeChartProps = {
  selected?: string
  onSelect: (eia: string) => void
}

export function ChipSizeChart({ selected, onSelect }: ChipSizeChartProps) {
  return (
    <section aria-label="SMD chip sizes" className="rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10">
      <h2 className="text-sm font-medium">SMD sizes</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Drawn to one shared scale, true aspect ratio. Click a chip to set the package.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-4">
        {CHIP_SIZES.map((chip) => {
          const current = selected === chip.eia
          return (
            <button
              key={chip.eia}
              type="button"
              onClick={() => onSelect(chip.eia)}
              aria-pressed={current}
              className="flex flex-col items-center gap-2 rounded-md p-1 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span
                className={cn(
                  'block rounded-[2px] border',
                  current ? 'border-foreground bg-foreground/80' : 'border-foreground/70 bg-foreground/15',
                )}
                style={{
                  width: `${chip.widthMm * PX_PER_MM}px`,
                  height: `${chip.heightMm * PX_PER_MM}px`,
                }}
              />
              <span className="flex flex-col items-center">
                <span className="font-mono text-xs font-medium">{chip.eia}</span>
                <span className="text-[0.65rem] text-muted-foreground whitespace-nowrap">
                  {formatMm(chip.widthMm)} × {formatMm(chip.heightMm)} mm
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function formatMm(value: number): string {
  return Number.isInteger(value) ? value.toFixed(1) : String(value)
}
