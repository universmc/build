const fs = require('fs');
const path = require('path');

function generateJSON(layout) {
  const filePath = path.join('json', 'layout.json');
  let content = fs.readFileSync(filePath, 'utf8');
  content += `[]`;
  fs.writeFileSync(filePath, content);
}

generateJSON('model, json');