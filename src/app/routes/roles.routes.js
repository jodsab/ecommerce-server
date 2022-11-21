import { Router } from "express";
import { getAllRoles } from "../controllers/roles.controller.js";

const router = Router();

router.get("/list-roles", getAllRoles);

export default router;