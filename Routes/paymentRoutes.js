const express = require("express");
const {
  newPayment,
  getPaymentReq,
  paymentStatus,
} = require("../Controllers/paymentController");

const router = express.Router();

router.post("/addPaymentRequest", newPayment);
router.get("/getPayments", getPaymentReq);
router.get("/paymentStatus", paymentStatus);

module.exports = router;
