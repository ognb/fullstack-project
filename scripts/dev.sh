#!/bin/bash
# Development startup script for User Service

echo "👤 Starting User Service in development mode..."

# Load environment variables
export $(cat .env.local | xargs)

# Start the application
yarn start:dev
