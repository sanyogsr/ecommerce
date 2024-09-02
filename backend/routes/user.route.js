import express from "express";
import {
  getUsersById,
  updateUsersById,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/:id", getUsersById).patch("/:id", updateUsersById);

export default router;
