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
- **Build**: `just build` → `pnpm run build` (SvelteKit **adapter-static**) →
  static `build/`. `BASE_PATH=/transfemme-tailoring` sets the GitHub Pages project
  base; unset locally builds at root.
- **Check**: `just check` (gitleaks + prettier/eslint + svelte-check + vitest).
  `just conformance` runs the static-spoke checklist; `just scaffold-doctor`
  audits drift.
- **Secrets**: `just secrets-scan-dir` (tree) / `just secrets-scan` (history),
  via gitleaks.

## Deploy — personal GitHub Pages (intentional divergence)

Deploys via `.github/workflows/deploy-pages.yml` (`actions/deploy-pages` on
`build/`), building through the Nix devshell + `just` so CI == local.
`svelte.config.js` reads `process.env.BASE_PATH`; `static/.nojekyll` is required
so `_app/` assets are served; there is no `static/CNAME` (the Pages project path
is the canonical URL).

**This corrects a scaffold-contract bug — see [TIN-2230].** The scaffold ships a
*Cloudflare Pages* `deploy-pages.yml` and a `svelte.config.js` with `base: ''`
(no `BASE_PATH`), both contradicting its own documented *"adapter-static → GitHub
Pages is the house baseline."* This spoke implements the Option-A fix locally.

## Theme & Skeleton

- **Skeleton 4.15.2** (pinned exact). Do not upgrade casually.
- Tailwind v4 + the `skeletonTailwindV4Compat()` shim in `vite.config.ts` rewrites
  Skeleton's `@variant` / `@apply variant-` to stable equivalents — do not remove.
- The omux house theme is vendored at `src/lib/styles/themes/omux.css`; dark mode
  via the FOUC script in `src/app.html` (`data-*` attribute).

## Dependency SSOT — Bazel, not npm

- The dependency source of truth is the **Bazel BCR / `tinyland-inc/bazel-registry`**
  (via `bazel_dep` + `bazelisk mod graph`). In-house `@tummycrypt/*` packages
  (`tinyvectors`, `tinyland-color-utils`, `vite-plugin-a11y`,
  `vite-plugin-skeleton-colors`) are pulled as **Bazel modules**; their
  `package.json` entries are **compatibility edges for pnpm/Vite only** and must
  stay **exact-pinned to the matching `bazel_dep` version** (`just
  inhouse-package-parity`). Never loosen them to caret ranges or "drop to public
  npm" to simplify a build — the module graph is authoritative.
- Bazel exists for **module-graph integrity proofs**; the canonical app build
  stays `pnpm run build`. Cache-first remote build/test is the **Phase-2 Flywheel
  uplift** (`just flywheel-build` / `just flywheel-test` / `just flywheel-fetch`),
  which fail-fast without an org-supplied `BAZEL_REMOTE_CACHE` (dormant here).

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
- **GloriousFlywheel remote cache/RBE**: binding present (`.bazelrc.flywheel`,
  `scripts/gloriousflywheel-bazel.sh`, `just flywheel-*`); endpoints dormant until
  the Phase-2 uplift supplies them.

## What not to do

- Don't call `pnpm` / `vite` / `bazelisk` outside the Justfile (add a recipe).
- Don't add runtime/server code, secrets, or vendor credentials — this is static.
- Don't remove the Skeleton v4 compat shim or `static/.nojekyll`.
- Don't unpin Skeleton/Tailwind, or loosen the `@tummycrypt/*` exact pins.
- Don't wire the dormant org surfaces (tofu / Blahaj / pulse) on this personal spoke.
- Don't introduce raw `--remote_cache=` / `--remote_executor=` endpoints (the
  Flywheel wrapper contract is endpoint-free).

[TIN-2230]: https://linear.app/tinyland/issue/TIN-2230
