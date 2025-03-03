const fs = require('fs');
const path = require('path');

function generateHtml(MAIN) {
  const filePath = path.join('html', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');
  content += `<main>${MAIN}</main>`;
  fs.writeFileSync(filePath, content);
}

generateHtml('Hello, World!');