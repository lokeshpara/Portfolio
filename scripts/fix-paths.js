const fs = require('fs');
const path = require('path');

// Repo name for GitHub Pages - special case for dash-only name
const REPO_NAME = '-';

// Helper function to add a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to recursively go through all HTML files in the out directory
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (path.extname(file) === '.html') {
      await fixHtmlFile(fullPath);
      // Add a small delay between file operations
      await sleep(100);
    }
  }
}

// Function to fix paths in HTML files
async function fixHtmlFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content;
  
  try {
    content = fs.readFileSync(filePath, 'utf8');
    
    // Escape special characters in repo name for regex
    const escapedRepoName = REPO_NAME.replace(/-/g, '\\-');
    
    // First replacement set - specific patterns
    content = content.replace(/href="\/_next\//g, `href="/${REPO_NAME}/_next/`);
    content = content.replace(/src="\/_next\//g, `src="/${REPO_NAME}/_next/`);
    content = content.replace(/href="\/assets\//g, `href="/${REPO_NAME}/assets/`);
    content = content.replace(/src="\/assets\//g, `src="/${REPO_NAME}/assets/`);
    
    // Special handling for root path since our repo is just a dash
    content = content.replace(/href="\//g, (match, offset, string) => {
      // Don't replace if it's already prefixed with repo name
      // Check if this is part of a repository name path we already fixed
      const prevChars = string.substring(Math.max(0, offset - 20), offset);
      if (prevChars.includes(`/${REPO_NAME}/`)) {
        return match;
      }
      return `href="/${REPO_NAME}/`;
    });
    
    content = content.replace(/src="\//g, (match, offset, string) => {
      // Don't replace if it's already prefixed with repo name
      const prevChars = string.substring(Math.max(0, offset - 20), offset);
      if (prevChars.includes(`/${REPO_NAME}/`)) {
        return match;
      }
      return `src="/${REPO_NAME}/`;
    });
    
    // Fix double prefixes that might have been created
    const doublePrefix = `/${REPO_NAME}/${REPO_NAME}/`;
    const singlePrefix = `/${REPO_NAME}/`;
    content = content.replace(new RegExp(doublePrefix, 'g'), singlePrefix);
    
    // Try to write with retries
    let maxRetries = 5;
    let retryCount = 0;
    let success = false;
    
    while (!success && retryCount < maxRetries) {
      try {
        fs.writeFileSync(filePath, content);
        success = true;
        console.log(`Fixed: ${filePath}`);
      } catch (err) {
        if (err.code === 'EBUSY') {
          retryCount++;
          console.log(`File busy, retrying (${retryCount}/${maxRetries}): ${filePath}`);
          await sleep(1000); // Wait a second before trying again
        } else {
          throw err; // Re-throw if it's not a busy error
        }
      }
    }
    
    if (!success) {
      console.error(`Failed to write to ${filePath} after ${maxRetries} attempts`);
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}: ${err.message}`);
  }
}

// Main execution
(async () => {
  console.log('Starting path fixing process for GitHub Pages...');
  try {
    await processDirectory(path.join(process.cwd(), 'out'));
    console.log('Completed fixing paths!');
  } catch (err) {
    console.error('Error during path fixing:', err);
    process.exit(1);
  }
})(); 