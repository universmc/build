const path = require('path');

module.exports = {
  entry: './terminal.html', // Point d'entrée de votre application
  output: {
    filename: 'main.js', // Nom du fichier de sortie
    path: path.resolve(__dirname, 'dist'), // Dossier de sortie
  },
};