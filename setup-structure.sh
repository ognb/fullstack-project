#!/bin/bash
# Run this from your project root: /Users/ganbatotgonbaatar/Workspace/fullstack-project

echo "🚀 Setting up full-stack project structure..."

# Create all directories
echo "📁 Creating directory structure..."
mkdir -p apps/web-dashboard
mkdir -p services/gateway services/auth-service services/user-service  
mkdir -p shared/types shared/utils shared/ui shared/config
mkdir -p tools/scripts tools/docker

# Create basic README files for each section
echo "📄 Creating README files..."

cat > apps/README.md << 'EOF'
# Applications

This directory contains client-side applications:

- `web-dashboard/` - Next.js admin dashboard
- `mobile-app/` - React Native app (future)
- `public-website/` - Next.js marketing site (future)
EOF

cat > services/README.md << 'EOF'
# Services

This directory contains backend microservices:

- `gateway/` - API Gateway with GraphQL Federation
- `auth-service/` - Authentication and authorization
- `user-service/` - User management
- `notification-service/` - Email/SMS notifications (future)
EOF

cat > shared/README.md << 'EOF'
# Shared Packages

This directory contains shared code used across services and apps:

- `types/` - TypeScript type definitions
- `utils/` - Common utility functions
- `ui/` - Shared React components
- `config/` - Configuration schemas
EOF

cat > tools/README.md << 'EOF'
# Tools

Development and deployment tools:

- `scripts/` - Build and utility scripts
- `docker/` - Docker configurations
- `k8s/` - Kubernetes manifests (future)
EOF

# Move verification script to correct location
if [ -f "../scripts/verify-setup.sh" ]; then
    mv ../scripts/verify-setup.sh tools/scripts/
fi

# Create a simple package.json for each shared package
echo "📦 Creating shared package.json files..."

# Shared types package
cat > shared/types/package.json << 'EOF'
{
  "name": "@project/shared-types",
  "version": "1.0.0",
  "description": "Shared TypeScript types",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
EOF

# Shared utils package  
cat > shared/utils/package.json << 'EOF'
{
  "name": "@project/shared-utils",
  "version": "1.0.0",
  "description": "Shared utility functions",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch", 
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@project/shared-types": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "📊 Current structure:"
find . -type d -not -path './node_modules*' -not -path './.git*' -not -path './.yarn*' | head -20 | sort

echo ""
echo "🔧 Next steps:"
echo "1. Run: yarn install"
echo "2. Run: bash tools/scripts/verify-setup.sh"
echo "3. Start creating your first shared package"