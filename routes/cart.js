import express from "express";
import verify from "./verify.js";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.get("/", verify.verifyTokenAndAdmin, cartController.getAllCarts);

router.get(
  "/:userId",
  verify.verifyTokenAndAuthorization,
  cartController.getUserCart
);

router.post("/", verify.verifyToken, cartController.createCart);

router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);

router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);

export default router;
