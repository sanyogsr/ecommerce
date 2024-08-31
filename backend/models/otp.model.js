import  mongoose from "mongoose";
import { Schema } from "mongoose";



const otpSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

 const Otp = mongoose.model("Otp", otpSchema);
export default Otp
