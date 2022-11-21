const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const axios = require("axios");

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
  const orders = await Order.find({ userId: userId }).sort({ orderNumber: 1 });
  console.log(userId);
  const allOrder = orders.map((o) => o.orderNumber);
  const MultiStatus = {
    key: "96e9f387fd986b94b621c80aefadfed8",
    action: "status",
    orders: allOrder.toString(),
  };

  console.log(MultiStatus);

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
  const MultiStatus = {
    key: "96e9f387fd986b94b621c80aefadfed8",
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
