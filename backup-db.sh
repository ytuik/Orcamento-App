#!/bin/bash
# backup-db.sh
set -e
source "$(dirname "$0")/.env.prod" 2>/dev/null || export $(grep -v '^#' .env.prod | xargs)

BACKUP_DIR="./docker/production/postgres-backup"
DATE=$(date +%Y%m%d_%H%M%S)

docker compose -f docker-compose.prod.yml exec -T db \
    pg_dumpall -U "${DB_USER}" | gzip > "${BACKUP_DIR}/backup_${DATE}.sql.gz"

find "${BACKUP_DIR}" -name "*.sql.gz" -mtime +7 -delete
echo "Backup concluído: backup_${DATE}.sql.gz"