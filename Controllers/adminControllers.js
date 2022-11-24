const asyncHandler = require("express-async-handler");
var bcrypt = require("bcryptjs");
const Admin = require("../model/adminModel");
var salt = bcrypt.genSaltSync(10);

const newAdmin = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }

  const adminExist = await Admin.findOne({ username });

  if (adminExist) {
    res.status(400).json("User Already Exist");
    throw new Error("User Already Exist");
  }

  var hashPass = bcrypt.hashSync(password, salt);
  const admin = await Admin.create({
    name,
    username,
    password: hashPass,
  });

  if (admin) {
    console.log(admin);
    res.status(201).json(admin);
  } else {
    res.status(400).json("Sign Up Field Please Try Again");
    throw new Error("Sign Up Field Please Try Again");
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  const passwordMatch = admin
    ? bcrypt.compareSync(password, admin.password)
    : false;
  if (admin && passwordMatch) {
    res.status(201).json({
      name: admin.name,
      username: admin.username,
    });
  } else {
    res.status(400).json("Incorrect Email Or Password");
    throw new Error("Incorrect Email Or Password");
  }
});

module.exports = {
  newAdmin,
  authAdmin,
};
