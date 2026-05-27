#!/bin/sh
set -e

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link || true

php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
