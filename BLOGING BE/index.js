const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path= require("path");

const BlogRouter = require("./Routes/Blogs/BlogRoutes");
const categoryRouter = require("./Routes/Category/categoryRoutes");
const authRouter = require("./Routes/Auth/authRoutes");

// const BlogControllers = require("./Controllers/Blogs/BlogControllers");

const { getBlogs } = require("./Controllers/Blogs/blogControllers");

const app = express();

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

PORT = 5000;
const corsOptions = {
  methods: ["GET","DELETE","POST","PUT"],
};

// Database Connection

mongoose.connect("mongodb://localhost:27017/bloggingdb");
const db = mongoose.connection;
db.on("error", () => {
  console.log("Databse Connection Failed");
});

db.once("open", () => {
  console.log("Database Connected");
});

// GET API
//app.get("/Blogs", BlogControllers.getBlogs);
// app.get("/Blogs", getBlogs);
app.use(express.json()); // Middleware.
app.use(cors(corsOptions));
app.use("/blog", BlogRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server has started.");
});