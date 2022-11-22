const express = require("express");
const {
  newPayment,
  getPaymentReq,
  paymentStatus,
  approvePayment,
  rejectPayment,
} = require("../Controllers/paymentController");

const router = express.Router();

router.post("/addPaymentRequest", newPayment);
router.get("/getPayments", getPaymentReq);
router.post("/approvePayment", approvePayment);
router.post("/rejectPayment", rejectPayment);

module.exports = router;
