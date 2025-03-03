const fs = require('fs');
const path = require('path');

function generateHtml(section) {
  const filePath = path.join('html', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');
  content += `<section>${section}</section>`;
  fs.writeFileSync(filePath, content);
}

generateHtml('content, titre');