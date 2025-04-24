// Script to fix paths in HTML files for GitHub Pages deployment
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Repository name is just a dash
const REPO_NAME = '-';

console.log(`Fixing paths for GitHub Pages deployment with base path: /${REPO_NAME}`);

// Find all HTML files in the out directory
const htmlFiles = glob.sync('out/**/*.html');
console.log(`Found ${htmlFiles.length} HTML files to process`);

// Process each HTML file
htmlFiles.forEach(filePath => {
  console.log(`Processing ${filePath}`);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace absolute paths with repository-prefixed paths
    content = content.replace(/href="\//g, `href="/${REPO_NAME}/`);
    content = content.replace(/src="\//g, `src="/${REPO_NAME}/`);
    
    // Fix double repository name if present
    content = content.replace(new RegExp(`/${REPO_NAME}/${REPO_NAME}/`, 'g'), `/${REPO_NAME}/`);
    
    // Write the fixed content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed paths in ${filePath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
});

// Find and process any CSS files that might contain absolute URLs
const cssFiles = glob.sync('out/**/*.css');
console.log(`Found ${cssFiles.length} CSS files to process`);

cssFiles.forEach(filePath => {
  console.log(`Processing CSS file ${filePath}`);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace CSS URL paths
    content = content.replace(/url\(\//g, `url(/${REPO_NAME}/`);
    
    // Fix double paths
    content = content.replace(new RegExp(`/${REPO_NAME}/${REPO_NAME}/`, 'g'), `/${REPO_NAME}/`);
    
    // Write the fixed content back
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed paths in CSS file ${filePath}`);
  } catch (err) {
    console.error(`Error processing CSS file ${filePath}:`, err);
  }
});

console.log('Path fixing completed successfully!'); 