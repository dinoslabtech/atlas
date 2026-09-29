type IdentityStripProps = {
  keyCode: string
  id: string
  name: string
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className="mt-1 font-mono text-base leading-snug break-all text-foreground sm:text-lg">{value}</div>
    </div>
  )
}

export function IdentityStrip({ keyCode, id, name }: IdentityStripProps) {
  return (
    <section aria-label="Part identity" className="grid gap-3 sm:grid-cols-3">
      <Cell label="Key" value={keyCode} />
      <Cell label="ID" value={id} />
      <Cell label="Name" value={name} />
    </section>
  )
}
