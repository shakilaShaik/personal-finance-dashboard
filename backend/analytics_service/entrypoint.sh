#!/bin/bash
set -e

echo "🚀 Waiting for PostgreSQL to be ready..."
while ! nc -z analytics_db 5432; do
  sleep 1
done

echo "✅ PostgreSQL is up. Running Alembic migrations..."
alembic upgrade head

echo "🎉 Starting FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 5000
