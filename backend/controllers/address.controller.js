import Address from "../models/address.model.js";

export const createAddress = async (req, res) => {
  try {
    const created = await new Address(req.body).save();
    return res.status(200).json(created);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error adding address, please try again " });
  }
};
export const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const getResults = await Address.findById({ user: id });
    if (!getResults) {
      return res.status(404).json({ msg: "Address not found" });
    }
    return res.status(200).json(getResults);
  } catch (err) {
    console.error(err); 
    return res
      .status(500)
      .json({ msg: "Error Fetching the address, please try again" });
  }
};
export const updateAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error updating the address, please try again" });       
  }
};
export const deleteAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Address.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "" });
  }
};
