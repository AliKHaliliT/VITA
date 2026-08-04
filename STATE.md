# State

Current project status. Read this before starting work. Format and rules: see
[docs/CONVENTIONS.md](docs/CONVENTIONS.md).

## Now

- The source tree moved to one-way sliced layers after the client template in the style
  family, and both record doors are now checked at the boundary (2026-08-04). The
  reasoning is in decisions 0007 through 0009.
- The layer rule is now checked by ESLint rather than by review, and the design tokens moved
  to the template's two-layer shape with semantic names behind a `data-theme` attribute
  (2026-08-04). Decisions 0010 and 0011 carry the reasoning.
- The whole ecosystem is public: this repo, both companions, and the owner's deployment
  all flipped visibility, so every badge and cross-repo link resolves (2026-08-01).
- The docs baseline synced with the 2026-08-01 My-Styles changes, adopting the sharpened
  human-prose rule and the public-audience rule with the untracked LOCAL.md ledger
  (2026-08-01).
- The template is live at alikhalilit.github.io/VITA/ and the owner's real record moved to
  its own deployment repo (AliKHaliliT/AliKHaliliT), so this repo is purely the template
  again: demo seed in, personal store gone (2026-07-28). The README now links both
  companions and their demos, and the palette rides in the portfolio contract (2026-08-01).

## Next

- Nothing queued.

## Deferred

- Bring every export up to the doc-comment convention. The files touched by the layer
  move carry it; the rest still carry their original informal comments (2026-08-04).
- Add a merge or choose UI for seed-versus-localStorage shadowing; a redeploy that changes
  shadowed markdown currently only logs a console warning naming the key to clear (2026-07-18).
- Split `docs/ARCHITECTURE.md` again by fission if it drifts back over the size budget (2026-07-18).

## Blocked

- Nothing blocked.
