#!/usr/bin/env bash
# Per-site rebrand pass for sister sites spawned from tinyland-inc/site.scaffold.
#
# Usage: scripts/rebrand.sh <site.example.com>
#
# Substitutes scaffold placeholder strings with the new site identity:
#   site.scaffold        -> <site.example.com>
#   site_scaffold        -> <site_example_com>   (underscored, for MODULE.bazel)
#   bazel-site (cache)   -> bazel-<site>          (slug)
#
# Idempotent: running twice is a no-op once strings have been replaced.

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <site.example.com>" >&2
  exit 64
fi

DOMAIN=$1
UNDERSCORED=$(echo "$DOMAIN" | tr '.-' '_')
SLUG=$(echo "$DOMAIN" | cut -d. -f1)

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

if ! grep -rq 'site\.scaffold' --include='*.json' --include='*.md' --include='*.ts' --include='*.js' --include='*.bazel' --include='Justfile' --include='.envrc' --include='.bazelrc' .; then
  echo "no scaffold placeholders detected — already rebranded?" >&2
  exit 0
fi

# Text substitutions across config, doc, and source files.
find . -type f \( \
    -name '*.md' -o -name '*.json' -o -name '*.ts' -o -name '*.js' \
    -o -name '*.bazel' -o -name '.bazelrc' -o -name '.envrc' \
    -o -name 'Justfile' -o -name '*.toml' -o -name '*.svelte' \
    -o -name '*.html' -o -name '*.css' -o -name '*.yml' \
    -o -name '*.yaml' -o -name 'flake.nix' \
  \) \
  -not -path './node_modules/*' -not -path './.git/*' -not -path './build/*' \
  -not -path './.svelte-kit/*' -not -path './pnpm-lock.yaml' \
  -not -path './MODULE.bazel.lock' -not -path './flake.lock' \
  -print0 | xargs -0 sed -i.bak \
    -e "s|site\\.scaffold|${DOMAIN}|g" \
    -e "s|site_scaffold|${UNDERSCORED}|g" \
    -e "s|bazel-site|bazel-${SLUG}|g"

# Clean up sed -i.bak backup files
find . -type f -name '*.bak' -not -path './node_modules/*' -not -path './.git/*' -delete

# ─────────────────────────────────────────────────────────────────────
# CI-SCHEMA (docs/CI-SCHEMA.md) artifacts. All steps are idempotent.
# ─────────────────────────────────────────────────────────────────────

# package.json .name (jq-driven for safety)
if command -v jq >/dev/null 2>&1 && [[ -f package.json ]]; then
  jq --arg slug "${SLUG}" '.name = $slug' package.json > package.json.tmp \
    && mv package.json.tmp package.json
fi

# .github/lanes.json — rewrite spoke.name + spoke.domain via jq
if command -v jq >/dev/null 2>&1 && [[ -f .github/lanes.json ]]; then
  jq --arg slug "${SLUG}" --arg domain "${DOMAIN}" \
    '.spoke.name = $slug | .spoke.domain = $domain' \
    .github/lanes.json > .github/lanes.json.tmp \
    && mv .github/lanes.json.tmp .github/lanes.json
fi

# tofu/spoke.auto.tfvars — rewrite spoke_slug + brand_domain (sed; preserves comments)
if [[ -f tofu/spoke.auto.tfvars ]]; then
  sed -i.bak \
    -e "s|^spoke_slug[[:space:]]*=.*|spoke_slug              = \"${SLUG}\"|" \
    -e "s|^brand_domain[[:space:]]*=.*|brand_domain            = \"${DOMAIN}\"|" \
    tofu/spoke.auto.tfvars
  rm -f tofu/spoke.auto.tfvars.bak
fi

# tofu/backend.tf — rewrite spoke-namespaced state key
if [[ -f tofu/backend.tf ]]; then
  sed -i.bak "s|spokes/site-scaffold/|spokes/${SLUG}/|g" tofu/backend.tf
  rm -f tofu/backend.tf.bak
fi

echo "rebranded scaffold to ${DOMAIN}"
echo "  underscored: ${UNDERSCORED}"
echo "  bazel cache: bazel-${SLUG}"
echo "  lanes.json spoke: ${SLUG} / ${DOMAIN}"
[[ -f tofu/backend.tf ]] && echo "  tofu state key:  spokes/${SLUG}/terraform.tfstate" || true
echo
echo "next:"
echo "  1. Review git diff"
echo "  2. Update README.md and AGENTS.md with brand purpose"
echo "  3. Update src/routes/+page.svelte with the landing page"
echo "  4. gh repo edit --description '...' --homepage 'https://${DOMAIN}'"
echo "  5. just setup && just check && just build"
echo "  6. just lanes-validate && just conformance"
