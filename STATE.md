# State

Current project status. Read this before starting work. Format and rules: see
[docs/CONVENTIONS.md](docs/CONVENTIONS.md).

## Now

- Preparing the first commit of the fresh history: the ecosystem split into three repos,
  the seed became the self-documenting demo record, and the owner's real content moved to
  the untracked `my-content/` store (2026-07-24).

## Next

- Link the two companion repos (admin panel, resume builder) from the README once they are
  public and their final names are settled (2026-07-24).
- Publish: flip the repo public, enable Settings, Pages, Source, GitHub Actions, and push
  `main` (2026-07-24).
- Decide the personal-deployment story: the shipped seed is the demo record, and deploying
  the real one means swapping `my-content/` over `src/content/` in a private branch, fork,
  or build step (2026-07-24).

## Deferred

- Add a merge or choose UI for seed-versus-localStorage shadowing; a redeploy that changes
  shadowed markdown currently only logs a console warning naming the key to clear (2026-07-18).
- Split `docs/ARCHITECTURE.md` again by fission if it drifts back over the size budget (2026-07-18).

## Blocked

- Nothing blocked.
