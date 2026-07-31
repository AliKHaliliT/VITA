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

## Make it your portfolio

1. **Use this template.** Click "Use this template" on GitHub and create your repository. Any name works, because the deploy adapts to it.
2. **Turn on Pages.** In your new repo, open Settings, then Pages, and set the source to **GitHub Actions**. The included [deploy workflow](.github/workflows/deploy.yml) builds and publishes on every push to `main`.
3. **Push.** Your site goes live at `https://<username>.github.io/<repo>/`.
4. **Make it yours.** Replace the demo record as described below. Who you are lives in `src/content/settings/profile.md`, the site name and metas live in `site.json`, and the colors live in `palette.json`.

The shipped seed is a self-documenting demo set in a small fantasy world. It is the record of Wren Emberquill, an artificer of Cinderfen, and every entry's body states which field, variant, or edge case it demonstrates, so nothing in it can be mistaken for a real person or credential. Browse the running site once before replacing the files.

See [`docs/SETUP.md`](docs/SETUP.md) for full setup, deployment, and troubleshooting.

---

## Adding content

There are two ways to add content, and both produce the same files.

The manual way is to create a `.md` file in `src/content/<type>/` with the correct frontmatter and commit it. Every type's schema is documented in [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md). Content is bundled eagerly, so restart `npm run dev` after adding files locally.

The comfortable way is the admin panel. [TABULARIUM](https://github.com/AliKHaliliT/TABULARIUM) gives every ledger a real editor with rich text, live identity and palette previews, and all nineteen content types, and it produces exactly the files this repo publishes. You can download them one by one, download the whole record as a zip laid out in this repo's structure, or connect the panel straight to your repository with a fine-grained token and push edits as commits, resolving any conflicts file by file. The [hosted panel](https://alikhalilit.github.io/TABULARIUM/) works out of the box, and everything you edit stays in your browser until you publish it.

When you want the record as documents instead of a site, [EPITOMA](https://github.com/AliKHaliliT/EPITOMA) turns it into print-ready resumes and CVs. Point it at your public site repository and it pulls the content by itself, with no token needed.

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
- Travel log from countries down to cities
- Interests ledger with story links into the garden

### The system

- A "dossier" design language built from serif display type, mono data chips, and dashed hairlines
- Dark and light mode with a full-page crossfade
- Command-palette search (Ctrl K / ⌘K) across the whole record
- Runtime color palettes, site identity, and page copy, all seeded from files
- Obfuscated email chips instead of scrapeable mailto links
- Empty sections hide themselves, so nothing advertises a page with no content

---

## Run locally

```powershell
npm install
npm run dev
```

The site opens on port 3000. TABULARIUM uses 3100 and EPITOMA uses 3200, so all three run side by side.

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
