const express = require('express');
const { createRoom, joinRoom, leaveRoom,getRoom,updateRoom,deleteRoom,getParticipantsList} = require('../controllers/room');
const { auth,isHost } = require('../middleware/authM');
const { getChatHistory } = require('../controllers/chat');
const router = express.Router();
const generate = require('../config/google')
router.get('/getroom/:roomId', getRoom);

router.use(auth)
router.post('/createroom', createRoom);
router.get('/joinroom/:roomId', joinRoom);
router.post('/leaveroom/:roomId', leaveRoom);
// router.get('/getparticipantslist/:roomId', getParticipantsList);
router.patch('/updateroom/:roomId',isHost, updateRoom);
router.delete('/deleteroom/:roomId',isHost, deleteRoom);
router.get('/getchat/:roomId',getChatHistory)



router.post('/ai',async (req,res)=>{
    const prompt = `
        You are given this context:
        ${JSON.stringify(data)}
        your name is shivansh act like a human
        Answer this question in max 15 lines use emojis headings and use simple english and dont tell anything about you know context:
        ${req.body.message}

        If you don't know, say you don't know.
        `;

    const message=await generate(prompt)
    return res.json({
        message
    })
})
module.exports = router;
