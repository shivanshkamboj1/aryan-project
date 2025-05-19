const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
require("dotenv").config()
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.NODE_APP_BASE_URL + "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try find user by googleId first
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Try find user by email (existing non-OAuth user)
          user = await User.findOne({ emailId: profile.emails[0].value });

          if (user) {
            // If user exists but no googleId, update user to add googleId & isOAuthUser
            user.googleId = profile.id;
            user.isOAuthUser = true;
            await user.save();
          } else {
            // If no user found, create a new one
            user = await User.create({
              googleId: profile.id,
              emailId: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              isOAuthUser: true,
            });
          }
        }

        // Create JWT token
        const token = jwt.sign(
          {
            id: user._id,
            emailId: user.emailId,
            membershipType: user.membershipType,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


// Serialize / deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));