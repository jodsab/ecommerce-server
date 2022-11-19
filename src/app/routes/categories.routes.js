import { Router } from "express";
import {
  createNewCategorie,
  getAllCategories,
  updateCategorie,
  deleteCategorie,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/list-categories", getAllCategories);
router.post("/new-categorie", createNewCategorie);
router.put("/update-categorie/:id", updateCategorie);
router.delete("/delete-categorie/:id", deleteCategorie);

export default router;
