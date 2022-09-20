const Comment = require("../models/Comment");
const express = require("express");
const comment = express.Router();
// Make a new comment
comment.post("/", async (req, res) => {
  try {
    const newComment = await new Comment({
      comment: req.body.comment,
      productId: req.body.productId,
      email: req.body.email,
      userImage: req.body.userImage,
    });
    newComment.save().then((comment) => {
      res.status(200).json({
        message: "Comment added successfully",
        comment,
      });
    });
  } catch (err) {
    res.status(400).send("Comment not create");
  }
});
// Load all comments
comment.get("/", async (req, res) => {
  try {
    const data = await Comment.find();
    if (data) {
      res.status(200).json({ data, message: "Comment Loaded successfully!  " });
    } else {
      res.status(500).json({ error: "Failed to get all comments" });
    }
  } catch (err) {
    console.log(err);
  }
});
// Delete comment
comment.get("/single/:id", async (req, res) => {
  try {
    const data = await Comment.find({ postId: req.params.id });
    res.status(200).json({
      message: "Comment loaded successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: "Comment not found",
    });
  }
});
module.exports = comment;
// ok
// ok
