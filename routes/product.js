import express from "express";
import verify from "./verify.js";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProduct);

router.post("/", verify.verifyTokenAndAdmin, productController.createProduct);

router.put("/:id", verify.verifyTokenAndAdmin, productController.updateProduct);

router.delete(
  "/:id",
  verify.verifyTokenAndAdmin,
  productController.deleteProduct
);

export default router;
