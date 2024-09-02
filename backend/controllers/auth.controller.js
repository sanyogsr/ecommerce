import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sanitizeUser } from "../utils/SanitizeUser.js";
import { generateToken } from "../utils/GenerateToken.js";
import Otp from "../models/otp.model.js";
import GenerateOtp from "../utils/GenerateOtp.js";
import sendMail from "../utils/Email.js";
import PasswordResetToken from "../models/passwordResetToken.model.js";

// register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // checking if all fields have value
    if (!(name || email || password || confirmPassword)) {
      return res
        .status(404)
        .json({ status: "failed", msg: "All Fields are required" });
    }
    //    checking if password and confirm password matches or not
    console.log(confirmPassword);
    console.log(password);
    if (password != confirmPassword) {
      return res.status(401).json({
        status: "failed",
        msg: "Password and Confirm Password doesn't match",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        status: "failed",
        msg: "Email already exist! Please try to Login",
      });
    }

    const genSalt = await bcrypt.genSalt(Number(10));
    const hashPassword = await bcrypt.hash(password, genSalt);

    const newUser = await User({
      name: name,
      email: email,
      password: hashPassword,
    }).save();

    const secureInfo = sanitizeUser(newUser);
    const token = generateToken(secureInfo);
    // console.log(token);

    res.cookie("token", token, {
      sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
      maxAge: new Date(
        Date.now() +
          parseInt(
            process.env.COOKIE_EXPIRATION_DAYS || 1 * 24 * 60 * 60 * 1000
          )
      ),
      secure: process.env.PRODUCTION === "true" ? true : false,
      httpOnly: true,
    });

    return res.status(200).json({
      msg: "User created successfully",
      user: sanitizeUser(newUser),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "failed", msg: "Please try Again" });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res
        .status(400)
        .json({ status: "failed", msg: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      const secureInfo = sanitizeUser(user);

      const token = generateToken(secureInfo);

      res.cookie("token", token, {
        sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
        maxAge: new Date(
          Date.now() +
            parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true,
        secure: process.env.PRODUCTION === "true" ? true : false,
      });

      return res
        .status(200)
        .json({ msg: "Login successfully", loggedInUser: secureInfo });
    }

    res.clearCookie("token");
    return res.status(404).json({ msg: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "failed", msg: "Please try Again" });
  }
};

// Check Auth controller
export const checkAuth = async (req, res) => {
  try {
    const id = req.user._id;
    if (id) {
      const user = await User.findById(id);
      if (user) {
        res.status(200).json(sanitizeUser(user));
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    res.cookie("token", {
      maxAge: 0,
      sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
      httpOnly: true,
      secure: process.env.PRODUCTION === "true" ? true : false,
    });
    res.status(200).json({ msg: "Logout Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal error Occur", error: err });
  }
};

// resend otp Controller
export const resendOtp = async (req, res) => {
  try {
    const existingUser = await User.findById(req.body.user);
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    await Otp.deleteMany({ user: existingUser._id });

    const otp = GenerateOtp();
    const hashOtp = await bcrypt.hash(otp, 10);

    const newOtp = await new Otp({
      user: req.body.user,
      otp: hashOtp,
      expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME),
    }).save();

    // await newOtp.save();
    console.log("start sending email");

    await sendMail(
      existingUser.email,
      `OTP Verification for Your JumboPlace Account`,
      `Your One-Time Password (OTP) for account verification is: <b>${otp}</b>.</br>Do not share this OTP with anyone for security reasons`
    );
    res.status(201).json({ msg: "Otp sent", otp: newOtp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Error Occured! Please Try Again" });
  }
};

// email verify controller
export const verifyEmail = async (req, res) => {
  try {
    const isValidatedUser = await User.findById(req.body.userId);
    if (!isValidatedUser) {
      return res
        .status(404)
        .json({ msg: "User not found, for which the otp has been generated" });
    }

    const isOtpExisting = await Otp.findOne({ user: isValidatedUser._id });
    if (!isOtpExisting) {
      return res.status(404).json({ msg: "Otp not found" });
    }
    console.log(JSON.stringify(isOtpExisting.otp));
    if (isOtpExisting.expiresAt < new Date()) {
      await Otp.findByIdAndDelete(isOtpExisting._id);
      return res.status(400).json({
        msg: "Otp has been expired",
      });
    }

    if (
      isOtpExisting &&
      (await bcrypt.compare(req.body.otp, isOtpExisting.otp))
    ) {
      await Otp.findByIdAndDelete(isOtpExisting._id);
      const verifiedUser = await User.findByIdAndUpdate(
        isValidatedUser._id,
        { isVerified: true },
        { new: true }
      );
      return res.status(200).json(sanitizeUser(verifiedUser));
    }

    return res.status(400).json({ msg: "Otp is Invalid or Expired" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Internal error occur!Please try again",
    });
  }
};

// forgot password controller
export const forgotPassword = async (req, res) => {
  let newToken;
  try {
    const isExistingUser = await User.findOne({ email: req.body.email });

    if (!isExistingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    await PasswordResetToken.deleteMany({ user: isExistingUser._id });

    const passwordResetToken = generateToken(
      sanitizeUser(isExistingUser),
      true
    );

    const hashedToken = await bcrypt.hash(passwordResetToken, 10);

    newToken = await new PasswordResetToken({
      user: isExistingUser._id,
      token: hashedToken,
      expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME),
    }).save();

    await sendMail(
      isExistingUser.email,
      "Password Reset Link for Your JumboPlace Account",
      `<p>Dear ${isExistingUser.name},

        We received a request to reset the password for your JumboPlace account. If you initiated this request, please use the following link to reset your password:</p>
        
        <p><a href=${process.env.ORIGIN}/reset-password/${isExistingUser._id}/${passwordResetToken} target="_blank">Reset Password</a></p>
        
        <p>This link is valid for a limited time. If you did not request a password reset, please ignore this email. Your account security is important to us.
        
        Thank you,
        The MERN-AUTH-REDUX-TOOLKIT Team</p>`
    );

    res
      .status(200)
      .json({ msg: `Password link sent to email : ${isExistingUser.email}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal error occured! Please try again" });
  }
};

// reset password controller
export const resetPassword = async (req, res) => {
  try {
    // check if user exist
    const isExistingUser = await User.findById(req.body.userId);
    if (!isExistingUser) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }
    // checking if an reset token exist for user
    const isResetTokenExist = await PasswordResetToken.findOne({
      user: isExistingUser._id,
    });

    if (!isResetTokenExist) {
      return res.status(404).json({ msg: "Reset password link is not valid" });
    }

    // exists and if its expire time is less than the current time then reset link has been already expired
    if (isResetTokenExist.expiresAt < new Date()) {
      await PasswordResetToken.findByIdAndDelete(isResetTokenExist._id);
      return res.status(404).json({ msg: "reset link has been expired" });
    }
    //  if the expire time greater than current then it means user have time to reset password
    if (
      isResetTokenExist.expiresAt > new Date() &&
      (await bcrypt.compare(req.body.token, isResetTokenExist.token))
    ) {
      await PasswordResetToken.findByIdAndDelete(isResetTokenExist._id);
      await User.findByIdAndUpdate(isExistingUser._id, {
        password: await bcrypt.hash(req.body.password, 10),
      });
      return res.status(200).json({
        msg: "Password updated Successfully",
      });
    }
    return res
      .status(404)
      .json({ msg: "Reset Password link has been expired" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal error occured! Please try again" });
  }
};
