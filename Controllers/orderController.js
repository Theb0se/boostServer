const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const axios = require("axios");
const User = require("../model/userModel");
const Api = require("../model/apiModel");

const postOrder = asyncHandler(async (req, res) => {
  const { orderNumber, userId, link, service, quantity, email, username } =
    req.body;
  if (!orderNumber || !userId || !link || !service) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }

  const order = await Order.create({
    orderNumber,
    username,
    email,
    userId,
    link,
    service,
    quantity,
  });

  if (order) {
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { orders: order._id } },
      { new: true }
    );
    const amount = quantity * 0.13;
    await User.findByIdAndUpdate(userId, {
      $inc: { balence: -amount },
    });
    res.status(201).json(order);
    console.log(order);
  } else {
    res.status(400).json("Please Try Again");
    console.log("error");
    throw new Error("Please Try Again");
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  let canceldOrder;
  const orders = await Order.find({ userId: userId }).sort({ orderNumber: 1 });
  const api = await Api.find({});
  const allOrder = orders.map((o) => o.orderNumber);
  const MultiStatus = {
    key: api.key,
    action: "status",
    orders: allOrder.toString(),
  };

  axios
    .post("https://indianprovider.com/api/v2", MultiStatus)
    .then(function (response) {
      const order = response.data;
      const arrayOrder = Object.values(order);
      res.status(201).json({
        orders: orders,
        order: arrayOrder,
      });
    })
    .catch(function (error) {
      res.status(400).json(error);
      console.log(error);
    });
});

// Admin config

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ orderNumber: 1 });
  const allOrder = orders.map((o) => o.orderNumber);
  const apikey = await Api.find({});
  const MultiStatus = {
    key: apikey.key,
    action: "status",
    orders: allOrder.toString(),
  };

  axios
    .post("https://indianprovider.com/api/v2", MultiStatus)
    .then(function (response) {
      const order = response.data;
      const arrayOrder = Object.values(order);
      let arr = [];

      for (let index = 0; index < orders.length; index++) {
        const ordermain = orders[index];
        const data = { ...arrayOrder[index], ordermain };
        arr.push(data);
      }

      res.status(201).json(arr);
    })
    .catch(function (error) {
      res.status(400).json(error);
      console.log(error);
    });
});

module.exports = { postOrder, getAllOrder, getOrder };
