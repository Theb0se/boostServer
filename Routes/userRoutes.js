const express = require("express");
const { registerUser, authUser, updateEmail } = require("../Controllers/userControllers");

const router = express.Router();
router.post("/signup", registerUser);
router.post("/login", authUser);
router.post("/updateEmail" , updateEmail)

module.exports = router;
