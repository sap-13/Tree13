# Tree13

A minimalist dark-themed blog built with Eleventy and Tailwind CSS. GitHub Pages instructions below.

## GitHub Pages Configuration

To properly serve this site on GitHub Pages:

1. Go to the repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment" > "Source", select "Deploy from a branch" (not GitHub Actions)
4. Then under "Branch", select "gh-pages" and "/ (root)"
5. Click "Save"

This will ensure the site is served correctly from the gh-pages branch, which contains the properly built static files with all paths configured properly.

## Development

To run the site locally:

```bash
cd my-blog
npm install
npx @11ty/eleventy --serve
```

## Deployment

To deploy to GitHub Pages:

```bash
./deploy-to-gh-pages.sh
```

This script builds the site, processes paths for GitHub Pages hosting, and pushes to the gh-pages branch. 