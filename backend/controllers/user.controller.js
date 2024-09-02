import User from "../models/user.model.js";

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id).toObject();
    delete result.password;
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error fetching Users,please try again",
    });
  }
};
export const updateUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).toObject();
    delete updated.password;
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error fetching Users,please try again",
    });
  }
};
