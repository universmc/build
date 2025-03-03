const fs = require('fs');
const path = require('path');

function generateHtml(title) {
  const filePath = path.join('html', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');
  content += `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>base</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <script src="scripts.js"></script>
</body>
</html>
  `;
  fs.writeFileSync(filePath, content);
}

generateHtml('Hello, World!');