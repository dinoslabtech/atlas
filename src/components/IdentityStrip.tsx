import type { CSSProperties } from 'react'

import { familyTheme } from '@/theme/families'

type IdentityStripProps = {
  keyCode: string
  id: string
  name: string
  familyId?: string
}

function Cell({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      className="panel min-w-0 flex-1 px-4 py-3"
      style={{ '--family-accent': accent } as CSSProperties}
    >
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className="mt-1 font-mono text-base leading-snug break-all text-foreground sm:text-lg">{value}</div>
    </div>
  )
}

export function IdentityStrip({ keyCode, id, name, familyId }: IdentityStripProps) {
  const accent = familyTheme(familyId ?? 'resistors').accent
  return (
    <section aria-label="Part identity" className="grid gap-3 sm:grid-cols-3">
      <Cell label="Key" value={keyCode} accent={accent} />
      <Cell label="ID" value={id} accent={accent} />
      <Cell label="Name" value={name} accent={accent} />
    </section>
  )
}
