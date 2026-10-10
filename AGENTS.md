# Agent Notes — transfemme-tailoring

Working contract for coding agents and LLMs operating in this repo. A **personal
static spoke** spawned from `tinyland-inc/site.scaffold` (FULL scaffold posture:
Bazel + Nix + pnpm + Flywheel binding), deployed to **personal GitHub Pages** at
`https://jesssullivan.github.io/transfemme-tailoring/`.

## Repo Role

A static lab-notebook / **build-log** project site: a warm first-person guide to
tailoring oversized, masculine-cut formalwear into a well-fitted **transfeminine**
silhouette for an athletic body, plus interactive **tailoring calculators** (the
sewing analog of tinyland-goo's recipe "scalers"). It is **not** an application
backend — no user data, auth, payments, runtime API routes, or business logic.
`tinyland.repo.json` records this honestly (every `owns_*` boundary is `false`).

**Content model:** `README.md` is the source-of-record (prose, BOM tables,
citations). Each `src/routes/<topic>/+page.svelte` is an article. Interactive
`src/lib/components/*Calculator.svelte` components do the fitting math (Svelte 5
runes; mirror the tinyland-goo `*Scaler.svelte` convention).

## Authoritative Entrypoints

- **DX/AX**: `Justfile` is the single source of truth. Invoke through
  `just <recipe>`; do not call `pnpm` / `vite` / `bazelisk` directly outside the
  Justfile unless adding a recipe.
- **Shell**: `nix develop` (auto-loaded by `direnv`). CI runs
  `nix develop --command just <recipe>` so CI matches local exactly.
- **Build**: `just build` → Bazel `//:build` (SvelteKit **adapter-static**),
  materialized to static `build/`. `BASE_PATH=/transfemme-tailoring` sets the
  GitHub Pages project base (stamped into the action by
  `scripts/bazel/workspace-status.sh`); unset locally builds at root.
- **Check**: `just check` (gitleaks + Bazel `//:lint_suite`, `//:svelte_check_test`
  with its canary, and `//:unit_tests`).
  `just conformance` runs the static-spoke checklist; `just scaffold-doctor`
  audits drift.
- **Secrets**: `just secrets-scan-dir` (tree) / `just secrets-scan` (history),
  via gitleaks.

## Deploy — personal GitHub Pages (intentional divergence)

Deploys via `.github/workflows/deploy-pages.yml` (`actions/deploy-pages` on
`build/`), building through the Nix devshell + `just` so CI == local.
`vite.config.ts` (the `sveltekit()` plugin options; SvelteKit 3 has no
`svelte.config.js`) reads `process.env.BASE_PATH`; `static/.nojekyll` is required
so `_app/` assets are served; there is no `static/CNAME` (the Pages project path
is the canonical URL).

**This corrects a scaffold-contract bug — see [TIN-2230].** The scaffold ships a
*Cloudflare Pages* `deploy-pages.yml` and a `svelte.config.js` with `base: ''`
(no `BASE_PATH`), both contradicting its own documented *"adapter-static → GitHub
Pages is the house baseline."* This spoke implements the Option-A fix locally.

## Stack (RU1/RU5, estate uplift 2026-10-08)

- Exact pins: `@sveltejs/kit` 3.0.1, `svelte` 5.57.2, `vite` 8.3.3,
  `typescript` 7.0.2, `effect` 4.0.2, Skeleton 5.0.1, `vitest` /
  `@vitest/coverage-v8` 5.0.3, `@playwright/test` 1.64.0, `svelte-check` 4.7.6.
  They move with the estate version manifest in `xoxd-ai/site.scaffold`, not per
  spoke; Dependabot ignores them.
- **SvelteKit 3**: config lives in the `sveltekit({...})` plugin in
  `vite.config.ts`, the adapter in `kit.adapter.js`. `$lib` is gone: import
  `#lib/...` (package.json `imports`; `.ts` modules with a `.js` suffix).
  `$app/paths` has no `base`: link with `resolve('/route')`. Use `$app/env`
  (not `$app/environment`).
- **TypeScript 7** is the project's `typescript`; type checking is
  `svelte-check --tsgo`. Tools that still need TypeScript's in-process API get
  Microsoft's `@typescript/typescript6` companion through `.pnpmfile.cjs` and the
  Kit patch. `patches/` is copied from `site.scaffold` (RU13 patch home); do not
  write local patches, report new ones to the scaffold. Export shared types from
  `.ts` modules, not from a component's `<script module>` (TS 7 resolves `#lib`
  `.svelte` imports to the ambient `*.svelte` declaration).
- **Remote functions (RU3)**: the `/agent` skills list is a `prerender` remote
  function (`src/routes/agent/skills.remote.ts`), read at build time. There are no
  forms and no runtime server data; a future form uses remote `form()`.

## Theme & Skeleton

- **Skeleton 5.0.1** (pinned exact, both `@skeletonlabs/skeleton` and
  `@skeletonlabs/skeleton-svelte`; estate ruling RP1, TIN-5694). Do not
  downgrade, range-pin, or take a prerelease.
