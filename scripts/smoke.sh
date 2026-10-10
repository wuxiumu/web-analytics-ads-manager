#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
fail(){ echo "✗ $1" >&2; exit 1; }; ok(){ echo "✓ $1"; }
[[ -f package.json && -f vite.config.ts ]] || fail "缺少 Vite 入口"
[[ -f .env.example ]] || fail "缺少 .env.example"
ok "核心文件齐全"
[[ -d node_modules ]] || npm install --no-fund --no-audit
npm run build
ok "vite build 通过"
echo ""; echo "smoke: ok"
