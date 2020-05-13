const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
server = app.listen('3000', () => console.log('Server is running...'));

const io = require('socket.io')(server);
var id = 0;
io.on('connection', (socket) => {
  id += 1;
  socket.id = id;
  socket.on('get_id', (fs) => {
    fs(socket.id);
  });
  console.log('New user connected: ' + socket.id);
  socket.username = 'Anonymous';
  socket.on('set_name', (data) => {
    socket.username = data;
  });
  socket.on('new_message', (message) => {
    io.sockets.emit('add_mess', {
      classMessage: 'chat-message',
      id: socket.id,
      username: socket.username,
      message: message,
    });
  });
});
