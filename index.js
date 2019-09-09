const index = require('express')();
const server = require('http').Server(index);
const io = require('socket.io')(server);
const ChatRoomManager = require('./classes/chatRoomManager');

server.listen(80);

const chatRoomManager = new ChatRoomManager();

io.on('connection', (socket) => {

  socket.use((packet, next) => {
    const validator = require(`./validators/${packet[0]}Validator`);

    if(validator) {
      if(validator.validate(packet[1])) {
        return next();
      }
    }
    next(new Error('validation error'));
  });

  socket.on('join', (user) => {
    chatRoomManager.connectToRoom(socket, user);
  });

  socket.on('message', (message) => {
    chatRoomManager.sendMessage(socket, message);
  });

  socket.on('leave', (user) => {
    chatRoomManager.leaveRoom(socket, user);
  });

  socket.on('getMessages', (request) => {
    chatRoomManager.getMessages(socket, request);
  });

  socket.on('getUsers', (chatRoomId) => {
    chatRoomManager.getUsers(socket, chatRoomId);
  })
});
