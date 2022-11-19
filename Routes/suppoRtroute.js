const express = require("express");
const {
  postSupport,
  getAllSupport,
  getUserSupport,
} = require("../Controllers/supportController");

const router = express.Router();

router.post("/postSupport", postSupport);
router.get("/getallSupport", getAllSupport);
router.post("/getUserSupport", getUserSupport);

module.exports = router;
