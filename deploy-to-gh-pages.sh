#!/bin/bash

# Script to deploy the site to GitHub Pages

# Define the workspace root and project directory
WORKSPACE_ROOT="/Users/School/Desktop/Tree13"
PROJECT_DIR="my-blog"
OUTPUT_DIR="_site"
TEMP_DIR="tmp-gh-pages"

# Navigate to the workspace root to ensure a consistent starting point
cd "$WORKSPACE_ROOT" || { echo "Error: Could not navigate to workspace root: $WORKSPACE_ROOT"; exit 1; }
echo "Working directory: $(pwd)"

# Run the build to make sure we have the latest version
echo "Building the site..."
cd "$PROJECT_DIR" || { echo "Error: Could not navigate to project directory: $PROJECT_DIR"; exit 1; }
npx @11ty/eleventy || { echo "Error: Eleventy build failed."; exit 1; }
echo "Build complete."

# Go back to workspace root
cd "$WORKSPACE_ROOT" || { echo "Error: Could not navigate to workspace root: $WORKSPACE_ROOT"; exit 1; }

# Create a temp directory for the build
echo "Creating temporary directory..."
rm -rf "$TEMP_DIR"  # Clean up any existing temp dir
mkdir -p "$TEMP_DIR"

# Copy the built site to the temp directory
echo "Copying built site to temporary directory..."
cp -R "$PROJECT_DIR/$OUTPUT_DIR"/* "$TEMP_DIR"/

# Create or update the CNAME file if you have a custom domain
# echo "yourdomain.com" > tmp-gh-pages/CNAME

# Create a .nojekyll file to disable Jekyll processing
touch "$TEMP_DIR"/.nojekyll

# Find all HTML files and add the Tree13 prefix to internal links and styles
echo "Adding Tree13 prefix to URLs..."
find "$TEMP_DIR" -name "*.html" -exec sed -i '' 's|href="/|href="/Tree13/|g' {} \;
find "$TEMP_DIR" -name "*.html" -exec sed -i '' 's|src="/|src="/Tree13/|g' {} \;

# Fix links in search results (add the specific pattern for post URLs in search page)
echo "Fixing URLs in search results..."
find "$TEMP_DIR" -name "*.html" -exec sed -i '' 's|href="\\/blog\\/|href="/Tree13/blog/|g' {} \;
find "$TEMP_DIR" -name "*.html" -exec sed -i '' 's|href="\/blog\/|href="/Tree13/blog/|g' {} \;
find "$TEMP_DIR" -name "*.html" -exec sed -i '' 's|post\.url || "#"|post.url.includes("/Tree13/") ? post.url : "/Tree13" + post.url || "#"|g' {} \;

# Find the searchIndex.json file and fix the URLs
if [ -f "$TEMP_DIR/searchIndex.json" ]; then
  echo "Updating searchIndex.json URLs..."
  sed -i '' 's|"url":"/|"url":"/Tree13/|g' "$TEMP_DIR/searchIndex.json"
fi

# Initialize git in the temp directory
echo "Initializing git repository in temporary directory..."
cd "$TEMP_DIR" || { echo "Error: Could not navigate to temp directory: $TEMP_DIR"; exit 1; }
git init
git add .
git commit -m "Deploy to GitHub Pages - $(date)"

# Force push to the gh-pages branch
echo "Pushing to GitHub Pages..."
git remote add origin https://github.com/sap-13/Tree13.git
git push -f origin master:gh-pages

# Clean up
echo "Cleaning up..."
cd "$WORKSPACE_ROOT" || { echo "Error: Could not navigate to workspace root: $WORKSPACE_ROOT"; exit 1; }
rm -rf "$TEMP_DIR"

echo "Deployed to GitHub Pages successfully!" 