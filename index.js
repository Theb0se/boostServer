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
app.use("/user", userRoutes);
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
