#!/usr/bin/env bash
set -e

echo "🚀 Starting dev server..."

if [ ! -d "node_modules" ]; then
  echo "📦 First time? Installing dependencies..."
  npm install
fi

npm run dev
