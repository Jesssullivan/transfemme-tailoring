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
- **Skeleton 5.0.1 is pinned exact** (RP1, TIN-5694). The Skeleton 4
  Tailwind-v4 compat shim and `vite-plugin-skeleton-colors` are deleted and stay
  deleted.
- **Bazel registry is the dependency SSOT.** `@tummycrypt/*` packages come only
  from `bazel_dep` + `npm_link_package` (RU9); package.json has no specifier for
  them (`just inhouse-package-parity`). Never "drop to public npm."
- **Stack**: SvelteKit 3.0.1 + TypeScript 7.0.2 (`svelte-check --tsgo`). No
  `svelte.config.js`, no `$lib` (use `#lib/...`), no `base` (use `resolve()`).
  `patches/` comes from site.scaffold (RU13); see AGENTS.md "Stack".
- **Content**: `README.md` is the source-of-record; articles live in
  `src/routes/<topic>/+page.svelte`; fitting math in
  `src/lib/components/*Calculator.svelte` (Svelte 5 runes).
- **Voice**: warm, first-person build-log. Precise and reproducible, gender-euphoria
  aware, honest about a transfemme athlete silhouette.
- Org-only surfaces (tofu / Blahaj / pulse-ingest / ci-templates) are **dormant**
  here — see AGENTS.md "Personal posture." Phase 2 is the GloriousFlywheel
  cache-first remote build/test uplift.
