const express = require('express');
const { getUserDetail, updateProfile } = require('../controllers/user');
const { auth } = require('../middleware/authM');
const router = express.Router();
router.use(auth)
router.get('/getuserdetail', getUserDetail);
router.patch('/updateprofile', updateProfile);

module.exports = router;
