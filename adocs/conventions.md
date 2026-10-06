# Conventions

## Stack

Bun is the package manager and the test runner (`bun test`, `bun run dev`). The page is Vite, React, TypeScript, Tailwind CSS v4, and shadcn/ui. Add UI from `bunx shadcn@latest add`. Do not copy components from DinoTree.

## Seed and overlay

`src/seed/taxonomy.ts` is the shipped taxonomy. Browser experiments are a full snapshot in `localStorage` key `atlas.taxonomy.v1`. Reset to seed clears that key.

Changing a class means updating the matching file in `docs/` and the seed in the same change.

## Homepage and 3D

`#/` is the type picker. `#/<family>/<class>` is the family page. `?edit=1` shows derived values and the taxonomy editor; omit it on the public site. Hash writes must keep the query string. Three.js (R3F) draws packages in millimetres, y-up, sitting on y = 0. Chip classes use `src/seed/packages.ts`. Cans, tantalum cases, power inductors, SOD/SMA/SOT/TO, LEDs, SOIC, and headers have their own meshes. They are not drawn as EIA chip rectangles.

## New Classes

A new **Class** starts with zero Fields. The taxonomy editor is how Fields appear.

**IC** Fields are `device`, `package`, `pins`. **JJ** Fields are `type`, `pins`, `pitch`, `orientation`, `mount`.

## Identity

`src/lib/identity.ts` is the only formatter. Specimens live in `src/lib/identity.test.ts`. Empty is `X`. Inductor tolerance uses `kind: 'tolerance-plusminus'`.
