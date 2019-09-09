module.exports = {

    validate(user) {
        return Number.isInteger(user.chatRoomId) &&
            user.user && user.user.length > 0;
    }
};