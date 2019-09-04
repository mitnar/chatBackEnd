const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const chatRoomController = require('./controllers/chatRoomController');

server.listen(80);

io.on('connection', (socket) => {

  chatRoomController.onConnect(socket);

  socket.on('message', (message) => {
    chatRoomController.onSendMessage(socket, message);
  });
});
