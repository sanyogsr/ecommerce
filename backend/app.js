import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import routes from "../backend/routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", routes);

connectDb();
app.listen("3000", () => {
  console.log(`Server Listening at 3000 `);
});
