import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    console.log(req.body);
    const created = await new Review(req.body).populate({
      path: "user",
      select: "-password",
    });

    await created.save();
    return res.status(200).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error posting rating, please try again" });
  }
};

export const getReviewByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const page = req.query.page;
      const pageSize = req.query.limit;

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Review.find({ product: id })
      .countDocuments()
      .exec();
    const result = await Review.find({ product: id })
      .skip(skip)
      .limit(limit)
      .populate("user")
      .exec();

    res.set("X-total-count", totalDocs);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error getting reviews,please try again",
    });
  }
};

export const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const upadeted = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user");
    return res.status(200).json(upadeted);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error updating reviews,please tr again" });
  }
};
export const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error updating reviews,please tr again" });
  }
};
