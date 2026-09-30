# Atlas

Atlas is the workshop where a component type gets a Key, an ID, and a Name. DinoTree is inventory. This repository is only Atlas.

Read these before changing behavior:

- `adocs/product.md` — Key, ID, Name, and the line with DinoTree
- `adocs/layout.md` — repository tree
- `adocs/conventions.md` — Bun, shadcn, seed vs `localStorage`, chip drawings, unspecified families
- `adocs/git.md` — `main`, `dev`, local `feature/*` branches, worktrees, commit identity
- `docs/nomenclature.md` — notation
- `GLOSSARY.md` — the terms

UI language is English. Codes stay as written (`RR`, `4R7`, `10k`, `0402`). Resistance uses `R` as the decimal separator.

When a class's fields change, update `docs/` and `src/seed/` in the same change. Seed disagreements with kicad-libs stay visible in `docs/`; do not delete a class to force a match.

ICs and connectors stay empty-fielded until a task specifies them. DinoTree and other sibling projects are left untouched.

`bun test` covers identity specimens. `bun run dev` is the site.

## Agent skills

### Issue tracker

GitHub Issues on `dinoslabtech/atlas` (`gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical roles, same strings: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `GLOSSARY.md`, ADRs under `docs/adr/` when they exist. See `docs/agents/domain.md`.

