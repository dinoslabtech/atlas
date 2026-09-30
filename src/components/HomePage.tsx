import type { CSSProperties } from 'react'

import { FamilyPreview3D } from '@/components/FamilyPreview3D'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { familyIsSpecified } from '@/lib/taxonomy'
import type { Family } from '@/seed/types'
import { familyTheme } from '@/theme/families'

type HomePageProps = {
  families: Family[]
}

export function HomePage({ families }: HomePageProps) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-8 p-4 sm:p-6">
      <header className="flex flex-col gap-2">
        <p className="eyebrow">Dino's Lab</p>
        <h1 className="text-3xl font-semibold tracking-tight">Atlas</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Visualize a package, pick its values, copy the ID. Choose a component type to open its page.
        </p>
      </header>

      <section aria-label="Component types" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {families.map((family) => {
          const specified = familyIsSpecified(family)
          const href = `#/${family.id}/${family.classes[0]?.key ?? ''}`
          const theme = familyTheme(family.id)
          return (
            <a
              key={family.id}
              href={href}
              className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card
                className="family-card panel h-full gap-0 py-0 ring-0"
                style={
                  {
                    '--family-accent': theme.accent,
                    '--family-on-accent': theme.onAccent,
                  } as CSSProperties
                }
              >
                <div className="h-[3px] w-full" style={{ background: theme.accent }} />
                <FamilyPreview3D familyId={family.id} />
                <CardHeader className="py-4">
                  <div className="flex items-center gap-2">
                    <CardTitle>{family.name}</CardTitle>
                    {specified ? null : <Badge variant="secondary">Still being specified</Badge>}
                  </div>
                  <CardDescription>
                    {family.classes.map((item) => item.key).join(' · ') || 'No classes yet'}
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          )
        })}
      </section>
    </div>
  )
}
