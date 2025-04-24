// Script to fix paths in HTML files directly for GitHub Pages deployment
const fs = require('fs');
const path = require('path');

// Repository name is just a dash
const REPO_NAME = '-';
console.log(`Running fix script with repository name: '${REPO_NAME}'`);

// Find HTML files
function findFiles(dir, extension, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, extension, fileList);
    } else if (path.extname(file) === extension) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Process HTML files
const htmlFiles = findFiles('./out', '.html');
console.log(`Found ${htmlFiles.length} HTML files to process`);

htmlFiles.forEach(filePath => {
  console.log(`Processing ${filePath}`);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace paths
    content = content.replace(/href="\//g, `href="/${REPO_NAME}/`);
    content = content.replace(/src="\//g, `src="/${REPO_NAME}/`);
    
    // Fix double repository paths
    content = content.replace(new RegExp(`href="/${REPO_NAME}/${REPO_NAME}/`, 'g'), `href="/${REPO_NAME}/`);
    content = content.replace(new RegExp(`src="/${REPO_NAME}/${REPO_NAME}/`, 'g'), `src="/${REPO_NAME}/`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
});

// Process CSS files
const cssFiles = findFiles('./out', '.css');
console.log(`Found ${cssFiles.length} CSS files to process`);

cssFiles.forEach(filePath => {
  console.log(`Processing CSS file ${filePath}`);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace CSS URL paths
    content = content.replace(/url\(\//g, `url(/${REPO_NAME}/`);
    
    // Fix double paths
    content = content.replace(new RegExp(`url\\(/${REPO_NAME}/${REPO_NAME}/`, 'g'), `url(/${REPO_NAME}/`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed CSS file ${filePath}`);
  } catch (err) {
    console.error(`Error processing CSS file ${filePath}:`, err);
  }
});

// Create .nojekyll file
fs.writeFileSync('./out/.nojekyll', '');
console.log('Created .nojekyll file');

console.log('Path fixing completed successfully!'); 