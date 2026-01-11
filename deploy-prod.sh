#!/bin/bash

echo "🚀 Deploying to production..."

# Load environment variables
export $(cat .env.prod | xargs)

# Stop existing containers
docker-compose -f docker-compose.prod.yml down

# Remove unused images and volumes
docker system prune -f

# Build with no cache (clean build)
docker-compose -f docker-compose.prod.yml build --no-cache

# Start services
docker-compose -f docker-compose.prod.yml up -d


echo "✅ Production deployment complete!"
echo "🌐 Application: http://your-server-ip"
echo "📊 Monitor logs: docker-compose -f docker-compose.prod.yml logs -f"