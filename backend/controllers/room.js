const Room = require('../models/Room')
const { nanoid } = require("nanoid");
const { addParticipant,getParticipants,removeParticipant,setRoomSettings ,deleteRoom, isUserKicked, kickUser,removeKicked,getAllKicked} = require('../utils/redis');

const User = require('../models/User')
const mongoose = require('mongoose')
exports.createRoom = async (req, res) => {
  try {
    const { roomName } = req.body;
    const userId = req.user.userId;

    if(!userId){
      return res.status(400).json({
        success:false,
        message:"please login"
      })
    }
    if (!roomName) {
      return res.status(400).json({ success: false, message: "Room Name is required" });
    }

    const roomId = nanoid(5);
    const room = (await Room.create({ name: roomName, host: userId, roomId }));

    await addParticipant(roomId, userId);

    return res.status(201).json({ success: true, message: "Room created successfully", room });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error in creating room", error });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const userId = req.user.userId;

    if (!roomId) return res.status(400).json({ success: false, message: "Room ID is required" });

    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    
    const participants = await getParticipants(roomId);
    if (participants.length >= 4) {
      return res.status(403).json({ success: false, message: "Room is full. Maximum 4 users allowed." });
    }
    console.log(roomId,userId,"hiiii")
    // if(isUserKicked(roomId, userId)){
    //   return res.status(403).json({ success: false, message: "You have been banned from the room"});
    // }
    await addParticipant(roomId, userId); // 
    const updatedParticipants  = await getParticipants(roomId); // Get updated list

    return res.status(200).json({ success: true, message: "Room joined successfully",room, participants:updatedParticipants  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error joining room", error });
  }
};

exports.leaveRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const userId = req.user.userId;

    if (!roomId) return res.status(400).json({ success: false, message: "Room ID is required" });

    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    await removeParticipant(roomId, userId); // ✅ Redis
    const participants = await getParticipants(roomId); // Fetch updated list

    return res.status(200).json({ success: true, message: "Left room successfully", participants });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error leaving room", error });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    if (!roomId) return res.status(400).json({ success: false, message: "Room ID is required" });

    const room = await Room.findOne({ roomId })
      .populate('host', 'firstName lastName emailId');
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    let hostId = String(room.host._id)

    let participants = await getParticipants(roomId);

    participants = participants.filter((user)=>user!=hostId)
    participants =await Promise.all(participants.map((user)=>User.findById(user).select("firstName lastName emailId")))
   
    return res.status(200).json({ success: true, message: "Room data fetched successfully", room, participants });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error getting room data", error });
  }
};
exports.updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name, videoUrl, settings } = req.body;
    const userId = req.user.userId;

    if (!roomId) return res.status(400).json({ success: false, message: "Room ID is required" });

    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    if (room.host.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Only the host can update this room" });
    }

    // Mongo for static props
    if (name) room.name = name;
    if (videoUrl) room.videoUrl = videoUrl;
    await room.save();

    const allowedSettingKeys = ['allowChat', 'allowMic', 'allowPause', 'allowSeek', 'allowForward'];
    if (settings && typeof settings === "object") {
    const cleanedSettings = {};

    for (const key of allowedSettingKeys) {
        if (settings.hasOwnProperty(key)) {
        const value = settings[key];
        if (typeof value === 'boolean') {
            cleanedSettings[key] = value;
        }
        }
    }

    // Save to Redis only if there's something valid
    if (Object.keys(cleanedSettings).length > 0) {
        await setRoomSettings(roomId, cleanedSettings);
    }
    }
    // Redis for dynamic settings
    // if (settings && typeof settings === "object") {
    //   await setRoomSettings(roomId, settings); // implement this like userRestrictions helper
    // }

    return res.status(200).json({ success: true, message: "Room updated successfully", room });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error updating room", error: error.message });
  }
};
exports.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.userId;

    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // Only host can delete the room
    if (room.host.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Only the host can delete this room" });
    }

    // Delete the room in Mongo
    await Room.deleteOne({ roomId });

    // Delete Redis data related to this room
    const result = await deleteRoom(roomId)
    if(!result){
      return res.status(400).json({
        success:false,
        message:"cannot delete room"
      })
    }

    return res.status(200).json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error deleting room", error: error.message });
  }
};
exports.getParticipantsList = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }

    // ✅ Check if the room exists in Mongo
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // ✅ Fetch participant IDs from Redis
    const participantIds = await getParticipants(roomId); // returns array of string IDs
    if (!participantIds || participantIds.length === 0) {
      return res.status(200).json({ success: true, participants: [] });
    }

    // ✅ Fetch participant data from Mongo
    const participants = await User.find({ _id: { $in: participantIds } })
      .select('name email');

    return res.status(200).json({ success: true, participants });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching participants", error: error.message });
  }
};
exports.kickUser  = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    await removeParticipant(roomId, userId);
    await kickUser(roomId, userId);
    req.app.get('io').to(roomId).emit('userBanned', { userId });


    return res.status(200).json({
      success: true,
      message: `User ${userId} banned from room ${roomId}`
    });

  } catch (error) {
    console.error("banuser error:", error);
    return res.status(500).json({
      success: false,
      message: "Error banning user",
      error: error.message
    });
  }
};
exports.unKickUser  = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    await removeKicked(roomId, userId);


    return res.status(200).json({
      success: true,
      message: `User ${userId} was un-banned from room ${roomId}`
    });

  } catch (error) {
    console.error("unban error:", error);
    return res.status(500).json({
      success: false,
      message: "Error Un banning user",
      error: error.message
    });
  }
};
exports.getAllKicked = async(req,res)=>{
  try {
    const { roomId} = req.body;
    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const bannedUsers = await getAllKicked(roomId);


    return res.status(200).json({
      success: true,
      message: `All banned user fetched succesfully`,
      bannedUsers
    });

  } catch (error) {
    console.error("fetch banned error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching banneduser",
      error: error.message
    });
  }
};