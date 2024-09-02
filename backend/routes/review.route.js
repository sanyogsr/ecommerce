import express from "express";
import {
  createReview,
  deleteReviewById,
  getReviewByProductId,
  updateReviewById,
} from "../controllers/review.controller.js";
const router = express.Router();

router
  .post("/", createReview)
  .get("/product/:id", getReviewByProductId)
  .patch("/:id", updateReviewById)
  .delete("/:id", deleteReviewById);

export default router;
