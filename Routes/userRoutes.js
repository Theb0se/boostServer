const express = require("express");
const { registerUser, authUser, updateEmail, updatePassword } = require("../Controllers/userControllers");

const router = express.Router();
router.post("/signup", registerUser);
router.post("/login", authUser);
router.post("/updateEmail" , updateEmail)
router.post("/updatePassword" , updatePassword)

module.exports = router;
