const express = require("express");
const {
  newAdmin,
  authAdmin,
  updateAdmin,
  updateAdminPasssword,
} = require("../Controllers/adminControllers");

const router = express.Router();
router.post("/signup", newAdmin);
router.post("/login", authAdmin);
router.post("/updateAdminUserName", updateAdmin);
router.post("/updatePass", updateAdminPasssword);

module.exports = router;
