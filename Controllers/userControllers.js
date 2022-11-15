const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, number } = req.body;

  if (!name || !email || !password || !number) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("User Already Exist");
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
    res.status(400).json("Sign Up Field Please Try Again");
    throw new Error("Sign Up Field Please Try Again");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordMatch = user
    ? bcrypt.compareSync(password, user.password)
    : false;
  if (user && passwordMatch) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
    });
  } else {
    res.status(400).json("Incorrect Email Or Password");
    throw new Error("Incorrect Email Or Password");
  }
});

const updateEmail = asyncHandler(async (req, res) => {
  const { userId, email, currEmail, password } = req.body;
  console.log(userId, email, currEmail, password);

  const user = await User.findOne({ email: currEmail });
  console.log(user);

  const passwordMatch = user
    ? bcrypt.compareSync(password, user.password)
    : false;
  if (passwordMatch) {
    const UpdateEmail = await User.findByIdAndUpdate(
      userId,
      {
        email,
      },
      { new: true }
    );
    if (!UpdateEmail) {
      res.status(404).json("something went Wrong");
      throw new Error("something went Wrong");
    } else {
      res.status(201).json({
        id: UpdateEmail._id,
        name: UpdateEmail.name,
        email: UpdateEmail.email,
        number: UpdateEmail.number,
      });
    }
  } else {
    res.status(404).json("Please Enter Correct Password");
    throw new Error("Please Enter Correct Password");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { userId, email, currPassword, password } = req.body;
  console.log(userId, email, currPassword, password);
  const hashpass = bcrypt.hashSync(password, salt);
  const user = await User.findOne({ email });
  const passwordMatch = bcrypt.compareSync(currPassword, user.password);
  if (passwordMatch) {
    const updatePass = await User.findByIdAndUpdate(
      userId,
      {
        password: hashpass,
      },
      { new: true }
    );
    if (!updatePass) {
      res.status(404).json("something went Wrong");
      throw new Error("something went Wrong");
    } else {
      res.status(201).json("Password Changed");
    }
  } else {
    res.status(404).json("Please Enter Correct Password");
    throw new Error("Please Enter Correct Password");
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(201).json(users);
});

module.exports = {
  registerUser,
  authUser,
  updateEmail,
  updatePassword,
  getAllUser,
};
