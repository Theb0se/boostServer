const { default: mongoose } = require("mongoose");
const orderModel = mongoose.Schema(
  {
    orderNumber: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    link: { type: String, required: true },
    service: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
