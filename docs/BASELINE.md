# Repository Baseline

The living rulebook for the repository's always-present files: which files must exist,
which must never be tracked, and how each may be modified. Unlike
[CONVENTIONS.md](CONVENTIONS.md) this document is not frozen: the baseline evolves with the
tooling, and a change that reshapes it is recorded as a decision record (the documentation
system's adoption is [0001](decisions/0001-adopt-the-documentation-system.md)).

## Always present

| File | Role | Modification rule |
| --- | --- | --- |
| `README.md` | Human-facing overview. | Living document; its badge, attribution, and License rules are fixed below. |
| `.gitignore` | What git must never track. | Every rule must correspond to the actual stack: add into the matching labeled section, and remove a rule when the tool or framework it serves leaves the project. Never remove a rule that still matches something real without an owner decision. |
| `.gitattributes` | Line-ending and binary policy, so repository bytes never depend on a contributor's local git configuration. | Near-frozen; changes are owner decisions, because they silently rewrite every contributor's checkout. |
| `.editorconfig` | Vendor-neutral editor baseline (charset, indentation, final newline). | Near-frozen; same reasoning as `.gitattributes`. |
| `package.json` + `package-lock.json` | The dependency manifest and its lockfile. | The lockfile is committed and never hand-edited; it changes only through npm. |
| `index.html`, `vite.config.ts`, `tsconfig*.json`, the ESLint config | The build and type surface. | Present because the app does not build without them. |

The documentation spine (`AGENTS.md`, `STATE.md`, `docs/`) is also always present; it is
governed by [CONVENTIONS.md](CONVENTIONS.md), not by this file.

## The README rules

The README is this project's own overview and evolves with it, under three fixed contracts
inherited from the house style:

1. **Badges** are required while the repository is public, written in plain Markdown image
   syntax on a single line (GitHub strips inline styles, so HTML badge blocks are dead
   markup), and every badge must state something true about this repository.
2. **The expansion under the pitch carries the attribution**: one sentence linking the
   house style ([My-Styles](https://github.com/AliKHaliliT/My-Styles)), because the
   inherited conventions and decision records are unintelligible without their provenance.
3. **The License section body is exactly one line**:
   `This work is under an [MIT](https://choosealicense.com/licenses/mit/) License.`

Link and image referencing follows the repository boundary. Internal document links are
always relative, because they never leave the repository that resolves them, and relative
paths survive forks and renames. Images are referenced relatively too, until the README
itself leaves the repository: if it is ever republished somewhere with no repository to
resolve a relative path against (a package index, a mirror), every image switches to the
absolute raw form `https://github.com/<owner>/<repo>/blob/<branch>/util_resources/readme/<file>?raw=true`,
pinned to `main`. This template is not published to any index today, so everything stays
relative.

## Present when the trigger exists

Triggers are bidirectional: the file appears when its trigger appears and is removed when
its trigger disappears. A conditional file whose trigger is gone is clutter, not caution.

| File | Trigger |
| --- | --- |
| `LICENSE` | The repository is public. The license text (American spelling: LICENSE), owner-only and effectively immutable; agents never touch it. |
| `CHANGELOG.md` | People fork the template and upgrade through releases (see CONVENTIONS.md). |
| `.github/workflows/deploy.yml` | The site deploys through GitHub Actions to Pages. |
| `.env.example` | Anything reads a `.env`; nothing does today, so the file does not exist. |
| `util_resources/` | The repository carries tracked assets. `readme/` holds every image the repository embeds (today the README's logo plaque), and nothing references an image from anywhere else; further purpose-named subfolders may be added as new asset kinds arise, each existing only while something uses it. App assets served to visitors (`public/`, `src/assets/`) are build inputs, not repository assets, and stay where the bundler expects them. |

## Never tracked

- Editor and IDE directories (`.vscode/`, `.idea/`): a setting that matters to everyone is
  expressed vendor-neutrally in `.editorconfig`; a setting that does not is personal.
- Secrets and local environments: any `.env` with real values.
- Anything regenerable: `node_modules/`, `dist/`, coverage, caches, and the icon exports
  (`pixel-mark-*.png`, rebuilt anytime with `npm run icon`).
- Operating-system junk: `.DS_Store`, `Thumbs.db`, `Desktop.ini`.
- Browser-automation scratch: `.playwright-mcp/` (also watcher-ignored in `vite.config.ts`,
  because downloads there once crashed hot reload).

## Temporary development files

Files created only to support a task in progress (scratch scripts, debug outputs, one-off
harnesses, stray screenshots) are not repository content. Prefer creating them outside the
repository tree in the first place. When one does live inside the tree, it is purged in the
same change that ends its usefulness; it is safe to purge once its task is complete and
nothing tracked references it. If it is unclear whether a file is still needed, surface it
to the owner rather than deleting it or silently leaving it behind.

## Line endings

`.gitattributes` is the single authority: text files are stored normalized (`* text=auto`),
shell scripts always check out LF, and Windows script formats (`.bat`, `.cmd`, `.ps1`)
always check out CRLF. Binary assets (fonts, images, icons) are marked binary so git never
diffs or normalizes them. Local `core.autocrlf` settings must never be load-bearing.
