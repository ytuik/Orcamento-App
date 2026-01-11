#!/bin/bash
# backup-db.sh
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

docker-compose -f docker-compose.prod.yml exec db pg_dumpall -U ${DB_USER} | gzip > ${BACKUP_DIR}/backup_${DATE}.sql.gz

# Keep only last 7 days
find ${BACKUP_DIR} -name "*.sql.gz" -mtime +7 -delete