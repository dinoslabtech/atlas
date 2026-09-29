import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MISSING } from '@/lib/identity'
import type { FieldDef } from '@/seed/types'

type FieldPickersProps = {
  fields: FieldDef[]
  values: Record<string, string>
  onChange: (fieldId: string, value: string) => void
}

export function FieldPickers({ fields, values, onChange }: FieldPickersProps) {
  if (fields.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        This class has no fields yet. Use the taxonomy editor to add them.
      </p>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => {
        const current = values[field.id] ?? ''
        const options = uniqueOptions([MISSING, ...field.examples, current])
        const selectValue = current.trim() === '' ? MISSING : current
        return (
          <div key={field.id} className="flex min-w-0 flex-col gap-1.5">
            <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
            <Select value={selectValue} onValueChange={(value) => onChange(field.id, value === MISSING ? '' : value)}>
              <SelectTrigger id={`field-${field.id}`} className="w-full">
                <SelectValue placeholder={MISSING} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      })}
    </div>
  )
}

function uniqueOptions(values: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const value of values) {
    const token = value.trim() === '' ? MISSING : value
    if (seen.has(token)) continue
    seen.add(token)
    result.push(token)
  }
  return result
}
