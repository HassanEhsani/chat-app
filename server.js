// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // مطمئن شو HTML داخل پوشه public هست

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('set username', (username) => {
    socket.username = username;
    console.log(`${username} joined`);
    io.emit('chat message', {
      username: '⚡ SYSTEM',
      message: `${username} joined the chat`,
    });
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.username || 'unknown user'} disconnected`);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
