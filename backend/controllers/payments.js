const { instance } = require("../config/razorpay")
require("dotenv").config()
const crypto = require("crypto");
const Payment = require("../models/Payment");
const mongoose = require('mongoose')
const User = require("../models/User")

exports.capturePayment = async (req, res) => {

  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes:{
      email:req.body.email,
      membershipType:req.body.membershipType
    }
  };

  try {

    const paymentResponse = await instance.orders.create(options);
    const {amount,id,notes,receipt,status}=paymentResponse;
    await  Payment.create({
      amount,userId: req.body.userId,orderId,notes,receipt,status
    })

    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("Missing parameters for payment verification");
      return res.status(400).json({ success: false, message: "Payment Failed: Missing parameters" });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

  // console.log("Expected Signature:", expectedSignature);
  // console.log("Received Signature:", razorpay_signature);

  if (expectedSignature === razorpay_signature) {
      
      const user = await Payment.findOne({id:req.body.razorpay_order_id})
      const userId= new mongoose.Types.ObjectId(user.notes.userId);
      await User.findByIdAndUpdate(userId,{
        isPremium:true,
        membershipType:user.notes.membershipType
      });
      return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  console.error("Signature mismatch. Payment verification failed.");

  return res.status(400).json({ success: false, message: "Payment Failed: Signature mismatch" });
}