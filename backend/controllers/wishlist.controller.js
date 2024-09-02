import Wishlist from "../models/wishlist.model.js";

export const createWishlist = async (req, res) => {
  try {
    const created = await new Wishlist(req.body).populate({
      path: "Product",
      populate: ["brand"],
    });
    await created.save();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error creating wishlist, please try again" });
  }
};

export const getWishlistById = async (req, res) => {
  try {
    const { id } = req.params;
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const result = await Wishlist.find({ user: id })
      .skip(skip)
      .limit(limit)
      .populate({ path: "product", populate: ["brand"] });
    const totalResults = await Wishlist.find({ user: id })
      .countDocuments()
      .exec();

    res.set("X-total-count", totalResults);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error fetching wishlist, please try again" });
  }
};

export const updateWishlistById = async (req, res) => {
  try {
    const { id } = req.params;
    const upadeted = await Wishlist.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");
    return res.status(200).json(upadeted);
  } catch (error) {
    console.error(error);
    returnres.status(500).json({
      msg: "Error updating Wishlist,please try again",
    });
  }
};
export const deleteWishlistById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Wishlist.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    returnres.status(500).json({
      msg: "Error updating Wishlist,please try again",
    });
  }
};
