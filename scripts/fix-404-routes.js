const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const indexFile = path.join(outDir, 'index.html');
const notFoundFile = path.join(outDir, '404.html');

// Function to read a file and return its contents
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Function to write a file
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Successfully updated ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  console.log('🔧 Starting 404 route fix script...');
  
  // Read the index.html file
  const indexContent = readFile(indexFile);
  if (!indexContent) return;
  
  // Read the 404.html file
  const notFoundContent = readFile(notFoundFile);
  if (!notFoundContent) return;
  
  // Create a modified 404.html with redirect script
  const redirectScript = `
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  // MIT License
  // https://github.com/rafgraph/spa-github-pages
  // This script takes the current url and converts the path and query
  // string into just a query string, and then redirects the browser
  // to the new url with only a query string and hash fragment.
  var pathSegmentsToKeep = 1; // Keep the first segment for the repo name
  
  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
    l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
</script>
`;
  
  // Find the position to inject the script (just after the <head> tag)
  const headEndPos = notFoundContent.indexOf('</head>');
  if (headEndPos === -1) {
    console.error('❌ Could not find </head> in 404.html');
    return;
  }
  
  // Inject the redirect script
  const modifiedNotFoundContent = 
    notFoundContent.slice(0, headEndPos) + 
    redirectScript + 
    notFoundContent.slice(headEndPos);
  
  // Write the modified 404.html
  if (writeFile(notFoundFile, modifiedNotFoundContent)) {
    console.log('✅ Added redirect script to 404.html');
  } else {
    console.error('❌ Failed to update 404.html');
  }
  
  // Add SPA handling script to index.html
  const indexSpaScript = `
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  // This script checks to see if a redirect is present in the query string,
  // converts it back into the correct url and adds it to the browser's history.
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
`;
  
  // Find the position to inject the script
  const indexHeadEndPos = indexContent.indexOf('</head>');
  if (indexHeadEndPos === -1) {
    console.log('⚠️ Could not find </head> in index.html, skipping index.html update');
    return;
  }
  
  // Check if the script is already there (to avoid duplication)
  if (indexContent.includes('Single Page Apps for GitHub Pages')) {
    console.log('✅ SPA routing script already exists in index.html');
  } else {
    // Inject the SPA script
    const modifiedIndexContent = 
      indexContent.slice(0, indexHeadEndPos) + 
      indexSpaScript + 
      indexContent.slice(indexHeadEndPos);
    
    // Write the modified index.html
    if (writeFile(indexFile, modifiedIndexContent)) {
      console.log('✅ Added SPA handling script to index.html');
    } else {
      console.error('❌ Failed to update index.html');
    }
  }
  
  console.log('🏁 404 route fix script completed');
}

main(); 