const asyncHandler = require("express-async-handler");
const PaymentRequest = require("../model/paymentReqModel");
const User = require("../model/userModel");
const PaytmChecksum = require("../PaytmChecksum");
const https = require("https");

const newPayment = asyncHandler(async (req, res) => {
  const { userId, username, method, transactionID, amount } = req.body;

  const newOrder = await PaymentRequest.create({
    userId,
    username,
    method,
    transactionID,
    amount,
  });
  if (newOrder) {
    res.status(201).json(newOrder);
  } else {
    res.status(400).json("Please Try Again");
    console.log("error");
  }
});

const getPaymentReq = asyncHandler(async (req, res) => {
  const payments = await PaymentRequest.find({});
  res.status(201).json(payments);
});

const approvePayment = asyncHandler(async (req, res) => {
  const { paymentId, userId, amount } = req.body;
  console.log(paymentId, userId, amount);

  const updatePayment = await PaymentRequest.findByIdAndUpdate(
    paymentId,
    {
      status: "Approved",
    },
    { new: true }
  );

  if (updatePayment) {
    await User.findByIdAndUpdate(userId, {
      $inc: { balence: amount },
    });

    const payments = await PaymentRequest.find({});
    res.status(201).json(payments);
  } else {
    res.status(400).json("Something Went Wrong. Please Try Again");
  }
});

const rejectPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.body;
  const updatePayment = await PaymentRequest.findByIdAndUpdate(
    paymentId,
    {
      status: "Rejected",
    },
    { new: true }
  );
  if (updatePayment) {
    const payments = await PaymentRequest.find({});
    res.status(201).json(payments);
  } else {
    res.status(400).json("Something Went Wrong. Please Try Again");
  }
});

module.exports = { newPayment, getPaymentReq, approvePayment, rejectPayment };
