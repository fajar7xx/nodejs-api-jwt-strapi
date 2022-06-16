import express from "express";
import verify from "./verify.js";
// import User from "../models/User.js";
// import CryptoJS from "crypto-js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", verify.verifyTokenAndAdmin, userController.getAllUsers);

router.get("/stats", verify.verifyTokenAndAdmin, userController.userStats);

router.get("/:id", verify.verifyTokenAndAdmin, userController.getUser);

router.put("/:id", verify.verifyToken, userController.updateUser);

router.delete(
  "/:id",
  verify.verifyTokenAndAuthorization,
  userController.deleteUser
);

export default router;
