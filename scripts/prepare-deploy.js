// A comprehensive script to prepare the deployment to GitHub Pages
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get repo name from environment variable or use default
const REPO_NAME = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\//, '') || '-';

console.log('Starting deployment preparation...');
console.log(`Repository name: "${REPO_NAME}"`);

// Step 1: Create output directory if it doesn't exist
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  console.log('Creating output directory...');
  fs.mkdirSync(outDir, { recursive: true });
}

// Step 2: Create .nojekyll file to prevent GitHub Pages from using Jekyll
const nojekyllPath = path.join(outDir, '.nojekyll');
console.log('Creating .nojekyll file...');
fs.writeFileSync(nojekyllPath, '');
fs.copyFileSync(nojekyllPath, path.join(process.cwd(), '.nojekyll'));

// Step 3: Create a CNAME file if you have a custom domain (optional)
// const cnamePath = path.join(outDir, 'CNAME');
// console.log('Creating CNAME file...');
// fs.writeFileSync(cnamePath, 'yourdomain.com');

// Step 4: Check the index.html file
const indexPath = path.join(outDir, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('Checking index.html file...');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Log first 100 characters to debug
  console.log('Index.html starts with:', indexContent.substring(0, 100));
  
  // Manual path fix for _next paths
  console.log('Manually fixing paths in index.html...');
  indexContent = indexContent.replace(/href="\/_next\//g, `href="/${REPO_NAME}/_next/`);
  indexContent = indexContent.replace(/src="\/_next\//g, `src="/${REPO_NAME}/_next/`);
  
  // Write the fixed content back
  try {
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('Successfully fixed index.html');
  } catch (err) {
    console.error('Error writing to index.html:', err);
  }
}

// Step 5: Wait before proceeding to ensure file handles are released
console.log('Waiting for file handles to be released...');
setTimeout(() => {
  console.log('Running path fixer for all HTML files...');
  try {
    // Dynamically require the fix-paths script to run it
    require('./fix-paths.js');
    console.log('Deployment preparation complete. You can now run "npm run deploy-only"');
  } catch (error) {
    console.error('Error running fix-paths script:', error);
    process.exit(1);
  }
}, 3000); // Wait 3 seconds 