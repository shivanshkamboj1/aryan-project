const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Room = require('../models/Room');

exports.auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		const message = req.header("Verify")
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}
		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			if(message){
			return res.status(200)
				.json({ success: true, message: "token is valid" });
			}
			req.user = decode;
			// console.log(decode)
		} catch (error) {
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token in auth`,
		});
	}
};

exports.isHost = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		if (!room) return res.status(404).send('Room not found');

		if (room.host.toString() !== req.user.id) {
			return res.status(403).send('You are not the host of this room');
  		}
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token in host`,
		});
	}
};
