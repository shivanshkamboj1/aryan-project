const express = require('express');
const { createRoom, joinRoom, leaveRoom,getRoom,updateRoom,deleteRoom,getParticipantsList} = require('../controllers/room');
const { auth,isHost } = require('../middleware/authM');
const { getChatHistory } = require('../controllers/chat');

const router = express.Router();

router.get('/getroom/:roomId', getRoom);

router.use(auth)
router.post('/createroom', createRoom);
router.get('/joinroom/:roomId', joinRoom);
router.post('/leaveroom/:roomId', leaveRoom);
// router.get('/getparticipantslist/:roomId', getParticipantsList);
router.patch('/updateroom/:roomId',isHost, updateRoom);
router.delete('/deleteroom/:roomId',isHost, deleteRoom);
router.get('/getchat/:roomId',getChatHistory)
module.exports = router;
