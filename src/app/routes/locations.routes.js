import { Router } from "express";
import { getLocationsByUser } from "../controllers/locations.controller.js";

const router = Router();

router.get("/my-location/:iduser", getLocationsByUser);

export default router;
