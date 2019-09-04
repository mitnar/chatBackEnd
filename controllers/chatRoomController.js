'use strict';

module.exports = {

    // присоединенеи пользователя в комнату
    onConnect: (socket) => {

        const chatRoom = socket.handshake.query.chatRoom;
        socket.join(chatRoom);
    },

    // рассылка сообщения в комнату
    onSendMessage: (socket, message) => {

        const chatRoom = socket.handshake.query.chatRoom;
        socket.broadcast.to(chatRoom).emit('message', message);
    }
};