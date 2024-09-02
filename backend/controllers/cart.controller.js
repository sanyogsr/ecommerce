import Cart from "../models/cart.model.js";

export const createCart = async (req, res) => {
  try {
    const created = await new Cart(req.body).populate({
      path: "product",
      populate: { path: "brand" },
    });
    await created.save();
    return res.status(200).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error adding product to the cart" });
  }
};
export const getCartByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await new Cart.findById({ user: id }).populate({
      path: "product",
      populate: { path: "brand" },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error adding product to the cart" });
  }
};
export const updateCartByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await new Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: "product",
      populate: { path: "brand" },
    });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error adding product to the cart" });
  }
};
export const deleteCartByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    await new Cart.deleteMany({ user: id });
    return res.status(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error adding product to the cart" });
  }
};
export const deleteCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = new Cart.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error adding product to the cart" });
  }
};
