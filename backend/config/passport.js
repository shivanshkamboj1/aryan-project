const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { handleGoogleAuth } = require("../controllers/auth");
require("dotenv").config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.NODE_APP_BASE_URL + "/auth/google/callback",
    },
    handleGoogleAuth
  )
);


// Serialize / deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));