import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderById,
} from "../controllers/order.controller.js";
const router = express.Router();

router
  .post("/", createOrder)
  .get("/user/:id", getOrderById)
  .get("/", getAllOrder)
  .patch("/:id", updateOrderById);

export default router;
