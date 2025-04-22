// mockServer.js
const dotenv = require('dotenv');
require('dotenv').config()


const { Server } = require('socket.io');
const io = new Server(process.env.PORT, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat-message', (msg) => {
    console.log('Received:', msg);
    setTimeout(() => {
      // Simulated AI response
      io.emit('chat-message', {
        ...msg,
        id: Date.now() + 1,
        username: 'AI',
        content: `Echo: ${msg.content}`,
      });
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
}); 