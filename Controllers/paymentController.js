const asyncHandler = require("express-async-handler");
const PaymentRequest = require("../model/paymentReqModel");
const User = require("../model/userModel");
const PaytmChecksum = require("../PaytmChecksum");
const https = require("https");
/**
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */

// Post payment req

const newPayment = asyncHandler(async (req, res) => {
  const { userId, username, method, transactionID, amount } = req.body;

  const newOrder = await PaymentRequest.create({
    userId,
    username,
    method,
    transactionID,
    amount,
  });
  if (newOrder) {
    res.status(201).json(newOrder);
  } else {
    res.status(400).json("Please Try Again");
    console.log("error");
  }
});

const getPaymentReq = asyncHandler(async (req, res) => {
  const payments = await PaymentRequest.find({});
  res.status(201).json(payments);
});

// payment status

const paymentStatus = asyncHandler(async (req, res) => {
  res.send("hello");

  console.log(PaytmChecksum);

  var paytmParams = {};

  /* body parameters */
  paytmParams.body = {
    /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
    mid: "wyjbUm73889134628770",

    /* Enter your order id which needs to be check status for */
    orderId: "15211213920913662985",
  };

  /**
   * Generate checksum by parameters we have in body
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body)).then(
    function (checksum) {
      /* head parameters */
      paytmParams.head = {
        /* put generated checksum value here */
        signature: checksum,
      };

      /* prepare JSON string for request */
      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in",

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: "/v3/order/status",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      // Set up the request
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", function () {
          console.log("Response: ", response);
        });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    }
  );
});

module.exports = { newPayment, getPaymentReq, paymentStatus };
