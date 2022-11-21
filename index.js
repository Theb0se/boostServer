const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const suppoRtroute = require("./Routes/supportRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const axios = require("axios");
require("dotenv").config();
var cors = require("cors");

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
  const { key, action, service, link, quantity } = req.body;
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

app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/support", suppoRtroute);
app.use("/payment", paymentRoutes);
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
