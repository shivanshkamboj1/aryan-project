const User = require("../models/User")
const Message = require('../models/Message')
const { getLastMessages } = require('../utils/redis');

exports.getChatHistory = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }

    const messages = await getLastMessages(roomId);
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching chat history" });
  }
};

