module.exports = {

    validate(message) {
        return message.message && message.message.length > 0 &&
            message.user && message.user.length > 0 &&
            Number.isInteger(message.chatRoomId) &&
            new Date(message.date) !== 'Invalid Date';
    }
};