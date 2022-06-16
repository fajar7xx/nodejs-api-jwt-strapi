import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import authController from "../controllers/authController.js";

const router = express.Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

// LOGOUT

export default router;
