const express = require("express");
const { signup,login, getUserDetails,authenticateToken } = require("../../Controllers/Auth/authController");
const uploadImage=require("../../Controllers/UploadImage/uploadImage")

const authRouter = express.Router();

authRouter.post("/signup",uploadImage.single("profilePic"), signup);
authRouter.post("/login", login);
authRouter.get("/userdetails", authenticateToken, getUserDetails);

module.exports = authRouter;