# VITA

A personal operating system: portfolio, digital garden, and life-management site
(project name VITA; each deployment brands itself via `src/content/settings/site.json`).
React and Vite, deployed statically to GitHub Pages. Content is Markdown files bundled
at build time: no server, no database.

This file is the single entry point for any contributor, human or agent. Read
[STATE.md](STATE.md) first to learn what is in flight, then this file for the rules, then
the indexed document that covers whatever you are about to touch.

## Commands

| Command | Purpose |
| ------- | ------- |
| `npm install` | Install dependencies |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Type-check then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Vitest characterization suites |
| `npm run lint` | ESLint |
| `npx tsc -b` | Type-check all projects (the root tsconfig is solution-style; a plain `tsc --noEmit` checks nothing) |
| `npm run icon -- <size>` | Render the pixel-mark to PNG (`--theme dark`, `--bg "#hex"`, `--out dir`) |

Run `npm test` after touching the record's `seed`, `store`, or `schema`, or the
portfolio `snapshot`: those suites pin parsing, sorting, localStorage fallback, the
record contract, and the export contract.

## Hard rules

These are non-negotiable. Depth lives in the indexed documents; this is the checklist.

- **Prose carries no em dashes.** Not in docs, comments, or UI copy. Use a semicolon to
  join two clauses or parentheses for an aside. This applies to every character you write,
  source and Markdown alike.
- **All prose must read as if a person wrote it.** Never write the clause-colon splice, a
  sentence shaped as claim, colon, elaboration; in prose a colon may only introduce a
  list, a quote, or a label. The softer language-model tells (balanced semicolon
  antitheses, triadic lists, not-X-but-Y reversals) are fine one at a time and forbidden
  stacked, so allow at most one flourish per paragraph and keep the rest plain declarative
  sentences. Applies to docs, comments, UI copy, and commit messages alike.
- **Every tracked byte is public prose.** Confidential facts, private repository names,
  deployment details, and the description of what was withheld and why never enter a
  tracked file or a commit message, even in a private repository, because visibility can
  flip and history is permanent. Such context goes to the untracked `LOCAL.md` at the root
  (see [docs/BASELINE.md](docs/BASELINE.md)); read it when it exists, create it when first
  needed, and when unsure whether a fact is sensitive, ask the owner instead of recording
  it.
- **The layer rule is absolute.** Imports point downward through
  `app -> pages -> features -> entities -> shared`, never up or sideways. A slice is
  entered only through its `index.ts` (suites excepted), same-layer slices never import
  each other, and a concern spanning two slices moves up a layer instead of reaching
  sideways. A part used by one page stays in that page; a part a second page needs moves
  down a layer. See [decision 0007](docs/decisions/0007-build-the-site-as-one-way-sliced-layers.md).
- **Content is checked at the door.** Everything entering the record passes through
  `entities/record/schema.ts`; never widen a type with a cast to make a value fit. Bundled
  markdown throws on a bad file, and a bad localStorage override falls back to the seed
  with the key named. See [decision 0009](docs/decisions/0009-guard-the-record-with-hand-written-validators.md).
- **The environment is read only through `shared/config`.** No other module touches
  `import.meta.env`.
- **Motion runs behind `LazyMotion` strict** (`domAnimation` features): always import and
  use `m.` from framer-motion, never `motion.` (a `motion.` component throws at runtime).
  The host loads no layout or drag features. See [docs/THEMING.md](docs/THEMING.md).
- **Colors come only from the token utilities** defined in `src/app/styles/tokens.css`
  (`bg-surface`, `text-ink`, `border-line`, `text-signal`, and so on). Never hardcode a
  color, never reach for a raw palette class, and never spell a token the long way as
  `bg-[var(--surface)]`; a composite value such as a `color-mix()` is the only place the
  variable itself appears. The design language is "the dossier": data is square, actions
  are round, one working accent. See [docs/THEMING.md](docs/THEMING.md).
- **No personal strings in source code.** Owner data lives only under `src/content/`
  (`profile.md`, `site.json`, `palette.json`, markdown). Site identity and palette both
  follow the file-seed model in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
- **Content types map one-to-one** to a folder, a TypeScript interface, and a glob entry.
  Adding one is a fixed checklist: see [docs/CONTENT-MODEL.md](docs/CONTENT-MODEL.md).
- **Never use `type` as a frontmatter key** (it collides with the internal `ContentType`
  field). Use the specific name: `employmentType`, `awardType`, `updateType`, `pubType`,
  `speakingType`, `certType`, `memberType`. The `posts` type is the exception; its
  frontmatter `type` is remapped to `postType` in the loader.
- **Ecosystem boundary.** The admin panel and the resume builder are separate repos in the
  VITA ecosystem; this repo is the public site only. They carry their own copies of shared
  helpers and the portfolio contract (`src/features/portfolio-export/contract.ts` is this
  side's copy). The bridge is a file: the site exports `portfolio.json`, the builder
  imports it.
- **Content edits go to `localStorage`** (`os_content_<type>`, `os_settings`); Markdown
  files are seed data only.
- **Markdown formatting.** Every fenced block gets a language identifier; lists and fences
  are surrounded by blank lines (MD031, MD032, MD040).

## Documentation index

A document that is not listed here does not exist: no reader can be expected to find it.
Register a new document in this table in the same change that creates it.

| Document | Species | Read it when |
| -------- | ------- | ------------ |
| [STATE.md](STATE.md) | living | Always first: what is Now, Next, Deferred, or Blocked |
| [README.md](README.md) | living | Human-facing overview, feature list, getting started |
| [CHANGELOG.md](CHANGELOG.md) | records | What shipped, per release, for people who fork the template |
| [docs/BASELINE.md](docs/BASELINE.md) | living | Which root files must exist, which are never tracked, and why |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | living | Before any structural change: data flow, routing, boundaries |
| [docs/THEMING.md](docs/THEMING.md) | living | Before touching design tokens, palettes, type, or motion |
| [docs/CONTENT-MODEL.md](docs/CONTENT-MODEL.md) | living | Field schemas for every type, and the add-a-type checklist |
| [docs/ROADMAP.md](docs/ROADMAP.md) | living | The feature landscape and standing technical debt |
| [docs/SETUP.md](docs/SETUP.md) | living | First-time environment setup and GitHub Pages deploy |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md) | living, frozen | Before writing any document: the rulebook, never edited directly |
| [docs/decisions/](docs/decisions/) | records | Why a durable choice was made; cite by number, never edit |

There are no assistant-specific instruction files: every agent reads this one.
