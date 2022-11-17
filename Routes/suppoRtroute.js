const express = require("express");
const {
  postSupport,
  getAllSupport,
} = require("../Controllers/supportController");

const router = express.Router();

router.post("/postSupport", postSupport);
router.get("/getallSupport", getAllSupport);

module.exports = router;
