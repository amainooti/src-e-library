const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", DocumentSchema);
