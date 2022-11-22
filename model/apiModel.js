const { default: mongoose } = require("mongoose");
const apiModel = mongoose.Schema(
  {
    api: { type: String, required: true },
    key: { type: String, required: true },
  },
  { timestamps: true }
);

const Api = mongoose.model("Api", apiModel);

module.exports = Api;
