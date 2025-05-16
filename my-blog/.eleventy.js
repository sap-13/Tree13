const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const Nunjucks = require("nunjucks");

module.exports = function(eleventyConfig) {

  // === Plugins ===
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // === Passthrough Copy ===
  // Copy static assets to the output directory
  eleventyConfig.addPassthroughCopy("src/static"); // For images, fonts etc.
  
  // Add a .nojekyll file
  eleventyConfig.addPassthroughCopy({
    "./.nojekyll": "./.nojekyll"
  });

  // === Custom Filters ===
  // Date formatting
  eleventyConfig.addFilter("date", function(date, format) {
    const jsDate = new Date(date);
    
    if (format === "YYYY-MM-DD") {
      return jsDate.toISOString().slice(0, 10);
    }
    
    if (format === "MMMM D, YYYY") {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return jsDate.toLocaleDateString('en-US', options);
    }
    
    return jsDate.toISOString();
  });

  // === Markdown Processing ===
  // Use markdown-it with HTML enabled
  const md = new markdownIt({
    html: true,
  });
  eleventyConfig.setLibrary("md", md);

  // === Nunjucks Configuration ===
  // Set up Nunjucks environment
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes") // Specify template location
  );
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  // === Filter to add pathPrefix to URLs ===
  eleventyConfig.addFilter("url", function(url) {
    if (url.startsWith("/")) {
      return "/Tree13" + url;
    }
    return url;
  });

  // === Watch Targets ===
  // Watch Tailwind config and input CSS for changes
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./src/_includes/css/input.css");

  // === Directory Configuration ===
  return {
    pathPrefix: "/Tree13/", // Set base path for GitHub Pages
    dir: {
      input: "src",          // Source files directory
      includes: "_includes",  // Nunjucks partials directory
      layouts: "_layouts",   // Nunjucks layouts directory
      data: "_data",        // Global data files directory
      output: "_site"         // Output directory (default)
    },
    markdownTemplateEngine: "njk", // Process markdown files with Nunjucks
    htmlTemplateEngine: "njk",     // Process HTML files with Nunjucks
    templateFormats: ["md", "njk", "html"] // Files Eleventy will process
  };
}; 