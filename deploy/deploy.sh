#!/usr/bin/env bash
# Деплой trofimoff.tdistina.ru: сборка из исходников на сервере.
#
# Приводит рабочую копию в точное соответствие origin/<branch>, ставит
# зависимости, собирает Vite-проект в dist/ и перезагружает nginx.
# nginx отдаёт статику из /var/www/trofimoff-promo/dist.
#
#   sudo bash /var/www/trofimoff-promo/deploy/deploy.sh
#
set -euo pipefail

DIR="/var/www/trofimoff-promo"
BRANCH="${1:-main}"
OWNER="www-data:www-data"

echo "==> Deploy $DIR  (branch: $BRANCH)"
cd "$DIR"

echo "==> Fetch + reset to origin/$BRANCH"
git fetch --prune origin
git reset --hard "origin/$BRANCH"
git clean -fd -e node_modules

echo "==> pnpm install (frozen lockfile)"
corepack enable pnpm >/dev/null 2>&1 || true
pnpm install --frozen-lockfile

echo "==> Build"
pnpm build

echo "==> Права"
chown -R "$OWNER" "$DIR/dist"

echo "==> Проверка и перезагрузка nginx"
if nginx -t; then
  systemctl reload nginx
  echo "==> nginx reloaded"
else
  echo "!! nginx -t FAILED — reload пропущен" >&2
  exit 1
fi

echo "==> Готово. Коммит: $(git rev-parse --short HEAD)"
