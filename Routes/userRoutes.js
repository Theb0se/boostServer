const express = require("express");
const {
  registerUser,
  authUser,
  updateEmail,
  updatePassword,
  getAllUser,
  editUser,
  changePassword,
  GetBlnc,
} = require("../Controllers/userControllers");

const router = express.Router();
router.post("/signup", registerUser);
router.post("/login", authUser);
router.post("/updateEmail", updateEmail);
router.post("/updatePassword", updatePassword);
router.get("/allUsers", getAllUser);
router.post("/updateUser", editUser);
router.post("/ChangePassword", changePassword);
router.post("/getBlnc", GetBlnc);

module.exports = router;
