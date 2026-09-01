# VITA

<div align="center">

![License](https://img.shields.io/github/license/AliKHaliliT/VITA) ![Last Commit](https://img.shields.io/github/last-commit/AliKHaliliT/VITA) ![Open Issues](https://img.shields.io/github/issues/AliKHaliliT/VITA)

![VITA](util_resources/readme/logo.svg)

**[Live demo](https://alikhalilit.github.io/VITA/)**

</div>

VITA is a personal operating system that gathers your portfolio, digital garden, and life records into one static site. *Vita* is Latin for "life", the same root as *curriculum vitae*, and the site is best thought of as a CV on steroids that covers career, writing, reading, travel, and everything in between, published from Markdown.

It is built with React and Vite and deploys to GitHub Pages with no server and no database. The repository's documentation and engineering conventions follow [My-Styles](https://github.com/AliKHaliliT/My-Styles).

---

## The Philosophy: Why Does This Exist?

A personal record decays in a predictable way. It starts on a platform that owns the data, spreads into a CV that immediately disagrees with the site, and ends as three stale copies of the same facts in places nobody can diff. The rot is not laziness, it is structural. When the record has no single home and no format you can read without the tool that wrote it, drift is the only possible outcome.

VITA exists to make the record a set of files you own. Every entry is Markdown with frontmatter, the identity and palette are small seeds beside it, and the published site is a build artifact rather than a source of truth. That inversion is the whole idea. You can read the record in a text editor, diff it in a pull request, back it up with `git clone`, and hand the same files to a CV builder without an export step, because the files were the record all along.

---

## The Domain: Why a Personal Record?

The domain is chosen to be honest rather than convenient. A personal record is broad on purpose, spanning career, writing, reading, travel, and interests, and that breadth is exactly what makes it a real architectural problem instead of a demo.

Sixteen collections share one base shape and differ by a few fields each, so the code has to be generic without becoming shapeless. The same record must render as a public site, be edited by a separate application, and condense into a resume, which forces the boundaries between those three to be explicit. Content arrives from files at build time and from a companion application's writes at runtime, so there are two doors into the same data and neither can be trusted by default. A domain with one entity and one source would have let every one of those decisions stay implicit.

---

## The ecosystem

VITA is the public face of a three-repo family. The two companion apps are kept in their own repositories so the published site ships none of the editing machinery.

| App | Role | Demo |
| --- | --- | --- |
| **VITA** (this repo) | Renders the record as the public site | [alikhalilit.github.io/VITA](https://alikhalilit.github.io/VITA/) |
| [**TABULARIUM**](https://github.com/AliKHaliliT/TABULARIUM) | Edits every ledger and publishes the seed files | [alikhalilit.github.io/TABULARIUM](https://alikhalilit.github.io/TABULARIUM/) |
| [**EPITOMA**](https://github.com/AliKHaliliT/EPITOMA) | Condenses the record into resumes and CVs | [alikhalilit.github.io/EPITOMA](https://alikhalilit.github.io/EPITOMA/) |

The three apps talk through files rather than imports. This repo carries its half of the snapshot contract in `src/features/portfolio-export/contract.ts`, versioned under the `vita-portfolio` format name.

---

## How the system works

The record itself is nothing more than files. Every entry on the site is a Markdown file with YAML frontmatter, and the site identity, palette, and page copy are small JSON and Markdown seeds beside them. The repository is the database, the git history is the audit log, and a `git clone` is a complete backup.

VITA turns those files into a static site at build time. Content is bundled during the build rather than fetched at runtime, so the published site is plain HTML, CSS, and JavaScript that any static host can serve. There is no server to run, no database to maintain, and nothing to sign up for beyond the GitHub repository itself.

The CMS is a separate and entirely optional layer. TABULARIUM runs in the browser, stages every edit in localStorage, and sends nothing anywhere while you work. Publishing means producing the same files you could have written by hand. The panel can hand them over as single downloads, package the whole record as a zip in this repo's layout, or commit them to this repository directly, using a fine-grained token that stays in your browser. Because the panel writes ordinary files, hand edits and panel edits coexist, and if the panel vanished tomorrow the record would still be perfectly readable Markdown.

The loop closes on its own. When the panel pushes, or when you commit by hand, the Pages workflow rebuilds and the site is live a minute or two later. EPITOMA sits at the read-only end of the chain, pulls the same record straight from the public repository, and turns it into documents without a token, a server, or an export step in between.

---

## Core Architectural Pillars

1. **The repository is the database.** Content is Markdown with frontmatter under `src/content/`, bundled at build time. There is no server and no runtime fetch, so the published site is static files and the git history is the audit log.
2. **Imports point downward, and a linter says so.** The source tree is five sliced layers, `app -> pages -> features -> entities -> shared`, entered only through each slice's own door. The rule is checked by ESLint rather than by review, so an upward import fails the build instead of surviving a diff.
3. **Content is checked at the door.** Both ways in pass through the record's contract. A committed file whose frontmatter cannot produce a valid item fails with its path named, and a localStorage override written by the companion panel that breaks the contract falls back to the committed seed with the key to clear named.
4. **Colors are tokens, never values.** Raw variables carry the palette and are re-pointed per theme; components speak only in the utilities mapped from them. No component names a hex or a theme.
5. **The ecosystem talks in files.** Nothing is imported across a repository boundary. The panel produces the seed files this site reads, this site exports the snapshot the builder reads, and a format and version field keep the halves honest.

---

## Project Structure

```text
vita/
├── AGENTS.md              # Agent entry point and the single documentation index
├── docs/                  # Technical documentation, indexed in AGENTS.md
└── src/
    ├── app/               # Composition root: bootstrap, providers, router, chrome, tokens
    ├── pages/             # One slice per route
    ├── features/          # search, portfolio-export
    ├── entities/          # record (the content model and both its doors), site (identity, palette)
    ├── shared/            # config, lib, ui, testing
    └── content/           # The record itself, as Markdown and JSON
```

The annotated map of the whole system, including the layer rule and the boundaries, lives in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Make it your portfolio

1. **Use this template.** Click "Use this template" on GitHub and create your repository. Any name works, because the deploy adapts to it.
2. **Turn on Pages.** In your new repo, open Settings, then Pages, and set the source to **GitHub Actions**. The included [deploy workflow](.github/workflows/deploy.yml) builds and publishes on every push to `main`.
3. **Push.** Your site goes live at `https://<username>.github.io/<repo>/`. The workflow
   derives the URL base from the repository name, so any name works. The one exception is
   a user page (a repo named `<username>.github.io`) or a custom domain, where you edit
   one line in the workflow and set `VITE_BASE_PATH` to `/`.
4. **Make it yours.** Replace the demo record as described below. Who you are lives in `src/content/settings/profile.md`, the site name and metas live in `site.json`, and the colors live in `palette.json`.

The shipped seed is a self-documenting demo set in a small fantasy world. It is the record of Wren Emberquill, an artificer of Cinderfen, and every entry's body states which field, variant, or edge case it demonstrates, so nothing in it can be mistaken for a real person or credential. Browse the running site once before replacing the files.

See [`docs/SETUP.md`](docs/SETUP.md) for full setup, deployment, and troubleshooting.

---

## Keeping your copy current

The template keeps evolving after you copy it, and its commit history records what changed
and why, with commit subjects carrying the impact. How you pull those changes in depends
on how you created your repository.

If you clicked "Use this template", your repository shares no git history with this one,
so GitHub offers no sync button and git does the job instead. Connect the template once as
a second remote, then merge whenever the template's history gives you a reason to.

```powershell
git remote add template https://github.com/AliKHaliliT/VITA.git
git fetch template
git merge template/main --allow-unrelated-histories
```

The `--allow-unrelated-histories` flag is only needed the first time, since that merge
stitches the two histories together; from then on a plain `git fetch template` followed by
`git merge template/main` is enough. Your record lives under `src/content/`, and updates
leave it alone with one honest exception. An update that introduces a new section ships
that section's demo seed, because a capability needs something to show. Those seeds arrive
as files that do not exist on your side, so the merge stays conflict-free; they simply
render as demo entries until you replace them with your own or delete them, exactly like
the original seed. The one conflict you may meet is git's modify/delete complaint when an
update touches a demo file you removed while clearing out the original record, and
confirming the deletion with `git rm` settles it. Beyond that, conflicts are rare and
confined to code you deliberately customized. Push the merge and the site redeploys
itself.

Forking is the alternative for people who want one-click updates. A fork keeps its link to
this repository, so GitHub's "Sync fork" button does the merging for you. That convenience
has a price. A fork of a public repository cannot be made private, it wears a
"forked from" banner, and its history starts with every commit of this template rather
than cleanly with your own record. Both paths deploy identically, so choose by whether
easy updates or a clean private-capable start matters more to you.

---

## Adding content

There are two ways to add content, and both produce the same files.

The manual way is to create a `.md` file in `src/content/<type>/` with the correct frontmatter and commit it. An entry is nothing more than this:

```markdown
---
title: My New Project
role: Designer & Developer
year: "2026"
link: https://github.com/you/my-new-project
tags:
  - React
---

A line or two about what it is and why it exists.
```

Every type's schema is documented in [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md). Content is bundled eagerly, so restart `npm run dev` after adding files locally.

The comfortable way is the admin panel. [TABULARIUM](https://github.com/AliKHaliliT/TABULARIUM) gives every ledger a real editor with rich text, live identity and palette previews, and all twenty content types, and it produces exactly the files this repo publishes. You can download them one by one, download the whole record as a zip laid out in this repo's structure, or connect the panel straight to your repository with a fine-grained token and push edits as commits, resolving any conflicts file by file. The [hosted panel](https://alikhalilit.github.io/TABULARIUM/) works out of the box, and everything you edit stays in your browser until you publish it.

When you want the record as documents instead of a site, [EPITOMA](https://github.com/AliKHaliliT/EPITOMA) turns it into print-ready resumes and CVs. Point it at your public site repository and it pulls the content by itself, with no token needed.

---

## Changing the colors

The site's entire look hangs on one file. Every color VITA renders comes from design
tokens seeded by `src/content/settings/palette.json`, as a matched light and dark pair,
and the build bakes them into the page itself so visitors see your palette before any
JavaScript runs. Nothing in the source hardcodes a color, which means replacing that one
file and pushing recolors everything, from the buttons and hairlines to the ambient
canvas drifting behind the masthead.

You do not have to write the JSON by hand. The [admin panel](https://github.com/AliKHaliliT/TABULARIUM)'s
Appearance tab ships five ready palettes (Rangefinder, the deployed default, plus
Meridian, Blueprint, Observatory, and Ledger), gives every token its own picker annotated
with where that color actually shows up, previews light and dark live as you work, and
keeps a shelf for custom palettes you design and save. "Download palette.json" exports
exactly the seed this repo expects, ready to commit.

One smaller convenience rounds it out. The palette rides inside the portfolio export, so
resumes built in [EPITOMA](https://github.com/AliKHaliliT/EPITOMA) can adopt the same
identity as the site. The full token reference lives in
[`docs/THEMING.md`](docs/THEMING.md).

---

## Key Features

The sections are the visible half; the other half is the system underneath them, and it
is listed here too because most of the engineering lives there.

### Career

- Projects portfolio
- Work experience
- Education & certifications
- Awards, scholarships & honors
- Publications & speaking
- Volunteering, organizations & references
- Skills matrix with spoken languages and setup notes

### Writing

- Long-form blog, with off-site posts (Medium, dev.to) as first-class linked entries
- Digital garden (Seedling / Evergreen / List notes)
- Microblog updates (note / link / milestone)

### Personal

- A library of shelves: books plus films, series, anime, games, and any medium you invent, each with statuses, ratings, and notes
- Travel log from countries down to cities
- Interests ledger with story links into the garden

### The record's machinery

- Twenty content types, each mapping one-to-one to a folder, a TypeScript interface, and a route
- Open type fields that never gate what a record can hold; a degree can be "Journeyman" and a publication a "charter", and the site renders any label you invent
- Story links that cross-reference the record, so an interest, a book, or a city can point at the garden note or blog post that tells its story
- Pinning and per-section ordering: `pin: 1` on any entry leads its section, and one optional seed chooses alphabetical or chronological per section, degrading gracefully when entries lack the sorted field
- Off-site writing as first-class entries; a post whose home is Medium or dev.to lists, searches, and links out like everything else
- Free-form profile links with an icon registry, so any platform joins the hero and footer without a schema change

### The system

- A "dossier" design language built from serif display type, mono data chips, and dashed hairlines
- Dark and light mode with a full-page crossfade
- Command-palette search (Ctrl K / ⌘K) across the whole record, deep-linking straight to entries
- Every ledger row links out to its item's own destination, never just to a section page
- Runtime color palettes, site identity, and page copy, all seeded from files; renaming or rebranding the site is a JSON edit
- An instrument-grade motion system behind a lazy-loaded engine, honoring the visitor's reduced-motion preference throughout
- A generative ambient canvas drifting behind the masthead, palette-aware and paused when offscreen
- Anything without an image gets designed art drawn from the palette instead of a broken-image glyph: schematic plates for a featured project, a titled spine for every library entry
- Self-hosted fonts and zero third-party requests; the published site phones nobody
- Social and SEO metas baked at build from the identity seed, per-page titles, and deep links that survive hard refreshes on GitHub Pages
- Obfuscated email chips instead of scrapeable mailto links
- Empty sections hide themselves, so nothing advertises a page with no content
- CI ships with the template; every push type-checks, lints, tests, and builds before it deploys

---

## Getting Started

You need Node.js 24 or newer (the same floor `package.json` declares and every workflow builds on) and git; nothing else.

```powershell
npm install
npm run dev
```

The site opens on port 3000. TABULARIUM uses 3100 and EPITOMA uses 3200, so all three run
side by side. `npm test` runs the characterization suites that pin content parsing and
the export contract, and `npm run build` type-checks and produces the static `dist/`.

---

## Conventions

Documentation follows **TSDoc**, carrying the family's docstring discipline into TypeScript. Every exported symbol opens with a one-sentence summary. Where a function warrants full documentation, `@param` (one per parameter) and `@returns` are always present, writing `Nothing.` for a void return, and `@throws` lists every error thrown directly in the function's own body, including the defensive guards; an error that merely propagates from a callee is documented on the callee, and the absence of `@throws` on a fully documented function is itself the assertion that nothing is thrown directly. Complex components and services carry an `@example` block with a minimal, runnable snippet, serving the role the family's `Usage` section serves in Python.

Not everything is documented that heavily, by design. Thin mappers such as the translators keep a one-line summary, page components carry a single sentence stating what they compose, and props are documented as field comments on the props interface rather than in a tag block. The boundary is documented in full where its failure modes live, so the record's schema states what the contract rejects and each of its doors names the file or storage key a bad value came from.

The rest of the TSDoc vocabulary is used where it fits and omitted where it does not: a caveat becomes a `@remarks` block rather than a loose sentence, cross-references use `@see`, defaults use `@defaultValue`, and retirement uses `@deprecated`. Tags you do not see are simply not called for by that code; generated code should add them as it introduces the behavior.

Beyond doc comments, the project's technical documentation is governed by a fixed documentation system: a vendor-neutral [AGENTS.md](AGENTS.md) is the agent entry point and the single index of every document, [STATE.md](STATE.md) tracks the living project state, [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) holds the current map of the system, and immutable decision records under [docs/decisions/](docs/decisions/) hold the reasoning behind every settled choice. The full rulebook, including the split between living documents and records and the writing rules for each species, lives in [docs/CONVENTIONS.md](docs/CONVENTIONS.md); that file is normative and must not be modified. The rationale behind adopting it in its current form is recorded in [the style-alignment decision record](docs/decisions/0012-adopt-the-client-styles-documentation-system.md).

Both the rulebook and the conventions above are owned at the style level. A project built from this template never changes them locally, and an improvement discovered while refactoring against the template is not kept as a private advantage; [AGENTS.md](AGENTS.md) describes the upstream report that carries it back to the template, where it is verified and, if it holds, adopted for every project that follows the style.

One further rule applies to every piece of prose in the project, from this README through doc comments to commit messages. Everything must read as if a person wrote it. The clearest machine tell is the clause-colon splice, a sentence shaped as claim, colon, elaboration; no human writes that way outside a slide deck, so in prose a colon may only introduce a list, a quote, or a label. Softer tells, such as a balanced semicolon antithesis or a neat triadic list, are each fine on their own but give the text away when stacked, because a paragraph of polished epigrams reads as machine writing even when every sentence would pass alone. Allow at most one such flourish per paragraph and write the rest as plain declarative sentences.

One rule governs string delimiters in code, and it is general on purpose. Where a language offers a free choice of delimiter with identical semantics, use double quotes, switching only where it avoids escapes; where the delimiters differ in meaning, as they do in SQL or a shell, the meaning decides. The rule binds only where the choice is actually free, which is what lets it hold in every language the family touches without ever fighting a syntax, and where a checker for it exists, the Lint verb carries it.

One rule governs the shape of a code file, and it is judgment rather than a gate. A file holds one idea. A file grown past easy reading is a prompt to ask whether it still does; when its sections have earned names, it is a folder wearing a file's name, and the split follows those names rather than any count, with the segment's `index.ts` keeping the public surface unchanged so no caller pays for the move. Size is the symptom and never the verdict, so no line limit exists for code and none may be added, because a cap would decide by count what only structure can decide and would breed wrapper files written to duck under it. A file with no nameable sections, a generated table or one long linear procedure, is one idea at its honest size and stays whole.

---

## License

This work is under an [MIT](https://choosealicense.com/licenses/mit/) License.
