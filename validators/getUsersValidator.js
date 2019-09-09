module.exports = {

    validate(chatRoomId) {
        return Number.isInteger(chatRoomId);
    }
};