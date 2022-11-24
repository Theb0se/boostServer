const express = require("express");
const { newAdmin, authAdmin } = require("../Controllers/adminControllers");

const router = express.Router();
router.post("/signup", newAdmin);
router.post("/login", authAdmin);

module.exports = router;
