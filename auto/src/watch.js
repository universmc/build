const chokidar = require('chokidar');

chokidar.watch(['html/index.html', 'css/style.css','js/scripts.js','md/session.md']).on('change', (filePath) => {
  console.log(`${filePath} has been changed`);
  //Lancer la fonction de génération ici.
});