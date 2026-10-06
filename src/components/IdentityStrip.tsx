import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { Button } from '@/components/ui/button'
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
      className="identity-cell panel min-w-0 flex-1 px-4 py-3"
      style={{ '--family-accent': accent } as CSSProperties}
    >
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className="mt-1 font-mono text-base leading-snug break-all text-foreground sm:text-lg">{value}</div>
    </div>
  )
}

export function IdentityStrip({ keyCode, id, name, familyId }: IdentityStripProps) {
  const theme = familyTheme(familyId ?? 'resistors')
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const canCopy = id.length > 0 && id !== '—'

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current)
    }
  }, [])

  async function copyId() {
    if (!canCopy) return
    try {
      await navigator.clipboard.writeText(id)
    } catch {
      return
    }
    setCopied(true)
    if (copiedTimer.current) clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section aria-label="Part identity" className="grid gap-3 sm:grid-cols-3">
      <Cell label="Key" value={keyCode} accent={theme.accent} />
      <div
        className="identity-cell panel flex min-w-0 flex-1 flex-col px-4 py-3"
        style={{ '--family-accent': theme.accent } as CSSProperties}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">ID</div>
          <Button type="button" variant="outline" size="sm" disabled={!canCopy} onClick={() => void copyId()}>
            {copied ? 'Copied' : 'Copy ID'}
          </Button>
        </div>
        <div className="mt-1 font-mono text-base leading-snug break-all text-foreground sm:text-lg">{id}</div>
        <p className="sr-only" aria-live="polite">
          {copied ? `Copied ${id}` : ''}
        </p>
      </div>
      <Cell label="Name" value={name} accent={theme.accent} />
    </section>
  )
}
