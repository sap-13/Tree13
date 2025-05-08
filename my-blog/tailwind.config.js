/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk,md}", // Include HTML, Nunjucks, and Markdown files
    "./.eleventy.js", // Include Eleventy config if using JS template literals
  ],
  darkMode: 'class', // Use class strategy
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // Add typography plugin
  ],
} 