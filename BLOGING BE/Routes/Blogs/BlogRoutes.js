const express = require("express");
const {
  addBlog,
  getBlogsFromDB,
  updateBlog,
  deleteBlog,
  commentTheBlog,
  likeTheBlog,
  getSingleBlog,
  getBlogByCategory,
  getRecentAndPopularBlogs,
  commentsOfBlog,
  likedBlogsByUser,
} = require("../../Controllers/Blogs/blogControllers");
const {authenticateToken}=require("../../Controllers/Auth/authController")
const uploadImage=require("../../Controllers/UploadImage/uploadImage")

const router = express.Router();
router.post(
  "/add-blog",
  uploadImage.single("image"),
  authenticateToken,
  addBlog
);
router.get("/list", getBlogsFromDB);
router.put(
  "/update-blog/:BlogId",
  uploadImage.single("image"),
  authenticateToken,
  updateBlog
);
router.get("/likedblog-by-user", authenticateToken,likedBlogsByUser);
router.delete("/delete-blog/:BlogId", deleteBlog);
router.post("/like-blog",authenticateToken, likeTheBlog);
router.post("/comment-blog",authenticateToken, commentTheBlog);
router.get("/getblogby-id/:blogId", getSingleBlog);
router.get("/getblogby-id/:blogId", getSingleBlog);
router.get("/getblogby-category/:categoryId", getBlogByCategory);
router.get("/recent-popular-blogs", getRecentAndPopularBlogs);
router.get("/comments/:blogId",commentsOfBlog);
router.post("/test-api",authenticateToken,(req,res)=>{
  return res.json({data:"Able to call api"});
})

module.exports = router;