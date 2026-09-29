import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CHIP_EIA } from '@/seed/packages'
import type { Family, FieldDef, FieldKind, PartClass } from '@/seed/types'
import { slugify, uniqueId } from '@/lib/taxonomy'

type TaxonomyEditorProps = {
  families: Family[]
  familyId: string
  classKey: string
  onFamiliesChange: (families: Family[]) => void
  onSelect: (familyId: string, classKey: string) => void
  onReset: () => void
  onClassKeyChange: (from: string, to: string) => void
}

export function TaxonomyEditor({
  families,
  familyId,
  classKey,
  onFamiliesChange,
  onSelect,
  onReset,
  onClassKeyChange,
}: TaxonomyEditorProps) {
  const family = families.find((item) => item.id === familyId)
  const part = family?.classes.find((item) => item.key === classKey)

  return (
    <section className="flex flex-col gap-6 rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium">Taxonomy editor</h2>
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          Reset to seed
        </Button>
      </div>
      <AddFamily
        families={families}
        onAdd={(next) => {
          onFamiliesChange([...families, next])
          onSelect(next.id, next.classes[0]?.key ?? '')
        }}
      />
      {family ? (
        <AddClass
          family={family}
          onAdd={(nextClass) => {
            const nextFamilies = families.map((item) =>
              item.id === family.id ? { ...item, classes: [...item.classes, nextClass] } : item,
            )
            onFamiliesChange(nextFamilies)
            onSelect(family.id, nextClass.key)
          }}
        />
      ) : null}
      {family && part ? (
        <ClassFields
          key={part.key}
          family={family}
          part={part}
          onChangeFamily={(nextFamily) => {
            onFamiliesChange(families.map((item) => (item.id === nextFamily.id ? nextFamily : item)))
          }}
          onRenameKey={(nextKey) => {
            const previous = part.key
            const nextFamilies = families.map((item) => {
              if (item.id !== family.id) return item
              return {
                ...item,
                classes: item.classes.map((cls) => (cls.key === previous ? { ...cls, key: nextKey } : cls)),
              }
            })
            onClassKeyChange(previous, nextKey)
            onFamiliesChange(nextFamilies)
            onSelect(family.id, nextKey)
          }}
        />
      ) : null}
    </section>
  )
}

function AddFamily({
  families,
  onAdd,
}: {
  families: Family[]
  onAdd: (family: Family) => void
}) {
  const [name, setName] = useState('')
  return (
    <form
      className="flex flex-col gap-2 sm:flex-row sm:items-end"
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = name.trim()
        if (!trimmed) return
        const taken = new Set(families.map((item) => item.id))
        const id = uniqueId(slugify(trimmed), taken)
        onAdd({ id, name: trimmed, specified: false, classes: [] })
        setName('')
      }}
    >
      <div className="min-w-0 flex-1">
        <Label htmlFor="new-family">Add family</Label>
        <Input id="new-family" value={name} onChange={(event) => setName(event.target.value)} placeholder="Sensors" />
      </div>
      <Button type="submit">Add family</Button>
    </form>
  )
}

function AddClass({ family, onAdd }: { family: Family; onAdd: (part: PartClass) => void }) {
  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  return (
    <form
      className="grid gap-2 sm:grid-cols-[8rem_1fr_auto] sm:items-end"
      onSubmit={(event) => {
        event.preventDefault()
        const nextKey = key.trim().toUpperCase()
        const nextName = name.trim()
        if (!nextKey || !nextName) return
        if (family.classes.some((item) => item.key === nextKey)) return
        onAdd({ key: nextKey, name: nextName, fields: [] })
        setKey('')
        setName('')
      }}
    >
      <div>
        <Label htmlFor="new-class-key">Add class key</Label>
        <Input id="new-class-key" value={key} onChange={(event) => setKey(event.target.value)} placeholder="XX" />
      </div>
      <div>
        <Label htmlFor="new-class-name">Class name</Label>
        <Input
          id="new-class-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="A new class"
        />
      </div>
      <Button type="submit">Add class</Button>
    </form>
  )
}

