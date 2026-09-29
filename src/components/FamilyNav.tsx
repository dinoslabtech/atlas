import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { familyIsSpecified } from '@/lib/taxonomy'
import type { Family } from '@/seed/types'

type FamilyNavProps = {
  families: Family[]
  familyId: string
  classKey: string
  onSelect: (familyId: string, classKey: string) => void
}

export function FamilyNav({ families, familyId, classKey, onSelect }: FamilyNavProps) {
  const groups = groupFamilies(families)

  return (
    <nav aria-label="Component families" className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          {group.label !== 'ungrouped' ? (
            <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{group.label}</h2>
          ) : null}
          {group.families.map((family) => {
            const specified = familyIsSpecified(family)
            return (
              <div key={family.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-sm font-medium">{family.name}</span>
                  {specified ? null : (
                    <Badge variant="secondary">Still being specified</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {family.classes.length === 0 ? (
                    <p className="px-1 text-xs text-muted-foreground">No classes yet.</p>
                  ) : (
                    family.classes.map((item) => {
                      const current = family.id === familyId && item.key === classKey
                      return (
                        <Button
                          key={item.key}
                          type="button"
                          size="sm"
                          variant={current ? 'default' : 'outline'}
                          aria-current={current ? 'page' : undefined}
                          onClick={() => onSelect(family.id, item.key)}
                        >
                          {item.key}
                        </Button>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

function groupFamilies(families: Family[]): { label: string; families: Family[] }[] {
  const groups: { label: string; families: Family[] }[] = []
  for (const family of families) {
    const label = family.group ?? 'ungrouped'
    const last = groups[groups.length - 1]
    if (last && last.label === label) last.families.push(family)
    else groups.push({ label, families: [family] })
  }
  return groups
}
