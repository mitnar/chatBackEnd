'use strict';

module.exports = class ChatRoomManager {
    constructor() {
        this.users = [];
        this.messages = [];
    }

    // join user to room
    connectToRoom(socket, user) {

        socket.join(user.chatRoomId);

        // if user is already in the room
        if(this.users.find(existsUser =>
            existsUser.chatRoomId === user.chatRoomId &&
            existsUser.user.toLowerCase() === user.user.toLowerCase()) === undefined) {

            this.users.push(user);
            socket.broadcast.emit('userJoin', user);
        }
    }

    // send message from user
    sendMessage (socket, message) {

        socket.broadcast.to(message.chatRoomId).emit('message', message);
        this.messages.push(message);
    }

    leaveRoom(socket, user) {

        // if user is in the room
        const userIndex = this.users.findIndex(existsUser =>
            existsUser.chatRoomId === user.chatRoomId &&
            existsUser.user.toLowerCase() === user.user.toLowerCase());

        if(userIndex !== -1) { //
            this.users.splice(userIndex, 1);

            socket.leave(user.chatRoomId);
            socket.broadcast.emit('userLeave', user);
        }
    }

    // get all messages from room
    getMessages(socket, request) {

        let messages = [];

        // if user is in the room
        if (this.users.find(existsUser =>
            existsUser.chatRoomId === request.chatRoomId &&
            existsUser.user.toLowerCase() === request.user.toLowerCase()) !== undefined) {

            messages = this.messages.filter(
                message => message.chatRoomId === request.chatRoomId
            );
        }
        else
            messages = [];

        socket.emit('setMessages', messages);
    }

    // get all user in room
    getUsers(socket, chatRoomId) {
        socket.emit('setUsers', this.users.filter(
            user => user.chatRoomId === chatRoomId
        ));
    }
};