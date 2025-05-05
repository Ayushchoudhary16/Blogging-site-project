const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../Models/User");
const Blog = require("../../Models/Blog")

const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, "apitoken", { expiresIn: "24h" });

  return token;
};

//Middle Ware or verify the token

const authenticateToken = async (req, res, next) => {
  // to verify the token
  const authHeader = req.headers["authorization"];
  console.log("authHeader", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, "apitoken", (err, user) => {
        if (err) {
          return res
            .status(401)
            .json({ data: null, error: { message: "Unathorized User" } });
        }

        req.user = user;
        if (user) {
          next();
        }
      });
    } else {
      return res
        .status(401)
        .json({ data: null, error: { message: "Please pass correct Token" } });
    }
  } else {
    return res
      .status(401)
      .json({ data: null, error: { message: "Please pass user Token" } });
  }
};



// signup API

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    console.log("user", user);
    if (user) {
      return res.status(400).json({ data: null, error:{message:"This user name is already exists"} });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({ ...req.body, password: hashPassword,
        profilePic:`/uploads/${req.file.filename}`,
       });
      await user.save();
      
      const token = generateToken(user);
      return res.status(201).json({ data: user, token: token });
    }
  } catch (err) {
    return res.status(400).json({ data: null, error: err });
  }
};

//login API

const login= async (req,res)=>{
    try{
      const {username,password}=req.body;
      const user = await User.findOne({username : username});
      if(!user){
        return res.json({data:null,error: {message:"This username is not exists."} })
      }else{
        const isValidPassword= await bcrypt.compare(password,user.password);
        if(isValidPassword){
          token=generateToken(user);
          return res.status(200).json({ data: user, token: token });
        }
        return res.status(400).json({ data: null,error: {message:"password is incorrect"}});

      }
    }catch(err){
      return res.status(400).json({ data: null, error: err });  
    }
}
// user details api

const getUserDetails = async (req, res) => {
  const userId = req.user.userId;
  try {
    const userDetails = await User.findOne({ _id: userId });
    const userBlogs = await Blog.find({ user: userId }).populate("category totalLikes totalComments");
    return res.json({
      data: {
        user: userDetails,
        blogs: userBlogs,
      },
    });
  } catch (err) {
    return res.json({
      data: null,
      error: err,
      message: `User is not present with this id ${userId}`,
    });
  }
};






module.exports = { signup,login,authenticateToken,getUserDetails, };
