const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Define paths
const outDir = path.join(__dirname, '..', 'out');

// Function to log asset paths in HTML files
function checkHtmlFiles(dir) {
  console.log(`\n🔍 Checking HTML files in ${dir}...`);
  
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.html'));
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    console.log(`\n📄 Analyzing ${filePath}`);
    
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      const $ = cheerio.load(html);
      
      // Check scripts
      console.log('  Script sources:');
      $('script[src]').each((i, el) => {
        console.log(`    - ${$(el).attr('src')}`);
      });
      
      // Check stylesheets
      console.log('  Stylesheet sources:');
      $('link[rel="stylesheet"]').each((i, el) => {
        console.log(`    - ${$(el).attr('href')}`);
      });
      
      // Check images
      console.log('  Image sources:');
      $('img[src]').each((i, el) => {
        console.log(`    - ${$(el).attr('src')}`);
      });
      
    } catch (error) {
      console.error(`⚠️ Error analyzing ${filePath}:`, error);
    }
  });
}

// Main function
function main() {
  console.log('🚀 Starting deployment debug script...');
  
  // Check if out directory exists
  if (!fs.existsSync(outDir)) {
    console.error('❌ Error: out directory does not exist. Please run a build first.');
    return;
  }
  
  console.log('✅ out directory exists');
  
  // Check if .nojekyll exists
  const nojekyllPath = path.join(outDir, '.nojekyll');
  if (fs.existsSync(nojekyllPath)) {
    console.log('✅ .nojekyll file exists');
  } else {
    console.log('⚠️ Warning: .nojekyll file does not exist. GitHub Pages might process your site with Jekyll.');
  }
  
  // Check HTML files
  checkHtmlFiles(outDir);
  
  // Check 404 directory if it exists
  const notFoundDir = path.join(outDir, '404');
  if (fs.existsSync(notFoundDir)) {
    checkHtmlFiles(notFoundDir);
  }
  
  console.log('\n🏁 Debug script completed');
}

main(); 