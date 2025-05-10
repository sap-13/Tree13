#!/bin/bash

# Create a temp directory for the build
mkdir -p tmp-gh-pages

# Copy the built site to the temp directory 
cp -R my-blog/_site/* tmp-gh-pages/

# Create or update the CNAME file if you have a custom domain
# echo "yourdomain.com" > tmp-gh-pages/CNAME

# Create a .nojekyll file to disable Jekyll processing
touch tmp-gh-pages/.nojekyll

# Find all HTML files and add the Tree13 prefix to internal links and styles
find tmp-gh-pages -name "*.html" -exec sed -i '' 's|href="/|href="/Tree13/|g' {} \;
find tmp-gh-pages -name "*.html" -exec sed -i '' 's|src="/|src="/Tree13/|g' {} \;

# Find the searchIndex.json file and fix the URLs
if [ -f tmp-gh-pages/searchIndex.json ]; then
  sed -i '' 's|"url":"/|"url":"/Tree13/|g' tmp-gh-pages/searchIndex.json
fi

# Initialize git in the temp directory
cd tmp-gh-pages
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch
git remote add origin https://github.com/sap-13/Tree13.git
git push -f origin master:gh-pages

# Clean up
cd ..
rm -rf tmp-gh-pages

echo "Deployed to GitHub Pages successfully!" 