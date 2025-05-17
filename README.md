# Tree13

A minimalist dark-themed blog built with Eleventy and Tailwind CSS.

## GitHub Pages Configuration

This site is configured to deploy directly from the `main` branch using GitHub Actions:

1. The site is built using Eleventy in the workflow
2. All URLs are processed to include the `/Tree13/` prefix
3. The built site is deployed using GitHub Pages

GitHub Pages Settings:
- Go to your repository settings on GitHub
- Navigate to "Pages" in the sidebar
- Under "Build and deployment" > "Source", select "GitHub Actions"
- This will use the workflow defined in `.github/workflows/static.yml`

## Development

To run the site locally:

```bash
cd my-blog
npm install
npx @11ty/eleventy --serve
```

## Deployment

Just push your changes to the `main` branch and the GitHub Actions workflow will automatically build and deploy the site to GitHub Pages.

The workflow:
1. Builds the site using Eleventy
2. Processes paths for GitHub Pages hosting
3. Deploys to GitHub Pages without using a separate gh-pages branch 