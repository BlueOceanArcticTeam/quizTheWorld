const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/chat.html'));
});

io.on('connection', (socket) => {
  io.emit('chat message', 'user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    io.emit('chat message', 'user has left the chat');
  });
  socket.on('join', (room) => {
    io.emit('chat message', `${socket.id} joined ${room}`);
    socket.join(room);
  });
});

server.listen(4000, () => {
  console.log('Listening on port 4000');
});
