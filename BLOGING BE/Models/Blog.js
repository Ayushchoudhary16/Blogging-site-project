const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  longDsec: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    ref: "Category",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

BlogSchema.virtual("totalLikes", {
  ref: "BlogLike",
  localField: "_id",
  foreignField: "blog",
  count: true,
});

BlogSchema.virtual("totalComments", {
  ref: "CommentBlog",
  localField: "_id",
  foreignField: "blog",
  count: true,
});



const Blog = mongoose.model("Blog", BlogSchema);

BlogSchema.set("toJSON", { virtuals: true });

module.exports = Blog;