- Tailwind v4 with no compatibility shim. The Skeleton 4 era
  `skeletonTailwindV4Compat()` plugin and `@tummycrypt/vite-plugin-skeleton-colors`
  (npm dep and `bazel_dep`) are deleted and stay deleted: Skeleton 5 emits
  `@variant` on purpose and declares every colour-pair token itself. The theme's
  root background uses `--color-root-bg-light` / `--color-root-bg-dark`.
- The omux house theme is vendored at `src/lib/styles/themes/omux.css`; dark mode
  via the FOUC script in `src/app.html` (`data-*` attribute).

## Dependency SSOT — Bazel, not npm

- The dependency source of truth is **`xoxd-ai/bazel-registry`** (formerly
  `tinyland-inc`), pinned to an immutable commit in `.bazelrc`, then BCR. In-house
  `@tummycrypt/*` packages (`tinyvectors`, `tinyland-color-utils`,
  `vite-plugin-a11y`) come **only** from their Bazel modules (RU9): `bazel_dep` in
  `MODULE.bazel` plus `npm_link_package` in `BUILD.bazel`. `package.json` carries
  **no** `@tummycrypt/*` specifier, so pnpm cannot supply them; `just setup`
  (`just deps-graph`) links the Bazel-built packages into `node_modules` for
  editors and Playwright. `just inhouse-package-parity` asserts the pairing and
  the pinned-registry resolution. Never add them back as npm deps.
- Bazel owns the app: `//:build`, `//:svelte_check_test` (+ canary),
  `//:eslint_test`, `//:prettier_check_test`, `//:unit_tests`, `//:dev` and
  `//:playwright_static_smoke`. Third-party deps come from the one pnpm lockfile
  through `npm_translate_lock`. Cache-first remote build/test is now wired as the gated
  `flywheel` CI job (`just flywheel-build` / `just flywheel-test`); it activates
  once `BAZEL_REMOTE_CACHE` + `FLYWHEEL_ENABLED` are set, still fail-fast and
  read-only on PRs by design.

## Personal posture — dormant & declined org surfaces

This is a **personal** spoke, not a tinyland-inc fleet member. The following
org-only surfaces are carried as **documented-but-dormant** (kept for lineage /
conformance, never wired live):

- **`tofu/`** (GloriousFlywheel spoke-* OpenTofu modules): no Garage backend, no
  Blahaj install, `blahaj_installation_id = 0`. Never run `just tofu-*`.
- **`.github/lanes.json`**: the single `default` lane is retained for
  conformance/whoami, but no Blahaj ephemeral envs are provisioned. The org
  `lane-env.yml` workflow was **dropped** (it would fail with no org token).
- **Org Pulse ingest**: `pulse-ingest.yml` **dropped** (no `tinyland.dev`
  projection exists for this personal site). Static-projection ingest is
  available-but-unwired.
- **CI**: the scaffold's `ci.yml` delegates to `tinyland-inc/ci-templates`'
  reusable `spoke-ci.yml` (inaccessible from a personal repo). Replaced with a
  self-contained Nix + `just` CI. **Honest drift:** this flips conformance item 2
  (ci-templates SemVer pin) to a MANUAL/deviation — intentional, not silent.
- **GloriousFlywheel remote cache/RBE — WIRED (Phase-2 active).** The `flywheel`
  CI job (`.github/workflows/ci.yml`) runs `just flywheel-build` + `just
  flywheel-test` cache-first through `scripts/gloriousflywheel-bazel.sh`, gated on
  `vars.FLYWHEEL_ENABLED == 'true'` + the `BAZEL_REMOTE_CACHE` secret so it stays
  green (skipped) when unset. Contract unchanged: **endpoints stay out of
  `.bazelrc`** (env/secret-driven only) and **PRs are read-only cache consumers**
  — only push-to-main sets `GF_BAZEL_REMOTE_UPLOAD=true`. Mode is
  `shared-cache-backed` (cache only); executor-backed RBE stays off (refused on
  ubuntu-latest by the linux-x86_64 worker pin). Live cache-write/executor still
  waits on tenant enrollment in GloriousFlywheel `config/spoke-registry.json`.

## What not to do

- Don't call `pnpm` / `vite` / `bazelisk` outside the Justfile (add a recipe).
- Don't add runtime/server code, secrets, or vendor credentials — this is static.
- Don't restore the Skeleton 4 compat shim, and don't remove `static/.nojekyll`.
- Don't unpin Skeleton (5.0.1 exact), the RU5 framework pins or Tailwind, and don't add `@tummycrypt/*` npm specifiers back.
- Don't wire the dormant org surfaces (tofu / Blahaj / pulse) on this personal spoke.
- Don't introduce raw `--remote_cache=` / `--remote_executor=` endpoints (the
  Flywheel wrapper contract is endpoint-free).

[TIN-2230]: https://linear.app/tinyland/issue/TIN-2230
