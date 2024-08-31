import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (payload, resetPassword = false) => {
//  console.log(process.env.LOGIN_TOKEN_EXPIRATION);   
 return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: resetPassword
      ? process.env.PASSWPRD_RESET_TOKEN_EXPIRATION
      : process.env.LOGIN_TOKEN_EXPIRATION,
  });
};
