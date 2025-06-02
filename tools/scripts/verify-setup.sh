#!/bin/bash
# tools/scripts/verify-setup.sh

echo "🔍 Verifying project setup..."

# Check directory structure
echo "📁 Checking directory structure..."
for dir in apps services shared tools; do
  if [ -d "$dir" ]; then
    echo "✅ $dir/ exists"
  else
    echo "❌ $dir/ missing"
  fi
done

# Check Yarn version
echo "📦 Checking Yarn version..."
yarn --version

# Check if workspaces are detected
echo "🔧 Checking workspaces..."
yarn workspaces list

# Check TypeScript compilation
echo "📝 Checking TypeScript..."
if yarn type-check > /dev/null 2>&1; then
  echo "✅ TypeScript configuration valid"
else
  echo "⚠️  TypeScript issues detected (normal if no packages created yet)"
fi

# Check linting
echo "🎨 Checking ESLint..."
if yarn lint > /dev/null 2>&1; then
  echo "✅ ESLint configuration valid"
else
  echo "⚠️  ESLint issues detected (normal if no packages created yet)"
fi

echo "✅ Setup verification complete!"
echo ""
echo "Next steps:"
echo "1. Create your first shared package"
echo "2. Set up the API Gateway service"
echo "3. Create the frontend app"