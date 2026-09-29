# Conventions

## Stack

Bun is the package manager and the test runner (`bun test`, `bun run dev`). The page is Vite, React, TypeScript, Tailwind CSS v4, and shadcn/ui. Add UI from `bunx shadcn@latest add`. Do not copy components from DinoTree.

## Seed and overlay

`src/seed/taxonomy.ts` is the shipped taxonomy. Browser experiments are a full snapshot in `localStorage` key `atlas.taxonomy.v1`. Reset to seed clears that key.

Changing a class means updating the matching file in `docs/` and the seed in the same change.

## Homepage and 3D

`#/` is the type picker. `#/<family>/<class>` is the family page. Three.js (R3F) draws packages in millimetres, y-up, sitting on y = 0. Chip classes use `src/seed/packages.ts`. Cans, tantalum cases, power inductors, SOD/SMA/SOT/TO, LEDs, SOIC, and headers have their own meshes. They are not drawn as EIA chip rectangles.

## Unspecified families

ICs (`IC`) and connectors (`JJ`) ship with zero fields. A new class starts with zero fields. The taxonomy editor is how fields appear.

## Identity

`src/lib/identity.ts` is the only formatter. Specimens live in `src/lib/identity.test.ts`. Empty is `X`. Inductor tolerance uses `kind: 'tolerance-plusminus'`.
