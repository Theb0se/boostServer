const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./Routes/userRoutes");
require("dotenv").config();
var cors = require("cors");

app.use(cors());
var cors = require("cors");
const axios = require("axios");
app.use(cors());

connectDB();
app.use(express.json());

const port = 3000;

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
      console.log("res", response.data);
      res.status(201).json(response.data);
    })
    .catch(function (error) {
      res.status(400).str(error);
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/user", userRoutes);
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
