// /server/socket/socketServer.js
const {addChatMessage}=require('./utils/redis')
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId} as ${userId}`);
      socket.to(roomId).emit('userJoined', { userId });
    });

    socket.on('sendMessage', async({ roomId, message }) => {
      console.log('New message for room', roomId, message);
      const messageWithTimestamp = {
        ...message,
        createdAt: new Date().toISOString(),
      };
      console.log(roomId,message,"yo h")
      await addChatMessage(roomId,messageWithTimestamp)
      io.to(roomId).emit('newMessage', messageWithTimestamp);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};