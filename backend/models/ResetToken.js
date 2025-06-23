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
      type:Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResetPassToken",resetToken)