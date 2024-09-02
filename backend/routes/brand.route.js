import express from "express";
import { getAllBrand } from "../controllers/brand.controller.js";

const router = express.Router();

router.post("/", getAllBrand);

export default router;
