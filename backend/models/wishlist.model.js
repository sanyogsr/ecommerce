import mongoose, { Schema } from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    note: {
      type: String,
    },
  },
  {
    timeseries: true,
    versionKey: false,
  }
); 

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
