const { default: mongoose } = require("mongoose");
const SupportModel = mongoose.Schema(
  {
    TicketId: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    Subject: { type: String, required: true },
    Message: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", SupportModel);

module.exports = Support;
