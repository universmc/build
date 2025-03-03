const socket = io();
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.emit('message', message);
  messageInput.value = '';
});

socket.on('message', (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messages.appendChild(messageElement);
});