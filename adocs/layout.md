# Layout

Atlas is one Vite app at the repository root.

```
.
├── AGENTS.md
├── GLOSSARY.md
├── README.md
├── ROADMAP.md
├── adocs/
├── docs/
│   └── agents/         # issue tracker, triage labels, domain docs for skills
├── src/
│   ├── components/     # workshop UI; ui/ is shadcn
│   ├── lib/            # identity, hash, taxonomy helpers
│   ├── seed/           # families, classes, chip sizes
│   └── storage/        # localStorage snapshot
├── components.json
├── package.json
└── vite.config.ts
```

`adocs/` is how to work. `docs/` is the specification of each electrical family. `src/seed/` is what the app runs.
