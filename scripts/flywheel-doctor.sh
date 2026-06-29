#!/usr/bin/env bash
# Cold-landing diagnostic for GloriousFlywheel-backed Bazel work.
#
# An agent or fresh dev that runs `just flywheel-build` without setup hits a
# fast-fail in scripts/gloriousflywheel-bazel.sh. This script answers the
# question "what's missing, and where do I get it?" before the agent has to
# read the wrapper source.
#
# Exit 0 if ready. Exit 1 with actionable guidance if not. Exit 2 if the
# environment is set but reachability fails.

set -euo pipefail

ok() { printf '  \033[32mOK\033[0m   %s\n' "$1"; }
warn() { printf '  \033[33mWARN\033[0m %s\n' "$1"; }
miss() { printf '  \033[31mMISS\033[0m %s\n' "$1"; }
hint() { printf '       %s\n' "$1"; }

echo ""
echo "GloriousFlywheel cold-landing diagnostic"
echo "========================================"
echo ""

missing=0

# 1. bazelisk on PATH
if command -v bazelisk >/dev/null 2>&1; then
  ok "bazelisk on PATH ($(bazelisk --version 2>&1 | head -n1))"
else
  miss "bazelisk not on PATH"
  hint "Enter the nix dev shell first: \`direnv allow\` or \`nix develop\`."
  missing=$((missing + 1))
fi

# 2. BAZEL_REMOTE_CACHE
if [ -n "${BAZEL_REMOTE_CACHE:-}" ]; then
  case "${BAZEL_REMOTE_CACHE}" in
    grpc://*|grpcs://*|http://*|https://*)
      ok "BAZEL_REMOTE_CACHE = ${BAZEL_REMOTE_CACHE}"
      ;;
    *)
      miss "BAZEL_REMOTE_CACHE is set but doesn't start with grpc://, grpcs://, http://, or https://"
      hint "Current value: ${BAZEL_REMOTE_CACHE}"
      missing=$((missing + 1))
      ;;
  esac
else
  miss "BAZEL_REMOTE_CACHE is unset"
  hint "On-cluster default: grpc://bazel-cache.nix-cache.svc.cluster.local:9092"
  hint "External operators: ask for the Flywheel cache URL or set via CI secret."
  hint "Then: export BAZEL_REMOTE_CACHE=<url>"
  missing=$((missing + 1))
fi

# 3. GF_BAZEL_SUBSTRATE_MODE
mode="${GF_BAZEL_SUBSTRATE_MODE:-}"
case "${mode}" in
  shared-cache-backed)
    ok "GF_BAZEL_SUBSTRATE_MODE = shared-cache-backed (cache only)"
    ;;
  executor-backed)
    if [ -n "${BAZEL_REMOTE_EXECUTOR:-}" ]; then
      ok "GF_BAZEL_SUBSTRATE_MODE = executor-backed; BAZEL_REMOTE_EXECUTOR = ${BAZEL_REMOTE_EXECUTOR}"
    else
      miss "GF_BAZEL_SUBSTRATE_MODE = executor-backed but BAZEL_REMOTE_EXECUTOR is unset"
      hint "Either set BAZEL_REMOTE_EXECUTOR, or downgrade to shared-cache-backed."
      missing=$((missing + 1))
    fi
    ;;
  "")
    miss "GF_BAZEL_SUBSTRATE_MODE is unset"
    hint "Default to: export GF_BAZEL_SUBSTRATE_MODE=shared-cache-backed"
    hint "Use executor-backed only on cluster runners (refused on ubuntu-latest)."
    missing=$((missing + 1))
    ;;
  *)
    miss "GF_BAZEL_SUBSTRATE_MODE = ${mode} is not a recognized value"
    hint "Expected: shared-cache-backed | executor-backed"
    missing=$((missing + 1))
    ;;
esac

# 4. Upload posture
upload="${GF_BAZEL_REMOTE_UPLOAD:-}"
case "${upload}" in
  "" | false)
    ok "GF_BAZEL_REMOTE_UPLOAD = false (read-only; correct for PRs)"
    ;;
  true)
    warn "GF_BAZEL_REMOTE_UPLOAD = true (only set this on trusted default-branch / operator lanes)"
    ;;
  *)
    warn "GF_BAZEL_REMOTE_UPLOAD = ${upload} (expected true|false)"
    ;;
esac

# 5. .bazelrc.flywheel sanity
if [ -f .bazelrc.flywheel ]; then
  if grep -qE '^[^#]*--(remote_cache|remote_executor)=' .bazelrc.flywheel; then
    miss ".bazelrc.flywheel hard-codes a remote endpoint (must come from env, not rc files)"
    missing=$((missing + 1))
  else
    ok ".bazelrc.flywheel is endpoint-free"
  fi
else
  warn ".bazelrc.flywheel missing — wrapper requires it for safe-behavior flags"
fi

# 6. Reachability probe (best-effort; only when cache URL is well-formed)
if [ -n "${BAZEL_REMOTE_CACHE:-}" ] && command -v nc >/dev/null 2>&1; then
  hostport="$(echo "${BAZEL_REMOTE_CACHE}" | sed -E 's|^[a-z]+://||; s|/.*$||')"
  host="${hostport%:*}"
  port="${hostport##*:}"
  if [ -n "${host}" ] && [ -n "${port}" ] && [ "${host}" != "${port}" ]; then
    if nc -z -w 2 "${host}" "${port}" 2>/dev/null; then
      ok "Reachability: ${host}:${port} responds"
    else
      warn "Reachability: ${host}:${port} did NOT respond within 2s (off-cluster? VPN?)"
    fi
  fi
fi

echo ""
if [ "${missing}" -eq 0 ]; then
  echo "Result: READY. Run \`just flywheel-info\` to verify cache attachment."
  exit 0
fi

echo "Result: ${missing} blocker(s). Fix them and re-run \`just flywheel-doctor\`."
echo "Reference: docs/CI-SCHEMA.md §5, AGENTS.md 'Flywheel Binding'."
exit 1