function ClassFields({
  family,
  part,
  onChangeFamily,
  onRenameKey,
}: {
  family: Family
  part: PartClass
  onChangeFamily: (family: Family) => void
  onRenameKey: (key: string) => void
}) {
  const [keyDraft, setKeyDraft] = useState(part.key)
  const [nameDraft, setNameDraft] = useState(part.name)
  const [fieldId, setFieldId] = useState('')
  const [fieldLabel, setFieldLabel] = useState('')
  const [fieldExamples, setFieldExamples] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="class-key">Class key</Label>
          <Input
            id="class-key"
            value={keyDraft}
            onChange={(event) => setKeyDraft(event.target.value)}
            onBlur={() => {
              const next = keyDraft.trim().toUpperCase()
              if (!next || next === part.key) {
                setKeyDraft(part.key)
                return
              }
              if (family.classes.some((item) => item.key === next)) {
                setKeyDraft(part.key)
                return
              }
              onRenameKey(next)
            }}
          />
        </div>
        <div>
          <Label htmlFor="class-name">Class name</Label>
          <Input
            id="class-name"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            onBlur={() => {
              const next = nameDraft.trim()
              if (!next || next === part.name) {
                setNameDraft(part.name)
                return
              }
              onChangeFamily({
                ...family,
                classes: family.classes.map((item) => (item.key === part.key ? { ...item, name: next } : item)),
              })
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Fields in ID order</h3>
        {part.fields.length === 0 ? (
          <p className="text-sm text-muted-foreground">No fields. The ID is the Key alone until you add one.</p>
        ) : (
          part.fields.map((field, index) => (
            <FieldRow
              key={field.id}
              field={field}
              index={index}
              total={part.fields.length}
              onMove={(direction) => {
                const next = [...part.fields]
                const swap = index + direction
                if (swap < 0 || swap >= next.length) return
                ;[next[index], next[swap]] = [next[swap]!, next[index]!]
                replaceFields(family, part.key, next, onChangeFamily)
              }}
              onRemove={() => {
                replaceFields(
                  family,
                  part.key,
                  part.fields.filter((item) => item.id !== field.id),
                  onChangeFamily,
                )
              }}
              onChange={(nextField) => {
                replaceFields(
                  family,
                  part.key,
                  part.fields.map((item) => (item.id === field.id ? nextField : item)),
                  onChangeFamily,
                )
              }}
            />
          ))
        )}
      </div>

      <form
        className="grid gap-2 sm:grid-cols-[8rem_1fr_1fr_auto] sm:items-end"
        onSubmit={(event) => {
          event.preventDefault()
          const id = slugify(fieldId || fieldLabel).replace(/-/g, '_')
          const label = fieldLabel.trim()
          if (!id || !label) return
          if (part.fields.some((item) => item.id === id)) return
          const examples = fieldExamples
            .split(/[,\n]/)
            .map((item) => item.trim())
            .filter(Boolean)
          const kind = inferKind(id, examples)
          replaceFields(family, part.key, [...part.fields, { id, label, examples, ...(kind ? { kind } : {}) }], onChangeFamily)
          setFieldId('')
          setFieldLabel('')
          setFieldExamples('')
        }}
      >
        <div>
          <Label htmlFor="new-field-id">Field id</Label>
          <Input id="new-field-id" value={fieldId} onChange={(event) => setFieldId(event.target.value)} placeholder="voltage" />
        </div>
        <div>
          <Label htmlFor="new-field-label">Field label</Label>
          <Input
            id="new-field-label"
            value={fieldLabel}
            onChange={(event) => setFieldLabel(event.target.value)}
            placeholder="Voltage"
          />
        </div>
        <div>
          <Label htmlFor="new-field-examples">Example tokens</Label>
          <Input
            id="new-field-examples"
            value={fieldExamples}
            onChange={(event) => setFieldExamples(event.target.value)}
            placeholder="10V, 16V"
          />
        </div>
        <Button type="submit">Add field</Button>
      </form>
    </div>
  )
}

function FieldRow({
  field,
  index,
  total,
  onMove,
  onRemove,
  onChange,
}: {
  field: FieldDef
  index: number
  total: number
  onMove: (direction: -1 | 1) => void
  onRemove: () => void
  onChange: (field: FieldDef) => void
}) {
  return (
    <div className="grid gap-2 rounded-lg bg-muted/60 p-3 sm:grid-cols-[auto_8rem_1fr_1fr_auto] sm:items-start">
      <div className="flex gap-1">
        <Button type="button" size="xs" variant="outline" disabled={index === 0} onClick={() => onMove(-1)}>
          Up
        </Button>
        <Button type="button" size="xs" variant="outline" disabled={index === total - 1} onClick={() => onMove(1)}>
          Down
        </Button>
      </div>
      <div>
        <Label>Id</Label>
        <Input value={field.id} readOnly />
      </div>
      <div>
        <Label>Label</Label>
        <Input value={field.label} onChange={(event) => onChange({ ...field, label: event.target.value })} />
      </div>
      <div>
        <Label>Examples</Label>
        <Textarea
          value={field.examples.join(', ')}
          onChange={(event) =>
            onChange({
              ...field,
              examples: event.target.value
                .split(/[,\n]/)
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
        />
      </div>
      <Button type="button" variant="destructive" size="sm" onClick={onRemove}>
        Remove
      </Button>
    </div>
  )
}

function replaceFields(
  family: Family,
  key: string,
  fields: FieldDef[],
  onChangeFamily: (family: Family) => void,
) {
  onChangeFamily({
    ...family,
    classes: family.classes.map((item) => (item.key === key ? { ...item, fields } : item)),
  })
}

function inferKind(id: string, examples: string[]): FieldKind | undefined {
  if (id === 'tolerance') return 'tolerance-plusminus'
  if (id === 'package' && examples.some((example) => CHIP_EIA.has(example))) return 'chip-package'
  return undefined
}
