# CLAUDE.md

Read **`AGENTS.md`** first — it is the working contract for this repo. This file
is the short overlay of gotchas.

- **Single entrypoint**: `just <recipe>` inside `nix develop` (direnv auto-loads).
  `just setup` → `just dev` → `just check` → `just build`.
- **Static spoke**: SvelteKit `adapter-static` → personal GitHub Pages
  (`jesssullivan.github.io/transfemme-tailoring`). No backend, no secrets, no
  runtime API routes.
- **Build base path**: `BASE_PATH=/transfemme-tailoring` for the deployed build;
  unset = root (local dev/preview).
- **Skeleton 4.15.2 + the Tailwind-v4 compat shim are pinned** — don't touch.
- **Bazel BCR is the dependency SSOT.** `@tummycrypt/*` npm entries are
  exact-pinned compatibility edges (`just inhouse-package-parity`) — never loosen
  them or "drop to public npm."
- **Content**: `README.md` is the source-of-record; articles live in
  `src/routes/<topic>/+page.svelte`; fitting math in
  `src/lib/components/*Calculator.svelte` (Svelte 5 runes).
- **Voice**: warm, first-person build-log. Precise and reproducible, gender-euphoria
  aware, honest about a transfemme athlete silhouette.
- Org-only surfaces (tofu / Blahaj / pulse-ingest / ci-templates) are **dormant**
  here — see AGENTS.md "Personal posture." Phase 2 is the GloriousFlywheel
  cache-first remote build/test uplift.
