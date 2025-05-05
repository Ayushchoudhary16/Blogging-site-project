const Category = require("../../Models/Category");

const addCategory = async (req, res) => {
  try {
    const requestData = req.body;
    const categoryObj = new Category(requestData);
    const category = await categoryObj.save();
    return res.json({ data: category });
  } catch (err) {
    console.log("error", err);
    return res.json({ error: String(err) });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categoryDetails = await Category.find();

    return res.status(200).json({ data: categoryDetails });
  } catch (err) {
    return res.status(400).json({
      data: null,
      error: err,
      message: `Data is not found`,
    });
  }
};
module.exports = {
  addCategory,
  getAllCategory,
};