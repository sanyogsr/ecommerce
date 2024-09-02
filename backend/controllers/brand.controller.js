import Brand from "../models/brand.model.js";

export const getAllBrand = async (req, res) => {
  try {
    const getResult = await Brand.find({});
    return res.status(400).json(getResult);
  } catch (error) {
    console.error(error);
  }
};
