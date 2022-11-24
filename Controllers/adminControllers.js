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

const updateAdmin = asyncHandler(async (req, res) => {
  const { username, newusername, password } = req.body;
  const admin = await Admin.findOne({ username });
  const passwordMatch = admin
    ? bcrypt.compareSync(password, admin.password)
    : false;

  if (passwordMatch) {
    const updateUsername = await Admin.findOneAndUpdate(
      username,
      {
        username: newusername,
      },
      { new: true }
    );
    if (!updateUsername) {
      res.status(404).json("something went Wrong");
      throw new Error("something went Wrong");
    } else {
      res.status(201).json({
        name: updateUsername.name,
        username: updateUsername.username,
      });
    }
  } else {
    res.status(404).json("Please Enter Correct Password");
    throw new Error("Please Enter Correct Password");
  }
});

const updateAdminPasssword = asyncHandler(async (req, res) => {
  const { username, password, newPassword } = req.body;
  const hashPass = bcrypt.hashSync(newPassword, salt);
  const admin = await Admin.findOne({ username });
  const passMatch = bcrypt.compareSync(password, admin.password);

  if (!passMatch) {
    res.status(404).json("Please Enter Correct Password");
    throw new Error("Please Enter Correct Password");
  } else {
    const updatePass = await Admin.findOneAndUpdate(
      username,
      {
        password: hashPass,
      },
      { new: true }
    );
    if (!updatePass) {
      res.status(404).json("something went Wrong! Please Try Again");
      throw new Error("something went Wrong");
    } else {
      res.status(201).json("Password Changed");
    }
  }
});

module.exports = {
  newAdmin,
  authAdmin,
  updateAdmin,
  updateAdminPasssword,
};
