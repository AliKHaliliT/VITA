# VITA

![License](https://img.shields.io/github/license/AliKHaliliT/VITA) ![Last Commit](https://img.shields.io/github/last-commit/AliKHaliliT/VITA) ![Open Issues](https://img.shields.io/github/issues/AliKHaliliT/VITA)

**A personal operating system**: portfolio, digital garden, and life records in one static site. *Vita* is Latin for "life", the same root as *curriculum vitae*, and this is a CV on steroids: career, writing, reading, travel, and everything in between, published from Markdown.

Built with React + Vite, deployed to GitHub Pages. No server, no database. The repository's documentation and engineering conventions follow [My-Styles](https://github.com/AliKHaliliT/My-Styles).

---

## The ecosystem

VITA is the public face of a three-repo ecosystem. The other two are companion apps, kept separate so the published site ships zero editing machinery:

- **The admin panel** manages every ledger on the site and produces the seed files (`profile.md`, `site.json`, `palette.json`, content Markdown) this repo publishes, along with the `portfolio.json` snapshot that feeds the builder.
- **The resume builder** imports that `portfolio.json` and composes print-ready resumes and CVs (PDF, LaTeX, Word).

The bridge between all three is files, not imports: this repo carries its half of the snapshot contract in `src/types/portfolio.ts` (format `vita-portfolio`, versioned).

---

## Tech stack

| Layer     | Choice                      |
| --------- | --------------------------- |
| Framework | React 19 + TypeScript       |
| Build     | Vite 7                      |
| Styling   | Tailwind CSS v4             |
| Routing   | React Router DOM v7         |
| Animation | Framer Motion (LazyMotion)  |
| Content   | Markdown + YAML frontmatter |

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

## Getting started

```powershell
npm install
npm run dev
```

Make it yours: edit `src/content/settings/profile.md` (who you are), `src/content/settings/site.json` (site name, title, metas), and `src/content/settings/palette.json` (colors). All content lives in `src/content/`, and the shipped seed is a self-documenting demo set in a small fantasy world: the record of Wren Emberquill, an artificer of Cinderfen, where every entry's body states which field, variant, or edge case it shows (with and without links, broken images, open type values, story links, and so on). Nothing in it can be mistaken for a real person or credential. Browse the running site once before replacing the files.

See [`docs/SETUP.md`](docs/SETUP.md) for full setup, deployment, and troubleshooting.

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

## Adding content

Create a `.md` file in `src/content/<type>/` with the correct frontmatter, then restart `npm run dev` (content is bundled eagerly, so hot reload alone is not enough). The companion admin panel generates these files for you.

See [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md) for frontmatter schemas for every type.

---

## License

[MIT](LICENCE): use it, fork it, make it your own.
