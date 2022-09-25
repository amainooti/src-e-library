const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema(
  {
    userId: {},
    token: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
