const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Anonymous",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);