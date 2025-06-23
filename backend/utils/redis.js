const redisClient = require("../config/redis");
console.log(redisClient)

// Participants
const addParticipant = async (roomId, userId) => redisClient.sadd(`participants:${roomId}`, userId);
const removeParticipant = async (roomId, userId) => redisClient.srem(`participants:${roomId}`, userId);
const getParticipants = async (roomId) => redisClient.smembers(`participants:${roomId}`);
const deleteRoom = async (roomId) => {
  const results = await Promise.all([
    redisClient.del(`participants:${roomId}`),
    redisClient.del(`restrictions:${roomId}`),
    redisClient.del(`videoState:${roomId}`),
    redisClient.del(`chat:${roomId}`)
  ]);

  const deleted = results.some(count => count > 0);
  return deleted;
};

// Restrictions
const setUserRestrictions = async (roomId, userId, restrictionsObj) =>
  redisClient.hSet(`restrictions:${roomId}`, userId, JSON.stringify(restrictionsObj));
const getUserRestrictions = async (roomId, userId) => {
  const data = await redisClient.hGet(`restrictions:${roomId}`, userId);
  return data ? JSON.parse(data) : null;
};
const getAllUserRestrictions = async (roomId) => {
  const entries = await redisClient.hGetAll(`restrictions:${roomId}`);
  return Object.fromEntries(
    Object.entries(entries).map(([userId, json]) => [userId, JSON.parse(json)])
  );
  
};

// Video State
const setVideoState = async (roomId, state) => {
  const entries = Object.entries(state).map(([k, v]) => [k, v.toString()]);
  return redisClient.hSet(`videoState:${roomId}`, entries.flat());
};
const getVideoState = async (roomId) => redisClient.hGetAll(`videoState:${roomId}`);

// Settings
const setRoomSettings = async (roomId, settings) => redisClient.set(`settings:${roomId}`, JSON.stringify(settings));
const getRoomSettings = async (roomId) => {
  const data = await redisClient.get(`settings:${roomId}`);
  return data ? JSON.parse(data) : null;
};

// Chat
const addChatMessage = async (roomId, messageObj) => redisClient.rPush(`chat:${roomId}`, JSON.stringify(messageObj));
const getLastMessages = async (roomId, count = 50) => redisClient.lRange(`chat:${roomId}`, -count, -1);

module.exports = {
  redisClient,
  addParticipant,
  removeParticipant,
  getParticipants,
  setUserRestrictions,
  getUserRestrictions,
  getAllUserRestrictions,
  setVideoState,
  getVideoState,
  setRoomSettings, 
  getRoomSettings, 
  addChatMessage,
  getLastMessages,
  deleteRoom
};
