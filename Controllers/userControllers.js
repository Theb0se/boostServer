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
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (user && passwordMatch) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
    });
  } else {
    res.status(400);
    res.sendStatus("Incorrect Email Or Password");
    throw new Error("Incorrect Email Or Password");
  }
});

const updateEmail = asyncHandler(async (req, res) => {
  const { userId, email, currEmail, password } = req.body;
  // console.log(userId, email, currEmail, password);

  const user = await User.findOne({ currEmail });
  console.log(user);
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    const UpdateEmail = await User.findByIdAndUpdate(
      userId,
      {
        email,
      },
      { new: true }
    );
    if (!UpdateEmail) {
      res.status(404);
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
    res.status(404);
    throw new Error("Password Wrong");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { userId, email, currPassword, password } = req.body;
  const hashpass = bcrypt.hashSync(password, salt);
  const user = await User.findOne({ email });
  console.log(user);
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
      res.status(404);
      throw new Error("something went Wrong");
    } else {
      res.status(201).json({
        id: updatePass._id,
        name: updatePass.name,
        email: updatePass.email,
        number: updatePass.number,
      });
    }
  } else {
    res.status(404);
    throw new Error("Password Wrong");
  }
});

module.exports = { registerUser, authUser, updateEmail, updatePassword };
