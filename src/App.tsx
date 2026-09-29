import { useEffect, useRef, useState } from 'react'

import { DerivedPanel } from '@/components/DerivedPanel'
import { FamilyNav } from '@/components/FamilyNav'
import { FamilyPreview3D } from '@/components/FamilyPreview3D'
import { FieldPickers } from '@/components/FieldPickers'
import { HomePage } from '@/components/HomePage'
import { IdentityStrip } from '@/components/IdentityStrip'
import { PackageView3D } from '@/components/PackageView3D'
import { TaxonomyEditor } from '@/components/TaxonomyEditor'
import { Button } from '@/components/ui/button'
import { identity } from '@/lib/identity'
import { parseHash, writeHash } from '@/lib/hash'
import { deriveForFamily } from '@/lib/derived'
import { shapesForClass } from '@/lib/packageShapes'
import { cloneTaxonomy, familyIsSpecified, findClassInFamily, findFamily, valuesInOrder } from '@/lib/taxonomy'
import { seedFamilies, seedValues } from '@/seed/taxonomy'
import type { ExampleValues, Family } from '@/seed/types'
import { clearSnapshot, loadSnapshot, saveSnapshot } from '@/storage/localTaxonomy'

function readStartup(): {
  families: Family[]
  values: ExampleValues
  screen: 'home' | 'family'
  familyId: string
  classKey: string
} {
  const stored = loadSnapshot()
  const families = stored?.families ?? cloneTaxonomy(seedFamilies)
  const values = stored?.values ?? cloneTaxonomy(seedValues)
  const route = parseHash(window.location.hash, families)
  if (route.screen === 'home') {
    return { families, values, screen: 'home', familyId: '', classKey: '' }
  }
  return {
    families,
    values,
    screen: 'family',
    familyId: route.familyId,
    classKey: route.classKey,
  }
}

export default function App() {
  const [startup] = useState(readStartup)
  const [families, setFamilies] = useState<Family[]>(startup.families)
  const [values, setValues] = useState<ExampleValues>(startup.values)
  const [screen, setScreen] = useState<'home' | 'family'>(startup.screen)
  const [familyId, setFamilyId] = useState(startup.familyId)
  const [classKey, setClassKey] = useState(startup.classKey)
  const [editorOpen, setEditorOpen] = useState(false)
  const [ambientC, setAmbientC] = useState(25)
  const familiesRef = useRef(families)
  const valuesRef = useRef(values)
  familiesRef.current = families
  valuesRef.current = values

  function persistFamilies(next: Family[]) {
    familiesRef.current = next
    setFamilies(next)
    saveSnapshot({ version: 1, families: next, values: valuesRef.current })
  }

  function persistValues(next: ExampleValues) {
    valuesRef.current = next
    setValues(next)
    saveSnapshot({ version: 1, families: familiesRef.current, values: next })
  }

  useEffect(() => {
    if (screen === 'home') writeHash({ screen: 'home' })
    else writeHash({ screen: 'family', familyId, classKey })
  }, [screen, familyId, classKey])

  useEffect(() => {
    const onHash = () => {
      const route = parseHash(window.location.hash, families)
      if (route.screen === 'home') {
        setScreen('home')
        return
      }
      setScreen('family')
      setFamilyId(route.familyId)
      setClassKey(route.classKey)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [families])

  const family = findFamily(families, familyId)
  const part = family ? findClassInFamily(family, classKey) : undefined
  const classValues = part ? (values[part.key] ?? {}) : {}
  const identityNow = part
    ? identity(part.key, part.fields, valuesInOrder(part, classValues))
    : { key: '—', id: '—', name: '—' }

  const packageField = part?.fields.find(
    (field) =>
      field.kind === 'chip-package' || field.id === 'package' || field.id === 'case' || field.id === 'pins',
  )
  const shapes = part ? shapesForClass(part) : []
  const specified = family ? familyIsSpecified(family) : false

  function select(nextFamilyId: string, nextClassKey: string) {
    setScreen('family')
    setFamilyId(nextFamilyId)
    const nextFamily = findFamily(families, nextFamilyId)
    const nextPart = nextFamily
      ? findClassInFamily(nextFamily, nextClassKey) ?? nextFamily.classes[0]
      : undefined
    setClassKey(nextPart?.key ?? nextClassKey)
  }

  function setFieldValue(fieldId: string, value: string) {
    if (!part) return
    persistValues({
      ...valuesRef.current,
      [part.key]: { ...(valuesRef.current[part.key] ?? {}), [fieldId]: value },
    })
  }

  function resetToSeed() {
    clearSnapshot()
    const nextFamilies = cloneTaxonomy(seedFamilies)
    const nextValues = cloneTaxonomy(seedValues)
    persistFamilies(nextFamilies)
    persistValues(nextValues)
    setScreen('home')
    setFamilyId('')
    setClassKey('')
    setEditorOpen(false)
  }

  if (screen === 'home') {
    return <HomePage families={families} />
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <header className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Dino's Lab</p>
            <h1 className="text-3xl font-semibold tracking-tight">Atlas</h1>
            <p className="text-sm text-muted-foreground">Where a part gets its Key, ID, and Name.</p>
          </div>
          <Button variant="outline" asChild>
            <a href="#/">All types</a>
          </Button>
        </div>
        <IdentityStrip keyCode={identityNow.key} id={identityNow.id} name={identityNow.name} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <FamilyNav
          families={family ? [family] : []}
          familyId={familyId}
          classKey={classKey}
          onSelect={select}
        />

        <main className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-medium">
              {family?.name ?? 'Family'} {part ? `· ${part.key}` : ''}
            </h2>
            <p className="text-sm text-muted-foreground">
              {part?.name ?? 'Pick a class.'}
              {specified ? null : ' This family is still being specified.'}
            </p>
          </div>

          {part && shapes.length > 0 && packageField ? (
            <PackageView3D
              part={part}
              selected={classValues[packageField.id]}
              onSelect={(id) => setFieldValue(packageField.id, id)}
            />
          ) : family ? (
            <section aria-label="3D package view" className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
              <div className="px-4 pt-4">
                <h2 className="text-sm font-medium">3D packages</h2>
                <p className="mt-1 text-xs text-muted-foreground">A representative body for this type.</p>
              </div>
              <FamilyPreview3D familyId={family.id} interactive />
            </section>
          ) : null}

          {part ? (
            <FieldPickers fields={part.fields} values={classValues} onChange={setFieldValue} />
          ) : (
            <p className="text-sm text-muted-foreground">Add a class in the taxonomy editor to start.</p>
          )}

          {part ? (
            <DerivedPanel
              rows={deriveForFamily(familyId, part.key, classValues, ambientC)}
              ambientC={ambientC}
              onAmbientC={setAmbientC}
            />
          ) : null}

          <div>
            <Button type="button" variant={editorOpen ? 'secondary' : 'outline'} onClick={() => setEditorOpen((open) => !open)}>
              {editorOpen ? 'Hide taxonomy editor' : 'Edit taxonomy'}
            </Button>
          </div>

          {editorOpen ? (
            <TaxonomyEditor
              families={families}
              familyId={familyId}
              classKey={classKey}
              onFamiliesChange={persistFamilies}
              onSelect={select}
              onReset={resetToSeed}
              onClassKeyChange={(from, to) => {
                const current = valuesRef.current
                if (from === to || !(from in current)) return
                const next = { ...current }
                next[to] = current[from] ?? {}
                delete next[from]
                persistValues(next)
              }}
            />
          ) : null}
        </main>
      </div>
    </div>
  )
}
