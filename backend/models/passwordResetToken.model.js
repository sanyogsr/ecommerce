import mongoose, { Schema } from "mongoose";

const passwordResetSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetSchema
);
export default PasswordResetToken;
