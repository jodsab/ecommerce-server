import { Router } from "express";
import { getLocationsByUser } from "../controllers/locations.controller.js";

const router = Router();

router.get("/update-user-data/:iduser", getLocationsByUser);

export default router;
