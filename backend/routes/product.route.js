import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  unDeleteProductById,
  updateProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", getAllProducts)
  .get("/:id", getProductById)
  .get(":id", updateProductById)
  .get("/unDelete/:id", unDeleteProductById)
  .get("/:id", deleteProductById);

export default router;
