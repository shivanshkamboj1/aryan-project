const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: function() { return !this.isOAuthUser; }
    },
    isOAuthUser: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
      enum:["lite","pro"]
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true 
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save",async function(next){
  if(!this.isModified("password"))return next();
  try {
    this.password = await bcrypt.hash(this.password,10);
  next();
  } catch (error) {
    console.error("Error hashing password before saving user:", error);
    next(new Error("Failed to hash the password. Please try again."));
  }
})
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User",userSchema)