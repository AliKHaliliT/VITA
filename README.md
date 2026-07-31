# VITA

<div align="center">

![License](https://img.shields.io/github/license/AliKHaliliT/VITA) ![Last Commit](https://img.shields.io/github/last-commit/AliKHaliliT/VITA) ![Open Issues](https://img.shields.io/github/issues/AliKHaliliT/VITA)

![VITA](util_resources/readme/logo.svg)

**[Live demo](https://alikhalilit.github.io/VITA/)**

</div>

**A personal operating system**: portfolio, digital garden, and life records in one static site. *Vita* is Latin for "life", the same root as *curriculum vitae*. Think of it as a CV on steroids that covers career, writing, reading, travel, and everything in between, published from Markdown.

Built with React + Vite, deployed to GitHub Pages. No server, no database. The repository's documentation and engineering conventions follow [My-Styles](https://github.com/AliKHaliliT/My-Styles).

---

## The ecosystem

VITA is the public face of a three-repo family. The other two are companion apps, kept separate so the published site ships zero editing machinery:

| App | Role | Demo |
| --- | --- | --- |
| **VITA** (this repo) | The site: renders the record | [alikhalilit.github.io/VITA](https://alikhalilit.github.io/VITA/) |
| [**TABULARIUM**](https://github.com/AliKHaliliT/TABULARIUM) | The admin panel: edits every ledger and publishes the seed files | [alikhalilit.github.io/TABULARIUM](https://alikhalilit.github.io/TABULARIUM/) |
| [**EPITOMA**](https://github.com/AliKHaliliT/EPITOMA) | The resume builder: condenses the record into resumes and CVs | [alikhalilit.github.io/EPITOMA](https://alikhalilit.github.io/EPITOMA/) |

All three talk through files rather than imports. This repo carries its half of the snapshot contract in `src/types/portfolio.ts` (format `vita-portfolio`, versioned).

---

## Make it your portfolio

1. **Use this template.** Click "Use this template" on GitHub and create your repository (any name works; the deploy adapts to it).
2. **Turn on Pages.** In your new repo: Settings → Pages → Source: **GitHub Actions**. The included [deploy workflow](.github/workflows/deploy.yml) builds and publishes on every push to `main`.
3. **Push.** Your site goes live at `https://<username>.github.io/<repo>/`.
4. **Make it yours.** Replace the demo record (see below). Identity lives in three seed files: `src/content/settings/profile.md` (who you are), `site.json` (site name, title, metas), and `palette.json` (colors).

The shipped seed is a self-documenting demo set in a small fantasy world, the record of Wren Emberquill, an artificer of Cinderfen. Every entry's body states which field, variant, or edge case it shows, and nothing in it can be mistaken for a real person or credential. Browse the running site once before replacing the files.

See [`docs/SETUP.md`](docs/SETUP.md) for full setup, deployment, and troubleshooting.

---

## Adding content

Two ways, same files either way:

- **By hand.** Create a `.md` file in `src/content/<type>/` with the correct frontmatter and commit it. [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md) documents every type's schema. Content is bundled eagerly, so restart `npm run dev` after adding files locally.
- **With the admin panel.** [TABULARIUM](https://github.com/AliKHaliliT/TABULARIUM) gives every ledger a real editor (rich text, live identity and palette previews, all nineteen content types) and produces exactly these files. Download them as a zip laid out in this repo's structure, or connect the panel straight to your repository with a fine-grained token and push edits as commits, conflicts handled per file. The [hosted panel](https://alikhalilit.github.io/TABULARIUM/) works out of the box; everything stays in your browser until you publish.

When you want the record as documents instead of a site, [EPITOMA](https://github.com/AliKHaliliT/EPITOMA) turns it into print-ready resumes and CVs: point it at your public site repository and it pulls the content itself, no token needed.

---

## Features

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
- Travel log: country to city hierarchy
- Interests ledger with story links into the garden

### The system

- "Dossier" design language: serif display type, mono data chips, dashed hairlines
- Dark / light mode with a full-page crossfade
- Command-palette search (Ctrl K / ⌘K) across the whole record
- Runtime color palettes + site identity + page copy, all file-seeded
- Obfuscated email chips instead of scrapeable mailto links
- Empty sections hide themselves; nothing advertises a page with no content

---

## Run locally

```powershell
npm install
npm run dev
```

The site opens on port 3000 (TABULARIUM uses 3100 and EPITOMA 3200, so all three run side by side).

---

## Documentation

| Doc                                              | Contents                                                    |
| ------------------------------------------------ | ----------------------------------------------------------- |
| [`docs/SETUP.md`](docs/SETUP.md)                 | Installation, scripts, GitHub Pages deploy, troubleshooting |
| [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md) | All content types and their frontmatter schemas             |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)   | Data flow, routing, the ecosystem boundary, theming         |
| [`docs/ROADMAP.md`](docs/ROADMAP.md)             | Feature landscape and standing technical debt               |

For contributors and coding agents, see [`AGENTS.md`](AGENTS.md): the vendor-neutral entry point and the full documentation index.

---

## License

This work is under an [MIT](https://choosealicense.com/licenses/mit/) License.
