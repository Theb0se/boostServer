const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const axios = require("axios");

const postOrder = asyncHandler(async (req, res) => {
  const { orderNumber, userId, link, service, quantity } = req.body;
  if (!orderNumber || !userId || !link || !service) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }

  console.log(orderNumber, userId, link, service);

  const order = await Order.create({
    orderNumber,
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
    key: "8eac711290c821166246944b29bf1f62",
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
const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ orderNumber: 1 });
  if (orders) {
    console.log(orders);
    res.status(201).json(orders);
  } else {
    console.log("error");
    res.status(400).json("error");
  }
});

module.exports = { postOrder, getAllOrder, getOrder };
