# Atlas

Atlas is Dino's Lab's workshop for component taxonomy. A type of part gets three identities here: a **Key**, an **ID**, and a **Name**.

DinoTree is the inventory of real parts. It is a separate project. Atlas does not track stock, purchasing, BOMs, manufacturer numbers, or accounts, and it does not export KiCad.

## Run it

Bun is required.

```bash
bun install
bun run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The first screen shows Key, ID, and Name for `RR 10k 1% 0402`.

```bash
bun test
bun run build
```

Taxonomy experiments live in the browser (`localStorage`). Reset to seed from the taxonomy editor.

## What this version covers

Passives, diodes, and transistors are specified, including every subtype (`RR`…`FB`, `DD`/`DS`/`DZ`/`DL`, `QN`/`QP`/`MN`/`MP`). ICs and connectors are listed and still being specified.

The notation and the disagreements with the earlier kicad-libs draft are in [docs/](docs/README.md). How to work in this repository is in [AGENTS.md](AGENTS.md). What comes next is in [ROADMAP.md](ROADMAP.md).
