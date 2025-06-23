const mongoose = require("mongoose");

const resetToken = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uid:{
      type:String,
      required:true
    },
    expiresIn:{
      type:Date,
      default:()=>new Date(Date.now()+1000*60*5)
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResetPassToken",resetToken)