const redisClient = require("../config/redis");

// Participants
const addParticipant = async (roomId, userId) => redisClient.sAdd(`participants:${roomId}`, userId);
const removeParticipant = async (roomId, userId) => redisClient.sRem(`participants:${roomId}`, userId);
const getParticipants = async (roomId) => redisClient.sMembers(`participants:${roomId}`);

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
  getAllUserRestrictions, // renamed for clarity
  setVideoState,
  getVideoState,
  setRoomSettings,       // new helper
  getRoomSettings,       // new helper
  addChatMessage,
  getLastMessages,
};
