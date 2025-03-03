const fs = require('fs');
const path = require('path');

function generateHtml(title) {
  const filePath = path.join('html', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');
  content += `<h1>${title}</h1>`;
  fs.writeFileSync(filePath, content);
}

generateHtml('Hello, World!');