import Category from "../models/category.model.js";

export const getAllCategory = async (req, res) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching category, please try again" });
  }
};
