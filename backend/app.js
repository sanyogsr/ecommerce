import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import addressRoutes from "./routes/address.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import categoryRoutes from "./routes/category.route.js";
import brandRoutes from "./routes/brand.route.js";
import reviewRoutes from "./routes/review.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import orderRoutes from "./routes/order.route.js";
import cors from "cors";
import morgan from "morgan";
const app = express();
dotenv.config();

// database connection
connectDb();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());

// route middlewares
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/address", addressRoutes);
app.use("/reviews", reviewRoutes);
app.use("/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Running" });
});

app.listen("8000", () => {
  console.log(`Server Listening at 8000 `);
});
