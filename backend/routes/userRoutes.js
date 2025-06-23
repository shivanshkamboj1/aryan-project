const express = require('express');
const { signup, login, resetPassword, resetPasswordToken, logout, changePassword } = require('../controllers/auth');
const router = express.Router();
const passport = require("passport");
const { auth } = require('../middleware/authM');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/resetpassword/:tokenId', resetPassword);
router.post('/resetpasswordtoken', resetPasswordToken);
router.put('/changepassword',auth, changePassword);
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);
router.get("/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const { token } = req.user;
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000
    });
    res.redirect(`${process.env.REACT_APP_BASE_URL}/oauth-success`);
  }
);


module.exports = router;