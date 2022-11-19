const asyncHandler = require("express-async-handler");
const PaymentRequest = require("../model/paymentReqModel");

// Post payment req

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

module.exports = { newPayment, getPaymentReq };
