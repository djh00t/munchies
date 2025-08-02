# Development Scripts for Munchies

This directory contains scripts to help with development workflow.

## Available Scripts

### Setup
- `setup-dev.sh` - Initialize development environment
- `reset-db.sh` - Reset database with fresh data

### Development
- `start-dev.sh` - Start all development services
- `stop-dev.sh` - Stop all development services
- `logs.sh` - View logs from all services

### Database
- `db-migrate.sh` - Run database migrations
- `db-seed.sh` - Seed database with test data
- `db-backup.sh` - Backup database
- `db-restore.sh` - Restore database from backup

## Usage

Make scripts executable:
```bash
chmod +x scripts/*.sh
```

Run setup:
```bash
./scripts/setup-dev.sh
```
