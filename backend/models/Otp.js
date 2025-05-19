const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    emailId: {
      type: String,
      required: true,
    },
    otp:{
        type:Number,
        required:true
    },
    expiresIn:{
      type:Date,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp",otpSchema)