const asyncHandler = require("express-async-handler");
const PaymentRequest = require("../model/paymentReqModel");
const User = require("../model/userModel");

const newPayment = asyncHandler(async (req, res) => {
  const { userId, email, method, transactionID, amount } = req.body;

  let idExist = await PaymentRequest.findOne({ transactionID });

  if (idExist) {
    res
      .status(400)
      .json("Payment Request Already Exist . Please Wait Sometime");
  } else {
    const newOrder = await PaymentRequest.create({
      userId,
      email,
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

const addPayment = asyncHandler(async (req, res) => {
  const { email, method, transactionID, amount } = req.body;
  const paymentUser = await User.findOneAndUpdate(
    { email: email },
    {
      $inc: { balence: amount },
    },
    { new: true }
  );

  if (paymentUser) {
    const pay = await PaymentRequest.create({
      userId: paymentUser._id,
      email: paymentUser.email,
      method,
      transactionID,
      amount,
      status: "Approved",
    });

    if (pay) {
      const payments = await PaymentRequest.find({});
      res.status(201).json(payments);
    } else {
      console.log("Something Went Wrong ! Please Try Again");
      res.status(400).json("Something Went Wrong ! Please Try Again");
    }
  } else {
    console.log("User Not Found");
    res.status(400).json("User Not Found");
  }
});

module.exports = {
  newPayment,
  getPaymentReq,
  approvePayment,
  rejectPayment,
  addPayment,
};
