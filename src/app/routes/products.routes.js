import { Router } from "express";
import {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteImageOfProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import multer from "../../multer/multer.js";

const router = Router();

router.get("/products-list", getAllProducts);
router.post("/new-product", multer.array("url", 10), createNewProduct);
router.post("product/:idproduct/new-photo", multer.array("url", 10));
router.put(
  "/update-product/:idproduct",
  multer.array("url", 10),
  updateProduct
);
router.delete("/delete-product-image/:idproduct/:idimg", deleteImageOfProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
