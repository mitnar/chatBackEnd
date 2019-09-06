const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ChatRoomController = require('./controllers/chatRoomController');

server.listen(80);

const chatRoomController = new ChatRoomController();

io.on('connection', (socket) => {

  socket.on('join', (user) => {
    chatRoomController.connectToRoom(socket, user);
  });

  socket.on('message', (message) => {
    chatRoomController.sendMessage(socket, message);
  });

  socket.on('leave', (user) => {
    chatRoomController.leaveRoom(socket, user);
  });

  socket.on('getMessages', (request) => {
    chatRoomController.getMessages(socket, request);
  });

  socket.on('getUsers', (chatRoomId) => {
    chatRoomController.getUsers(socket, chatRoomId);
  })
});
