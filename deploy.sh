#!/bin/bash
echo "🚀 Deploying ClearPro Aligner to Render..."

# Check if all files exist
required_files=("package.json" "server.js" "render.yaml" "index.html" "portal.html" "admin-dashboard.html")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing file: $file"
        exit 1
    fi
done

echo "✅ All files present"
echo "📦 Ready for deployment to Render!"
