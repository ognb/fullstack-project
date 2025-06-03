#!/bin/bash
# Development startup script for API Gateway

echo "🚀 Starting API Gateway in development mode..."

# Load environment variables
export $(cat .env.local | xargs)

# Start the application
yarn start:dev
