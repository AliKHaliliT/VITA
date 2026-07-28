# Baseline

The rulebook for which files live at the repository root, which are never tracked, and how
each may change. Unlike [CONVENTIONS.md](CONVENTIONS.md) this is a living document:
it evolves with the tooling, and a change that alters shared formatting is recorded as a
decision.

## Always present

- **`README.md`**: the human-facing overview. Evolves freely as the project does.
- **`AGENTS.md`**: the contributor entry point and the single documentation index.
- **`STATE.md`**: the live status board.
- **`package.json` and `package-lock.json`**: the dependency manifest and its lockfile. The
  lockfile is committed and never hand-edited; it changes only through npm.
- **`.gitignore`**: mirrors the actual stack (Node, Vite, the test runner). A rule is
  removed only when the tool it covers leaves the project.
- **`.gitattributes` and `.editorconfig`**: near-frozen. A change here silently rewrites
  every contributor's checkout, so change them only deliberately and record why.
- **`index.html`, `vite.config.ts`, `tsconfig*.json`, the ESLint config**: the build and
  type surface. Present because the app does not build without them.

## Conditional

- **`LICENCE`**: present because this is a public template (MIT); house spelling is `LICENCE`.
- **`CHANGELOG.md`**: present because people fork the template and want to see what changed.
- **`docs/BASELINE.md`, `docs/CONVENTIONS.md`, `docs/decisions/`**: the documentation system.
- **`.github/workflows/deploy.yml`**: present because the site deploys through GitHub
  Actions to Pages.

## Never tracked

- Dependency and build output: `node_modules/`, `dist/`, coverage, caches.
- Editor and IDE directories: `.vscode/`, `.idea/`.
- Secrets and local environment: any `.env` file with real values.
- Operating-system junk: `.DS_Store`, `Thumbs.db`.
- Browser-automation scratch: `.playwright-mcp/` (also watcher-ignored in `vite.config.ts`,
  because downloads there once crashed hot reload).
- The owner's real content store: `my-content/`, a root folder mirroring `src/content/`.
  The tracked seed under `src/content/` is the self-documenting demo record; deploying a
  real record means swapping the store's files over the seed and rebuilding.

## Temporary development files

Short-lived scripts and scratch files created mid-task are purged when their purpose ends.
If it is unclear whether deleting one is safe, ask the owner rather than silently removing or
keeping it.

## Line endings

`* text=auto` normalizes text on commit while each working copy keeps its platform default.
Scripts are line-ending sensitive, so `.gitattributes` pins `*.sh` to LF and
`*.{bat,cmd,ps1}` to CRLF. Binary assets (fonts, images, icons) are marked binary so git
never diffs or normalizes them.
