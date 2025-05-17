#!/bin/bash

# Navigate to the site directory
cd "$(dirname "$0")/my-blog/_site" || exit

# Find all HTML files
echo "Fixing paths in HTML files..."
find . -name "*.html" -type f | while read -r file; do
  echo "Processing $file..."
  
  # Replace paths like /Tree13/... with /Tree13/my-blog/_site/...
  sed -i '' 's|href="/Tree13/|href="/Tree13/my-blog/_site/|g' "$file"
  sed -i '' 's|src="/Tree13/|src="/Tree13/my-blog/_site/|g' "$file"
  
  # If there are any absolute CSS paths like /static/... fix them
  sed -i '' 's|href="/static/|href="/Tree13/my-blog/_site/static/|g' "$file"
  
  # Fix any JS paths
  sed -i '' 's|src="/static/|src="/Tree13/my-blog/_site/static/|g' "$file"
done

# Fix the searchIndex.json if it exists
if [ -f "searchIndex.json" ]; then
  echo "Fixing searchIndex.json..."
  sed -i '' 's|/Tree13/|/Tree13/my-blog/_site/|g' "searchIndex.json"
fi

echo "All paths have been updated." 