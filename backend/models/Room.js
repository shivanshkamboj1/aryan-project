const mongoose = require('mongoose')

const roomModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    roomId: {
        type: String,
        unique: true,
        required: true
    },
    videoUrl:{
        type: String
    },
    settings: {
        allowChat: {
            type: Boolean,
            default: true
        },
        allowMic: {
            type: Boolean,
            default: true
        },
        allowPause: {
            type: Boolean,
            default: true
        },
        allowSeek: {
            type: Boolean,
            default: true
        },
        allowForward: {
            type: Boolean,
            default: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default:() => new Date(Date.now() + 3 * 60 * 60 * 1000)
    }
})
module.exports = mongoose.model("Room",roomModel)