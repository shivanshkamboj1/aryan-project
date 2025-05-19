const { instance } = require("../config/razorpay")
require("dotenv").config()
const crypto = require("crypto");
const  Student = require("../models/User");
const Payment = require("../models/payment");
const mongoose = require('mongoose')
exports.capturePayment = async (req, res) => {

                                                                                          

  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
    notes:{
      studentId:req.body.studentId
    }
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    // console.log(paymentResponse);
    const {amount,id,notes,receipt,status}=paymentResponse;
    await  Payment.create({
      amount,id,notes,receipt,status
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


// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  // const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("Missing parameters for payment verification");
      return res.status(400).json({ success: false, message: "Payment Failed: Missing parameters" });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

  console.log("Expected Signature:", expectedSignature);
  console.log("Received Signature:", razorpay_signature);

  if (expectedSignature === razorpay_signature) {
      
      const user = await Payment.findOne({id:req.body.razorpay_order_id})
      const userId= new mongoose.Types.ObjectId(user.notes.studentId);
      await Student.findByIdAndUpdate(userId,{pro:true});
      return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  console.error("Signature mismatch. Payment verification failed.");
  return res.status(400).json({ success: false, message: "Payment Failed: Signature mismatch" });
}