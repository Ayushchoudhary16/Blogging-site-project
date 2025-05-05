const mongoose = require("mongoose");

const likeBlogSchema = new mongoose.Schema({
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
});

const BlogLike = mongoose.model("BlogLike", likeBlogSchema);

module.exports = BlogLike;