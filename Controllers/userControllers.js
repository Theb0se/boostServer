const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const registerUser = asyncHandler(async (req, res) => {
  console.log(55);
  const { name, email, password, number } = req.body;

  if (!name || !email || !password || !number) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User Already Exist");
  }

  var hashPass = bcrypt.hashSync(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashPass,
    number,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
    });
  } else {
    res.status(400);
    throw new Error("Sign Up Field Please Try Again");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log(55);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (user && passwordMatch) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      password: user.password,
    });
  } else {
    res.status(400);
    res.sendStatus("Incorrect Email Or Password");
    throw new Error("Incorrect Email Or Password");
  }
});

module.exports = { registerUser, authUser };
