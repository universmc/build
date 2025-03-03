const chokidar = require('chokidar');

chokidar.watch(['md/historique.md']).on('change', (filePath) => {
  console.log(`${filePath} has been changed`);
  //Lancer la fonction de génération ici.
});