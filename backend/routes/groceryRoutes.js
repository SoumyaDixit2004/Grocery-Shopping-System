import express from "express";
import { addGrocery, getGroceries, updateGrocery, deleteGrocery } from "../controllers/groceryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getGroceries)
  .post(protect, addGrocery);

router.route("/:id")
  .put(protect, updateGrocery)
  .delete(protect, deleteGrocery);

export default router;

