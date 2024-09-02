import express from "express";
import {
  createAddress,
  deleteAddressById,
  getAddressById,
  updateAddressById,
} from "../controllers/address.controller.js";

const router = express.Router();

router
  .post("/", createAddress)
  .get("/user/:id", getAddressById)
  .patch("/:id", updateAddressById)
  .delete("/:id", deleteAddressById);

export default router;
