const mongoose = require('mongoose')
const messageSchema  = new mongoose.Schema({
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }

},{timestamps:true})
module.exports =  mongoose.model("Message",messageSchema)