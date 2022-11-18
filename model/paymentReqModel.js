const { default: mongoose } = require("mongoose");
const PaymentReq = mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    method: { type: String, required: true },
    transactionID: { type: String, required: true },
    status: { type: String, default: "pending" },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const PaymentRequest = mongoose.model("PaymentRequest", PaymentReq);

module.exports = PaymentRequest;
