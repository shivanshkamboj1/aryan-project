const express = require('express');
const { signup, login, resetPassword, resetPasswordToken } = require('../controllers/auth');
const router = express.Router();
const passport = require("passport");
router.post('/signup', signup);
router.get('/login', login);
router.get('/resetpassword/:tokenId', resetPassword);
router.get('/resetpasswordtoken', resetPasswordToken);
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);
router.get("/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // req.user = { user, token } from done() callback in strategy
    const { token } = req.user;
    console.log(token)
    // Send JWT token to client
    res.redirect(`${process.env.REACT_APP_BASE_URL}/oauth-success?token=${token}`);
  }
);


module.exports = router;
