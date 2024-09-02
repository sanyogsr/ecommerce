import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const created = new Order(req.body);
    await created.save();
    return res.status(200).json(created);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error creating order,please try again" });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Order.findById({ user: id });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error fetching order,please try again" });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totslResults = await Order.find({}).countDocuments().exec();
    const results = await Order.find({}).skip(skip).limit(limit).exec();

    res.set("X-total-count", totslResults);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error Fetching orders,please try again" });
  }
};

export const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error updating order,please try again" });
  }
};
