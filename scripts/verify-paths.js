// Script to verify that paths are correctly set in HTML files
const fs = require('fs');
const path = require('path');

// Repo name for GitHub Pages - special case for dash-only name
const REPO_NAME = '-';

// Function to recursively check HTML files
function checkDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      checkDirectory(fullPath);
    } else if (path.extname(file) === '.html') {
      checkHtmlFile(fullPath);
    }
  }
}

// Function to check paths in HTML files
function checkHtmlFile(filePath) {
  console.log(`Checking: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if _next paths have repository prefix
  const nextPathPattern = new RegExp(`href="\\/${REPO_NAME}\\/_next\\/`, 'g');
  const hasCorrectNextPaths = nextPathPattern.test(content);
  
  // Check if there are any unprefixed _next paths (which would be wrong)
  const wrongNextPathPattern = /href="\/_next\//g;
  const hasWrongNextPaths = wrongNextPathPattern.test(content);
  
  if (!hasCorrectNextPaths || hasWrongNextPaths) {
    console.log(`WARNING: ${filePath} may have incorrect paths`);
    if (!hasCorrectNextPaths) {
      console.log(`  - Missing correct prefix "/${REPO_NAME}/_next/" in paths`);
    }
    if (hasWrongNextPaths) {
      console.log(`  - Found unprefixed "/_next/" paths that will 404`);
    }
    
    // Display a sample of the content
    const firstHref = content.indexOf('href="');
    if (firstHref !== -1) {
      const sample = content.substring(firstHref, firstHref + 50);
      console.log(`  - Sample: ${sample}...`);
    }
  } else {
    console.log(`✓ ${filePath} has correct paths`);
  }
}

console.log('Verifying paths in HTML files...');
const outDir = path.join(process.cwd(), 'out');

if (fs.existsSync(outDir)) {
  checkDirectory(outDir);
  console.log('Verification complete!');
} else {
  console.error(`Output directory "${outDir}" not found!`);
  process.exit(1);
} 