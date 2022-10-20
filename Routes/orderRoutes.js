const express = require("express");
const {
  postOrder,
  getOrder,
  getAllOrder,
} = require("../Controllers/orderController");

const router = express.Router();

router.post("/postOrder", postOrder);
router.post("/getOrder", getOrder);
router.get("/getallorder", getAllOrder);

module.exports = router;
