const express = require("express");
const connectDB = require("./config/db");
const app = express();
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const suppoRtroute = require("./Routes/supportRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
require("dotenv").config();
var cors = require("cors");
const Api = require("./model/apiModel");

app.use(cors({ origin: "*" }));

connectDB();
app.use(express.json());

const port = 8080;

// GET Services FROM API
app.post("/", (req, res) => {
  const { key, action } = req.body;
  const services = {
    key,
    action,
  };

  console.log(services);
  axios
    .post("https://indianprovider.com/api/v2", services)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// POST NEW ORDER TO API
app.post("/neworder", (req, res) => {
  const { action, service, link, quantity } = req.body;
  const key = "96e9f387fd986b94b621c80aefadfed8";

  const newOrder = {
    key,
    action,
    service,
    link,
    quantity,
  };

  axios
    .post("https://indianprovider.com/api/v2", newOrder)
    .then(function (response) {
      res.status(201).json(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(400).str(error);
      console.log(error);
    });
});

// get balence from api

app.get("/getbalence", (req, res) => {
  const data = {
    key: "96e9f387fd986b94b621c80aefadfed8",
    action: "balance",
  };

  axios
    .post("https://indianprovider.com/api/v2", data)
    .then(function (response) {
      res.status(201).json(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(400).json(error);
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Api Configs
app.post(
  "/newApi",
  asyncHandler(async (req, res) => {
    const { api, key } = req.body;
    const newApi = await Api.create({
      api,
      key,
    });

    if (newApi) {
      res.status(201).json(newApi);
    } else {
      console.log("Something Went Wrong");
    }
  })
);

// Get Api Details

app.get(
  "/getApi",
  asyncHandler(async (req, res) => {
    const api = await Api.find({});
    res.send(api);
  })
);

// Update Api
app.post(
  "/updateApi",
  asyncHandler(async (req, res) => {
    const { key, api, id } = req.body;
    console.log(key, api, id);
    const newApi = await Api.findByIdAndUpdate(
      id,
      {
        api: api,
        key: key,
      },
      { new: true }
    );

    if (newApi) {
      res.status(201).json(newApi);
    }
  })
);

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/support", suppoRtroute);
app.use("/payment", paymentRoutes);
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
