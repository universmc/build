const { ipcRenderer } = require('electron');
const terminal = new Terminal();
terminal.open(document.getElementById('terminal'));

terminal.onData((data) => {
  ipcRenderer.send('terminal-input', data); // Envoyer les données saisies au backend
});

ipcRenderer.on('terminal-output', (data) => {
  terminal.write(data); // Afficher les données reçues du backend
});