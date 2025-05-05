const mongoose = require("mongoose");

const commentBlogSchema = new mongoose.Schema({
  
  blog: {
    ref: "Blog",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

const CommentBlog = mongoose.model("CommentBlog", commentBlogSchema);

module.exports = CommentBlog;