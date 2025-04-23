// A simple test script to validate our path replacement logic

const REPO_NAME = 'portfolio-1';

function testReplacements() {
  const testCases = [
    { input: 'href="/_next/static/css/style.css"', expected: `href="/${REPO_NAME}/_next/static/css/style.css"` },
    { input: 'src="/_next/static/chunks/main.js"', expected: `src="/${REPO_NAME}/_next/static/chunks/main.js"` },
    { input: 'href="/assets/image.png"', expected: `href="/${REPO_NAME}/assets/image.png"` },
    { input: 'href="/"', expected: `href="/${REPO_NAME}/"` },
    { input: `href="/${REPO_NAME}/_next/static/css/style.css"`, expected: `href="/${REPO_NAME}/_next/static/css/style.css"` }
  ];

  console.log("Testing path replacement logic:");
  console.log("-".repeat(50));

  for (const test of testCases) {
    // Escape dashes in repo name for regex
    const escapedRepoName = REPO_NAME.replace(/-/g, '\\-');
    
    // Apply the replacements
    let result = test.input;
    
    // First replacement set - specific patterns
    result = result.replace(/href="\/_next\//g, `href="/${REPO_NAME}/_next/`);
    result = result.replace(/src="\/_next\//g, `src="/${REPO_NAME}/_next/`);
    result = result.replace(/href="\/assets\//g, `href="/${REPO_NAME}/assets/`);
    result = result.replace(/src="\/assets\//g, `src="/${REPO_NAME}/assets/`);
    
    // Second replacement set - catch-all patterns
    result = result.replace(/href="\//g, `href="/${REPO_NAME}/`);
    result = result.replace(/src="\//g, `src="/${REPO_NAME}/`);
    
    // Fix double prefixes
    const doublePrefix = `/${REPO_NAME}/${REPO_NAME}/`;
    const singlePrefix = `/${REPO_NAME}/`;
    result = result.replace(new RegExp(doublePrefix, 'g'), singlePrefix);
    
    const passed = result === test.expected;
    
    console.log(`Input:    ${test.input}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Result:   ${result}`);
    console.log(`Test ${passed ? 'PASSED' : 'FAILED'}`);
    console.log("-".repeat(50));
  }
}

testReplacements(); 