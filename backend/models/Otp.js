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
      default:()=>new Date(Date.now() + 5 * 60 * 1000)
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp",otpSchema)