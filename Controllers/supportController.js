const asyncHandler = require("express-async-handler");
const Support = require("../model/SupportModel");

const postSupport = asyncHandler(async (req, res) => {
  const { TicketId, userId, username, Subject, Message } = req.body;
  const newSupport = await Support.create({
    TicketId,
    userId,
    username,
    Subject,
    Message,
  });
  if (newSupport) {
    res.status(201).json("Success");
  } else {
    res.status(400).json("Something Went Wrong. Please Try Again");
    throw new Error("Sign Up Field Please Try Again");
  }
});

// Admin get all support

const getAllSupport = asyncHandler(async (req, res) => {
  const allSupport = await Support.find({});
  res.status(201).json(allSupport);
});

const getUserSupport = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const tickets = await Support.find({ userId: userId });
  console.log(tickets);

  if (tickets) {
    res.status(201).json(tickets);
  } else {
    res.status(400).json("Something Went Wrong. Please Try Again");
  }
});

// set support status

const setSupportStatus = asyncHandler(async (req, res) => {
  const { supportId } = req.body;
  const resolved = await Support.findByIdAndUpdate(
    supportId,
    {
      status: "Solved",
    },
    { new: true }
  );
  if (resolved) {
    res.status(201).json(resolved);
  } else {
    res.status(400).json("Something Went Wrong. Please Try Again");
  }
});

module.exports = {
  postSupport,
  getAllSupport,
  getUserSupport,
  setSupportStatus,
};
