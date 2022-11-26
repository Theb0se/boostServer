const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const axios = require("axios");
const User = require("../model/userModel");

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

  const orders = await Order.find({ userId: userId }).sort({ orderNumber: 1 });

  const allOrder = orders.map((o) => o.orderNumber);
  const MultiStatus = {
    key: "96e9f387fd986b94b621c80aefadfed8",
    action: "status",
    orders: allOrder.toString(),
  };

  axios
    .post("https://indianprovider.com/api/v2", MultiStatus)
    .then(async function (response) {
      const order = response.data;
      const arrayOrder = Object.values(order);

      let arr = [];

      for (let index = 0; index < orders.length; index++) {
        const ordermain = orders[index];
        const data = { ...arrayOrder[index], ordermain };
        arr.push(data);
      }

      const Partial = arr?.filter((f) => f.status === "Partial");
      const isPartialRefund = Partial?.filter(
        (f) => f.ordermain.isRefund === false
      );

      if (isPartialRefund) {
        for (let i = 0; i < isPartialRefund?.length; i++) {
          const Id = isPartialRefund[i].ordermain._id;
          await Order.findByIdAndUpdate(
            Id,
            {
              isRefund: true,
            },
            { new: true }
          );

          const rmn = parseFloat(isPartialRefund[i].remains);
          const amt = rmn * 0.13;

          await User.findByIdAndUpdate(userId, {
            $inc: { balence: amt },
          });
        }
      }

      // cancel Refund

      const Canceled = arr?.filter((f) => f.status === "Canceled");
      const isCancelRefund = Canceled?.filter(
        (f) => f.ordermain.isRefund === false
      );

      if (isCancelRefund) {
        for (let i = 0; i < isCancelRefund?.length; i++) {
          const Id = isCancelRefund[i].ordermain._id;
          await Order.findByIdAndUpdate(
            Id,
            {
              isRefund: true,
            },
            { new: true }
          );

          const rmn = parseFloat(isCancelRefund[i].ordermain.quantity);
          const amt = rmn * 0.13;

          await User.findByIdAndUpdate(userId, {
            $inc: { balence: amt },
          });
        }
      }

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
