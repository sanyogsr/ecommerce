import express from "express";
import {
  createWishlist,
  deleteWishlistById,
  getWishlistById,
  updateWishlistById,
} from "../controllers/wishlist.controller.js";
const router = express.Router();

router
  .post("/", createWishlist)
  .get("user/:id", getWishlistById)
  .patch("/:id", updateWishlistById)
  .delete("/:id", deleteWishlistById);

export default router;
