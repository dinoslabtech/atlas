# Conventions

## Stack

Bun is the package manager and the test runner (`bun test`, `bun run dev`). The page is Vite, React, TypeScript, Tailwind CSS v4, and shadcn/ui. Add UI from `bunx shadcn@latest add`. Do not copy components from DinoTree.

## Seed and overlay

`src/seed/taxonomy.ts` is the shipped taxonomy. Browser experiments are a full snapshot in `localStorage` key `atlas.taxonomy.v1`. Reset to seed clears that key.

Changing a class means updating the matching file in `docs/` and the seed in the same change.

## Chip drawings

The size drawing is the ten EIA chip bodies in `src/seed/packages.ts`. Show it when the selected class has a field with `kind: 'chip-package'`. Electrolytic cans, tantalum cases, power-inductor footprints, resistor arrays, SOD/SMA/SOT/TO outlines are package tokens in the picker, not rectangles on that scale.

## Unspecified families

ICs (`IC`) and connectors (`JJ`) ship with zero fields. A new class starts with zero fields. The taxonomy editor is how fields appear.

## Identity

`src/lib/identity.ts` is the only formatter. Specimens live in `src/lib/identity.test.ts`. Empty is `X`. Inductor tolerance uses `kind: 'tolerance-plusminus'`.
