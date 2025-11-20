const express = require( "express");
const Razorpay = require( "razorpay");
const crypto = require( "crypto");

const router = express.Router();

// Create order API
router.post("/create-order", async (req, res) => {
  try {
    console.log("req.", req.body);
    
    console.log("secret key ",{
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, 
      currency: "INR",
      receipt: "order_receipt_01",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Payment Failed");
  }
});

// Payment verification
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

module.exports =  router;
