import express from "express";
import verify from "./verify.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/income", verifyTokenAndAdmin, orderController);

router.get("/", verify.verifyTokenAndAdmin, orderController.getAllOrders);

router.get(
  "/:id",
  verify.verifyTokenAndAuthorization,
  orderController.getUserOrders
);

router.post("/", verify.verifyToken, orderController.createOrder);

router.put("/:id", verify.verifyTokenAndAdmin, orderController.updateOrder);

router.delete("/:id", verify.verifyTokenAndAdmin, orderController.deleteOrder);

export default router;
