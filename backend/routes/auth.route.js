import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  register,
  resendOtp,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

//user routes
router
  .post("/signup", register)
  .post("/login", login)
  .post("/resend-otp", resendOtp)
  .post("/verify-email", verifyEmail)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword)
  .get("/check-auth", verifyToken, checkAuth)
  .get("/logout", logout);

export default router;
