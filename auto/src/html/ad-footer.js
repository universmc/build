const fs = require('fs');
const path = require('path');

function generateHtml(FOOTER) {
  const filePath = path.join('html', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');
  content += `
  <script src="scripts.js"></script>
  <footer>${FOOTER}</footer>
  </body>
  </html>
  `;
  fs.writeFileSync(filePath, content);
}

generateHtml('Hello, World!');