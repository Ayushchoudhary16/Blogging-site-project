const Blog = require("../../Models/Blog");
const LikeBlog = require("../../Models/LikeBlog");
const CommentBlog = require("../../Models/CommentBlog");
const BlogLike = require("../../Models/LikeBlog");


const getBlogsFromDB = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("category user totalLikes totalComments");
    console.log("blogs", blogs);
    return res.json({ data: blogs });
  } catch (err) {
    return res.json({ error: String(err) });
  }
};


// Create the Blog

const addBlog = (req, res) => {
  console.log(req.body);
  const blogObj = new Blog({...req.body, image:`/uploads/${req.file.filename}`,});
  blogObj
    .save()
    .then((Blog) => {
      return res.json({
        message: "Blog Created Successfully.",
        data: Blog,
      });
    })
    .catch((err) => {
      return res.json({
        error: err.message,
      });
    });
};

// update Blog

const updateBlog = async (req, res) => {
  try {
    const BlogId = req.params.BlogId;
    const updatedData = req.body;
    if(req?.file?.filename){
      updatedData.image = `/uploads/${req.file.filename}`;
    }
    

    const blog = await Blog.findByIdAndUpdate(BlogId, updatedData, {
      new: true,
    }); // null when there is no Blog
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json({ data: Blog, msg: "Blog updated successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete blog
const deleteBlog = async (req, res) => {
  try {
    const BlogId = req.params.BlogId;
    const blog = await Blog.findByIdAndDelete(BlogId);
    if (!blog) {
      return res.status(404).json({ data: null, error: "Blog not found" });
    }
    return res.json({
      data: { success: true },
      msg: "Blog deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: "not able to delete the Blog" });
  }
};

//like the blog
const likeTheBlog = async (req, res) => {
  try {
    const requestData = req.body;
    const likeEntry = await LikeBlog.findOne(requestData);
    console.log("likeEntry", likeEntry);
    if (likeEntry) {
      await LikeBlog.findByIdAndDelete(likeEntry._id);
      return res.status(200).json({ data: { isLike: false } });
    } else {
      const likeblog = new LikeBlog(requestData);
      await likeblog.save();
      return res.status(200).json({ data: { isLike: true } });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

//comment the blog

const commentTheBlog=async (req,res)=>{
  try{
      const requestData=req.body;
      const commentblog = new CommentBlog(requestData);
      await commentblog.save();
      return res.status(200).json({data:commentblog})

  }catch(err){
    return res.status(500).json({ error: err});

  }

};

//comment of blog

const commentsOfBlog=async (req,res)=>{
  try{
      const blogId = req.params.blogId;
      const comments= await CommentBlog.find({blog: blogId}).populate("user")
      return res.status(200).json({data:comments})

  }catch(err){
    return res.status(500).json({ error: err});

  }

};




// getSingleBlog
const getSingleBlog = async (req, res) => {
  console.log(req.params);
  const blogId = req.params.blogId;
  console.log(blogId);
  try {
    const blogDetails = await Blog.findOne({ _id: blogId }).populate(
      "category user totalLikes totalComments"
    );
    console.log(blogId);
    console.log(blogDetails);
    return res.status(200).json({ data: blogDetails });
  } catch (err) {
    return res.status(400).json({
      data: null,
      error: err,
      message: `Blog is not present with this id ${blogId}`,
    });
  }
};

//GetBlogByCategory
const getBlogByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const blogDetails = await Blog.find({ category: categoryId }).populate(
      "category user"
    );

    console.log(blogDetails);
    return res.status(200).json({ data: blogDetails });
  } catch (err) {
    return res.status(400).json({
      data: null,
      error: String(err),
    });
  }
};



// recent and popular blogs

const getRecentAndPopularBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("category user");
  const blogLikes = await LikeBlog.find();
  const likesOfBlog = [];
  blogs.forEach((blog) => {
    const likes = blogLikes.filter((obj) => {
      return String(obj.blog) === String(blog._id);
    });
    if (likes.length > 0) {
      likesOfBlog.push({ likes: likes.length, blog: blog });
    }
  });
  popularBlogs = likesOfBlog.sort((obj1, obj2) => obj2.likes - obj1.likes);
  return res.status(200).json({
    data: {
      popularBlogs: popularBlogs.splice(0, 3),
      recentBlogs: blogs.splice(blogs.length - 3, blogs.length),
    },
  });
};
// likedblog by user
const likedBlogsByUser = async (req, res) => {
  try {
    const likes = await BlogLike.find({ user: req.user.userId });
    return res.status(200).json({ data: likes, error: null });
  } catch (err) {
    return res.status(400).json({ data: null, error: err });
  }
};

module.exports = {
  addBlog,
  getBlogsFromDB,
  updateBlog,
  likedBlogsByUser,
  deleteBlog,
  commentTheBlog,
  likeTheBlog,
  getBlogByCategory,
  getBlogsFromDB,
  getSingleBlog,
  getRecentAndPopularBlogs,
  commentsOfBlog
};