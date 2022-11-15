const express = require("express");
const {
  registerUser,
  authUser,
  updateEmail,
  updatePassword,
  getAllUser,
  editUser,
  changePassword,
} = require("../Controllers/userControllers");

const router = express.Router();
router.post("/signup", registerUser);
router.post("/login", authUser);
router.post("/updateEmail", updateEmail);
router.post("/updatePassword", updatePassword);
router.get("/allUsers", getAllUser);
router.post("/updateUser", editUser);
router.post("/ChangePassword", changePassword);

module.exports = router;
