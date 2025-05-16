#!/bin/bash

# Script to rebuild and serve the Eleventy blog

# Define the workspace root and project directory
WORKSPACE_ROOT="/Users/School/Desktop/Tree13"
PROJECT_DIR="my-blog"
OUTPUT_DIR="_site"

# Navigate to the workspace root to ensure a consistent starting point
cd "$WORKSPACE_ROOT" || { echo "Error: Could not navigate to workspace root: $WORKSPACE_ROOT"; exit 1; }

echo "Current directory: $(pwd)"

# Navigate to the project directory
echo "Navigating to project directory: $PROJECT_DIR"
cd "$PROJECT_DIR" || { echo "Error: Could not navigate to project directory: $PROJECT_DIR"; exit 1; }

echo "Current directory: $(pwd)"

# Run the Eleventy build
echo "Building Eleventy site..."
npx @11ty/eleventy || { echo "Error: Eleventy build failed."; exit 1; }
echo "Eleventy build complete."

# Navigate to the output directory
echo "Navigating to output directory: $OUTPUT_DIR"
cd "$OUTPUT_DIR" || { echo "Error: Could not navigate to output directory: $OUTPUT_DIR"; exit 1; }

echo "Current directory: $(pwd)"

# Serve the site
echo "Serving site from $OUTPUT_DIR..."
echo "Access it at http://localhost:PORT (npx serve will specify the port)"
echo "Press Ctrl+C to stop the server."
npx serve

echo "Server stopped." 