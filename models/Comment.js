const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
// git commit
