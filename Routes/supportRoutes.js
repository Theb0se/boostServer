const express = require("express");
const {
  postSupport,
  getAllSupport,
  getUserSupport,
  setSupportStatus,
} = require("../Controllers/supportController");

const router = express.Router();

router.post("/postSupport", postSupport);
router.get("/getallSupport", getAllSupport);
router.post("/getUserSupport", getUserSupport);
router.post("/setSupportStatus", setSupportStatus);

module.exports = router;
