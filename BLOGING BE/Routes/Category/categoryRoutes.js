const express = require("express");
const {
  addCategory,
  getAllCategory,
} = require("../../Controllers/Category/categoryControllers");

const categoryRouter = express.Router();

categoryRouter.post("/add-category", addCategory);
categoryRouter.get("/list",getAllCategory)

module.exports = categoryRouter;