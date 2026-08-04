# Changelog

Notable changes to the VITA template, written for people who fork it. This file is a set of
records: once a version is cut its entry is written once and never edited. The format follows
Keep a Changelog; the Unreleased section is the staging area until the first version is
tagged, at which point its contents move under a version heading.

## Unreleased

### Added

- The "dossier" design language: Fraunces, Switzer, and IBM Plex Mono, with square data
  chips and round pill actions on a warm paper or charcoal ground.
- Runtime color palettes: five presets (Rangefinder default), file-seeded through
  `src/content/settings/palette.json` with a per-browser localStorage override.
- File-seeded site identity: name, title, social metadata, and optional owner-voice fields
  (hero monogram, footer sign-off, colophon), seeded through `src/content/settings/site.json`.
- The `portfolio.json` export contract (`src/features/portfolio-export/contract.ts`, format `vita-portfolio`,
  versioned): a snapshot of the whole record that feeds the companion resume builder and
  doubles as a backup format.
- Open-ended profile links: a free-form "Label: URL" list in the profile for any platform
  (Kaggle, Hugging Face, ResearchGate, anything), rendered as chips beside the fixed
  social icons on the home hero and in the footer, with an optional per-link icon
  from the site's own glyph set (`Label [icon]: URL`).
- Story links: any content item (a book, a city, an interest) can carry a `story`
  route pointing at its long-form blog or garden piece; a shared affordance renders
  the connection.
- Open accomplishment types: award, publication, speaking, certificate, and
  membership type fields accept any owner-invented value (sport trophies, patents,
  attended events) with sensible label fallbacks.
- A skill matrix on the home page: category cards with keyword-matched instrument
  icons and square item chips, replacing the flat rows.
- Tags render as square chips everywhere (multi-word tags stopped reading as loose
  prose).
- The projects page became a dossier index: one featured card with an image, then a
  year-grouped ledger of entries; images load lazily and fall back to a quiet glyph
  when a hot-linked preview fails, and link-less projects are first-class.
- Search covers the whole record (publications, certificates, speaking, volunteering,
  organizations, interests, travel, and more), matches structured facts like the
  degree or venue, ranks title hits above tag and body hits, and groups results by
  section.
- Garden note kinds are open: Seedling and Evergreen are joined by List (long living
  lists), and any owner-invented label works.
- A dedicated /skills page: the skill matrix, spoken languages, and optional setup
  notes (the old /uses content, which now redirects there). Nothing on the home page
  is orphaned; every surface has a section behind it.
- Empty sections hide themselves: navigation, footer columns, and home-page chapters
  and count cells all stand down at zero instead of advertising empty pages.
- The travel log got the projects treatment: countries grouped by last visited year
  (from `years`, else the newest dated city), cities newest-first, undated entries
  closing the list.
- Interests read as a ledger (bare entries stay one quiet row), spoken languages
  render as chips on the home page, filter pills wrap instead of hiding behind an
  invisible scrollbar, the hashtag prefix left the blog and garden filters, and the
  library shelves order To Read, Reading, Read.
- The home Now chapter reads from the Updates feed (the old Doing/Reading/Focus
  cells were orphaned profile strings); skills and languages moved to their own
  Toolkit chapter whose header links to /skills.
- Everything long truncates honestly: filter rows collapse behind a "+N more"
  toggle, skill cards cap chips on the home view, card tag lists cap with a "+N",
  and the hero shows at most twelve custom links with a "+N" pointing at the
  footer's complete set.
- Modal close buttons live in their own header strip instead of floating over
  images; malformed profile lines (a language without a colon) render as bare
  names instead of disappearing.
- Page copy is data: every page-header description can be overridden through the
  site identity's `pageCopy` record (seeded in `site.json`); empty fields keep
  the template default.
- No scrapeable mailto links: email addresses (the profile's, mailto custom
  links, and reference contacts) render as obfuscated "[at] / [dot]" chips
  that copy the real address to the clipboard on click.
- Off-site blog posts: an `externalUrl` field marks writing whose canonical home is
  elsewhere (Medium, dev.to); lists render a dashed frame, host chip, and outbound
  arrow, and every surface links out instead of routing.
- Command-palette search (Ctrl K or Cmd K) across the main content types.
- Dark and light mode with a full-page crossfade.
- An instrument-motion system: press and hover feedback on every action, dropdown and
  mobile-index choreography, winking telemetry cells, a breathing ground-track node,
  count-up meters, and a generative ambient constellation behind the hero and in
  wide-screen gutters (reduced-motion safe throughout).
- A GitHub Pages deploy workflow with a `404.html` fallback so deep links survive a refresh.
- An icon generator (`npm run icon -- <size>`): renders the brand pixel-mark to PNG at any
  size, dependency-free, reading its colors from the deployed palette seed so a re-themed
  fork gets matching icons.
- A documentation system: `AGENTS.md` as the single index, `STATE.md`, frozen conventions,
  decision records, and a repository baseline.
- A self-documenting demo seed set in a small fantasy world: every entry under
  `src/content/` belongs to a fictional artificer's record and states which field, variant,
  or edge case it exercises (with and without links, broken images, open type values, story
  links, orphan travel entries, undated items), so browsing the deployed demo doubles as the
  template's field guide and nothing reads as a real person or credential.

### Changed

- Restructured the source tree into one-way sliced layers
  (`app -> pages -> features -> entities -> shared`), each slice entered through its own
  public door, with the composition root split into a bootstrap, a provider stack, a route
  table, and the page chrome. Suites moved to a `tests/` tree mirroring `src/`.
- Content is now checked as it enters the record. A bundled markdown file whose frontmatter
  cannot produce a valid item fails with the path named, and a localStorage override written
  by the companion admin panel that breaks the contract falls back to the committed seed
  with the key to clear named, instead of reaching a page as if the site had produced it.
- Renamed the project to VITA and relicensed under MIT for public template use.
- Split the ecosystem into three repos: this public site, the admin panel, and the resume
  builder; the site ships zero editing machinery and bridges to the companions by files
  (seed content in, `portfolio.json` out).
- Rebuilt the home page as a hero plus six numbered chapters previewing every section.
- Replaced the sidebar shell with a sticky top bar and a full sitemap footer.
