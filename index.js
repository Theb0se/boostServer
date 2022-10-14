const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./Routes/userRoutes");
require("dotenv").config();
var cors = require("cors");

app.use(cors());

connectDB();
app.use(express.json());

const port = 3000;
const hostname = "0.0.0.0";

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/user", userRoutes);
app.listen(port, hostname, () =>
  console.log(`Example app listening on port ${port}!`)
);
