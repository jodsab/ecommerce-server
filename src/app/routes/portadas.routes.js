import { Router } from "express";
import { getPortadasList } from "../controllers/portadas.controller.js";
import multer from "../../multer/multer.js";

const router = Router();

router.get("/portadas-list", getPortadasList);

export default router;
