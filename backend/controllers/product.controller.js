import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const created = new Product(req.body);
    await created.save();
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error adding product, please trying again later" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.brand) {
      filter.brand = { $in: req.query.brand };
    }
    if (req.query.category) {
      filter.category = { $in: req.query.category };
    }
    if (req.query.user) {
      filter["isDeleted"] = false;
    }

    if (req.query.sort) {
      sort[req.query.sort] = req.query.order
        ? req.query.order === "asc"
          ? 1
          : -1
        : 1;
    }

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Product.find(filter)
      .sort(sort)
      .populate("brand")
      .countDocuments()
      .exec();

    const results = await Product.find(filter)
      .sort(sort)
      .populate("brand")
      .skip(skip)
      .limit(limit)
      .exec();

    res.set("X-Total-Count", totalDocs);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Errpr fetching the products,please try again" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id)
      .populate("brand")
      .populate("category");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error updatinng products, please try again" });
  }
};
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error updatinng products, please try again" });
  }
};
export const unDeleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const unDeleted = await Product.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );
    res.status(200).json(unDeleted);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error updatinng products, please try again" });
  }
};
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error updatinng products, please try again" });
  }
};
