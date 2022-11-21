import { Router } from "express";
import {
  getLoginUser,
  getUsers,
  createUser,
  updateUser,
  deleteUserLocation,
} from "../controllers/users.controller.js";
import verifyToken from "./validate-token.routes.js";

const router = Router();

router.get("/users", getUsers);
router.post("/user-login", getLoginUser);
router.post("/user-register", createUser);
router.put("/update-user/:id", updateUser);
router.delete("/delete-location/:idlocation", deleteUserLocation);

export default router;
