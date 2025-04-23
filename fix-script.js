const fs = require('fs');

// Read the file
const filePath = 'src/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the fragment issue - find the line after the comment about Desktop View Fragment
content = content.replace(/\s+\/\/ Desktop View - Use a Fragment to contain both columns\s+<>\s+{\/\* Fixed Left Column \*\/}\s+<div/, 
  ' // Desktop View - Use a Fragment to contain both columns\n        <>\n          {/* Fixed Left Column */}\n          <div');

// Remove any extra closing div tags right before the Scrollable Right Column section
content = content.replace(/<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s+{\/\* Scrollable Right Column \*\/}/,
  '</div>\n          </div>\n        </div>\n\n          {/* Scrollable Right Column */}');

// Fix the closing fragment tag at the end
content = content.replace(/<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/>\s+\)}/,
  '</div>\n          </div>\n        </div>\n      </div>\n        </>\n      )}');

// Write the fixed content back to the file
fs.writeFileSync(filePath, content);

console.log('Fixed the file structure in ' + filePath); 