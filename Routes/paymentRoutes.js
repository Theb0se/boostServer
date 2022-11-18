const express = require("express");
const {
  newPayment,
  getPaymentReq,
} = require("../Controllers/paymentController");

const router = express.Router();

router.post("/addPaymentRequest", newPayment);
router.get("/getPayments", getPaymentReq);

module.exports = router;
