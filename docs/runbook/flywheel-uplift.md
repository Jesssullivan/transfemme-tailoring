# Phase 2 — GloriousFlywheel cache-first uplift

> **Status (2026-06-29):** the spoke-side wiring is implemented — `//:ci_validation_suite`
> is tagged `flywheel-eligible` and a gated `flywheel` job in `.github/workflows/ci.yml`
> runs `just flywheel-build` / `just flywheel-test` cache-first. It is **inert until
> enabled**: set the `FLYWHEEL_ENABLED` repo variable + the `BAZEL_REMOTE_CACHE` secret,
> and enroll the tenant in `tinyland-inc/GloriousFlywheel` `config/spoke-registry.json`
> (instance `spoke-transfemme-tailoring`). Until enrolled, the token-exchange mints at
> most cache-**read**; only an enrolled default-branch push can write the cache.

Runbook for moving this spoke from the **Phase 1** posture (canonical `pnpm run
build`; Bazel as a module-graph integrity proof; Flywheel endpoints dormant) to
**cache-first remote build / check / test** through
[`tinyland-inc/GloriousFlywheel`](https://github.com/tinyland-inc/GloriousFlywheel).

This is deliberately a *follow-up*. Phase 1 ships the static site to GitHub Pages
with no remote cache. Phase 2 is opt-in and only meaningful once a Flywheel cache
endpoint is available to this repo (operator-deployed, or the tinyland-inc
fabric). Until then, the `just flywheel-*` recipes **fail-fast by design** when
`BAZEL_REMOTE_CACHE` is absent — that is the intended behaviour, not a bug.

## The contract (don't re-litigate it here)

Endpoint authority is **environment-driven, not `.bazelrc`-driven**. `.bazelrc.flywheel`
is endpoint-free (safe timeouts, download mode, `flywheel-eligible` tag filters);
the wrapper `scripts/gloriousflywheel-bazel.sh` passes `--remote_cache` (and
optional `--remote_executor`) explicitly from validated environment.

| Variable | Meaning |
| --- | --- |
| `BAZEL_REMOTE_CACHE` | **Required** for any Flywheel-backed Bazel work. |
| `GF_BAZEL_SUBSTRATE_MODE=shared-cache-backed` | Remote **cache only** (the default uplift target). |
| `GF_BAZEL_SUBSTRATE_MODE=executor-backed` | Also requires `BAZEL_REMOTE_EXECUTOR` (RBE). |
| `GF_BAZEL_REMOTE_UPLOAD=true` | Trusted default-branch / operator cache-writing **only**; PRs stay read-only. |
| `BAZEL_CREDENTIAL_HELPER`, `BAZEL_REMOTE_*_HEADER` | Optional auth material, runtime-only — never committed. |

**Proved-for-spoke target classes** (mirror of
`GloriousFlywheel/config/rbe-target-eligibility.json`): `sveltekit-app-build`,
`sveltekit-unit-tests`, `deployment-bundle-packaging`, `docs-site-static-build`.
Candidate (still rejected at runtime): `web-playwright-chromium-static-smoke`.

**Hard NOs:** no raw `--remote_cache=` / `--remote_executor=` in `.bazelrc`;
RustFS is not trusted CAS/action-cache until TIN-1147; no OpenTofu RBE; no
developer-server RBE (`//app:dev` can't run on REAPI); a cache hit is not RBE.

## Steps

1. **Prove the graph locally.** `just bazel-graph` (or `bazelisk mod graph`) must
   succeed — this is the Phase-1 integrity proof and the precondition for any
   remote work. It needs the `tinyland-inc/bazel-registry` chain in `.bazelrc`.
2. **Confirm eligible targets.** In `BUILD.bazel`, the build, unit-test and
   `ci_validation_suite` targets must carry `tags = ["flywheel-eligible"]` (and
   `manual`, so a bare `bazel test //...` doesn't run browserful work by
   accident). A `test_suite`'s `tags` are *filters*, not metadata — keep them to
   the shared tag set or the suite silently resolves to zero targets.
3. **Supply the endpoint (operator / CI).** Export `BAZEL_REMOTE_CACHE` and, for
   RBE, `BAZEL_REMOTE_EXECUTOR` + `GF_BAZEL_SUBSTRATE_MODE=executor-backed`. For
   the cache-first target, `shared-cache-backed` is enough.
4. **Cache-first build/test/fetch.** Use the wrappers, never raw bazel:
   - `just flywheel-build` — cache-backed `//:build`.
   - `just flywheel-test` — cache-backed `//:ci_validation_suite`.
   - `just flywheel-fetch` — warm the cache for `//...`.
   - `just flywheel-doctor` / `just flywheel-info` — explain the resolved profile.
5. **Wire CI.** Add a Flywheel job that reads the endpoint from CI vars/secrets
   and runs `just flywheel-build` + `just flywheel-test`. **PRs are read-only**
   cache consumers; only a trusted default-branch lane sets
   `GF_BAZEL_REMOTE_UPLOAD=true`. (This spoke's `ci.yml` is self-contained Nix +
   `just`; the org `ci-templates` `spoke-ci.yml` already has a `flywheel_config`
   input if you later adopt the fleet path.)
6. **Route remote check/test.** Once `sveltekit-unit-tests` is green through the
   cache, point `just check`'s typecheck/test leg at `bazel test
   //:ci_validation_suite` via `flywheel-test` so checks are cache-accelerated.
7. **Measure.** Track cache hit-rate and cold-vs-warm wall-clock; the win is
   skipped re-builds, not RBE fan-out (cache hits are not RBE).

## Tracking

This work sits alongside the **site.scaffold UPLIFT** initiative and the
**GloriousFlywheel Productization** project. Related scaffold issues observed
while bootstrapping this spoke: **TIN-2230** (the scaffold's default deploy
surface contradicts its documented GitHub-Pages baseline) and **TIN-2229**
(doc-rot sweep — incl. the dangling `MODULE.bazel` audit-spec ref this repo
already fixed locally).
