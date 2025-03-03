const fs = require('fs');
const path = require('path');

const projectDir = 'your-project';
const subDirs = ['css', 'js', 'html', 'server'];
const files = ['index.html', 'style.css', 'scripts.js', 'server.json'];

if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir);
}

subDirs.forEach(dir => {
  const dirPath = path.join(projectDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
});

console.log('Project structure initialized.');