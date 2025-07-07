// /server/socket/socketServer.js
const {addChatMessage}=require('./utils/redis')
const generate = require('./config/google')

const userIdToSocket = new Map()
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      socket.roomId = roomId;
      socket.userId = userId;
      console.log(`User ${socket.id} joined room ${roomId} as ${userId}`);
      userIdToSocket.set(userId,socket.id)

      socket.to(roomId).emit('userJoined', { userId });
    });

    socket.on('sendMessage', async ({ roomId, message }) => {
      console.log('New message for room', roomId, message);

      const userMessageWithTimestamp = {
        ...message,
        createdAt: new Date().toISOString(),
      };
      console.log("yo h", roomId, message);
      await addChatMessage(roomId, userMessageWithTimestamp);
      io.to(roomId).emit('newMessage', userMessageWithTimestamp);

      // Handle AI response
      // console.log(message,message.isAi)
      if (message.isAI) {
        console.log("generating")
        const res = await generate(message.message);

        const aiMessage = {
          ...message,
          message: res,
          isAi: true,
          senderName:"Google AI",
          createdAt: new Date().toISOString(),
        };
        
        await addChatMessage(roomId, aiMessage);
        io.to(roomId).emit('newMessage', aiMessage);
      }
    });
    socket.on('outgoing-call',({roomId,fromOffer,fromUserId})=>{
      socket.to(roomId).emit('incoming-call',{from:fromUserId,offer:fromOffer})
    })
    socket.on('call-accepted', ({ roomId, answer, toUserId, fromUserId }) => {
      console.log(`Sending answer to ${toUserId} in room ${roomId}`);
      const toSocketId = userIdToSocket.get(toUserId);
      if (toSocketId) {
        io.to(toSocketId).emit('call-answered', {
          from: fromUserId,
          answer
        });
      }
    });
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      socket.to(socket.roomId).emit('user-left', { userId: socket.userId });
      if (socket.userId) {
        userIdToSocket.delete(socket.userId);
      }
    });
  });
};