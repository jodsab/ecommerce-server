import { Router } from "express";
import {
  getPortadasList,
  createNewPortada,
  deletePortadas,
} from "../controllers/portadas.controller.js";
import multer from "../../multer/multer.js";

const router = Router();

router.get("/portadas-list", getPortadasList);
router.post("/new-portada", multer.array("url", 10), createNewPortada);
router.delete("/delete-portada/:idimg", deletePortadas);

export default router;
