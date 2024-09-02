import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
