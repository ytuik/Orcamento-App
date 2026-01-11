#!/bin/bash

echo "🚀 Starting development environment..."

# Load environment variables
export $(cat .env.dev | xargs)

# Build and start services
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up -d

echo "✅ Development environment is running!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "🗄️ Database: localhost:5433"
echo "📊 pgAdmin: http://localhost:5050"