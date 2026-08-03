# VITA

<div align="center">

![License](https://img.shields.io/github/license/AliKHaliliT/VITA) ![Last Commit](https://img.shields.io/github/last-commit/AliKHaliliT/VITA) ![Open Issues](https://img.shields.io/github/issues/AliKHaliliT/VITA)

![VITA](util_resources/readme/logo.svg)

**[Live demo](https://alikhalilit.github.io/VITA/)**

</div>

VITA is a personal operating system that gathers your portfolio, digital garden, and life records into one static site. *Vita* is Latin for "life", the same root as *curriculum vitae*, and the site is best thought of as a CV on steroids that covers career, writing, reading, travel, and everything in between, published from Markdown.

It is built with React and Vite and deploys to GitHub Pages with no server and no database. The repository's documentation and engineering conventions follow [My-Styles](https://github.com/AliKHaliliT/My-Styles).

---

## The ecosystem

VITA is the public face of a three-repo family. The two companion apps are kept in their own repositories so the published site ships none of the editing machinery.

| App | Role | Demo |
| --- | --- | --- |
| **VITA** (this repo) | Renders the record as the public site | [alikhalilit.github.io/VITA](https://alikhalilit.github.io/VITA/) |
| [**TABULARIUM**](https://github.com/AliKHaliliT/TABULARIUM) | Edits every ledger and publishes the seed files | [alikhalilit.github.io/TABULARIUM](https://alikhalilit.github.io/TABULARIUM/) |
| [**EPITOMA**](https://github.com/AliKHaliliT/EPITOMA) | Condenses the record into resumes and CVs | [alikhalilit.github.io/EPITOMA](https://alikhalilit.github.io/EPITOMA/) |

The three apps talk through files rather than imports. This repo carries its half of the snapshot contract in `src/types/portfolio.ts`, versioned under the `vita-portfolio` format name.

---

## How the system works

The record itself is nothing more than files. Every entry on the site is a Markdown file with YAML frontmatter, and the site identity, palette, and page copy are small JSON and Markdown seeds beside them. The repository is the database, the git history is the audit log, and a `git clone` is a complete backup.

VITA turns those files into a static site at build time. Content is bundled during the build rather than fetched at runtime, so the published site is plain HTML, CSS, and JavaScript that any static host can serve. There is no server to run, no database to maintain, and nothing to sign up for beyond the GitHub repository itself.

The CMS is a separate and entirely optional layer. TABULARIUM runs in the browser, stages every edit in localStorage, and sends nothing anywhere while you work. Publishing means producing the same files you could have written by hand. The panel can hand them over as single downloads, package the whole record as a zip in this repo's layout, or commit them to this repository directly, using a fine-grained token that stays in your browser. Because the panel writes ordinary files, hand edits and panel edits coexist, and if the panel vanished tomorrow the record would still be perfectly readable Markdown.

The loop closes on its own. When the panel pushes, or when you commit by hand, the Pages workflow rebuilds and the site is live a minute or two later. EPITOMA sits at the read-only end of the chain, pulls the same record straight from the public repository, and turns it into documents without a token, a server, or an export step in between.

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

The template keeps evolving after you copy it, and [`CHANGELOG.md`](CHANGELOG.md) records
what each release changed. How you pull those changes in depends on how you created your
repository.

If you clicked "Use this template", your repository shares no git history with this one,
so GitHub offers no sync button and git does the job instead. Connect the template once as
a second remote, then merge whenever the changelog gives you a reason to.

```powershell
git remote add template https://github.com/AliKHaliliT/VITA.git
git fetch template
git merge template/main --allow-unrelated-histories
```

The `--allow-unrelated-histories` flag is only needed the first time, since that merge
stitches the two histories together; from then on a plain `git fetch template` followed by
`git merge template/main` is enough. Your record lives under `src/content/`, and releases
leave it alone with one honest exception. A release that introduces a new section ships
that section's demo seed, because a capability needs something to show. Those seeds arrive
as files that do not exist on your side, so the merge stays conflict-free; they simply
render as demo entries until you replace them with your own or delete them, exactly like
the original seed. The one conflict you may meet is git's modify/delete complaint when a
release touches a demo file you removed while clearing out the original record, and
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

The comfortable way is the admin panel. [TABULARIUM](https://github.com/AliKHaliliT/TABULARIUM) gives every ledger a real editor with rich text, live identity and palette previews, and all nineteen content types, and it produces exactly the files this repo publishes. You can download them one by one, download the whole record as a zip laid out in this repo's structure, or connect the panel straight to your repository with a fine-grained token and push edits as commits, resolving any conflicts file by file. The [hosted panel](https://alikhalilit.github.io/TABULARIUM/) works out of the box, and everything you edit stays in your browser until you publish it.

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

## Features

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

- Book library with reading status
- Travel log from countries down to cities
- Interests ledger with story links into the garden

### The record's machinery

- Nineteen content types, each mapping one-to-one to a folder, a TypeScript interface, and a route
- Open type fields that never gate what a record can hold; a degree can be "Journeyman" and a publication a "charter", and the site renders any label you invent
- Story links that cross-reference the record, so an interest, a book, or a city can point at the garden note or blog post that tells its story
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
- A featured project without an image gets designed schematic art drawn from the palette, not a broken-image glyph
- Self-hosted fonts and zero third-party requests; the published site phones nobody
- Social and SEO metas baked at build from the identity seed, per-page titles, and deep links that survive hard refreshes on GitHub Pages
- Obfuscated email chips instead of scrapeable mailto links
- Empty sections hide themselves, so nothing advertises a page with no content
- CI ships with the template; every push type-checks, lints, tests, and builds before it deploys

---

## Run locally

You need Node.js 20 or newer (the deploy workflow builds on 22) and git; nothing else.

```powershell
npm install
npm run dev
```

The site opens on port 3000. TABULARIUM uses 3100 and EPITOMA uses 3200, so all three run
side by side. `npm test` runs the characterization suites that pin content parsing and
the export contract, and `npm run build` type-checks and produces the static `dist/`.

---

## Documentation

| Doc                                              | Contents                                                    |
| ------------------------------------------------ | ----------------------------------------------------------- |
| [`docs/SETUP.md`](docs/SETUP.md)                 | Installation, scripts, GitHub Pages deploy, troubleshooting |
| [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md) | All content types and their frontmatter schemas             |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)   | Data flow, routing, the ecosystem boundary, theming         |
| [`docs/ROADMAP.md`](docs/ROADMAP.md)             | Feature landscape and standing technical debt               |

Contributors and coding agents should start at [`AGENTS.md`](AGENTS.md), which is the vendor-neutral entry point and the full documentation index.

---

## License

This work is under an [MIT](https://choosealicense.com/licenses/mit/) License.
