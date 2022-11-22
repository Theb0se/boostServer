const { default: mongoose } = require("mongoose");
const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    balence: { type: Number, default: 0 },
    orders: [{ type: "ObjectId", ref: "Order" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);

module.exports = User;
