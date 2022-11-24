const { default: mongoose } = require("mongoose");
const AdminModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminModel);

module.exports = Admin;
