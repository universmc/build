const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve les fichiers statiques (HTML, CSS, JS)

io.on('connection', (socket) => {
  console.log('Un client s\'est connecté');

  socket.on('message', (message) => {
    console.log('Message reçu :', message);
    io.emit('message', message); // Diffuse le message à tous les clients
  });

  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});