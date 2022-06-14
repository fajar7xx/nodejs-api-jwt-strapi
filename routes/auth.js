import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import authController from "../controllers/authController.js";

const router = express.Router();

// REGISTER
router.post("/register", authController.register);
// router.post("/register", async (request, response) => {
//   const newUser = new User({
//     username: request.body.username,
//     email: request.body.email,
//     password: CryptoJS.AES.encrypt(
//       request.body.password,
//       process.env.APP_SECRET
//     ).toString(),
//   });

//   try {
//     const savedUser = await newUser.save();
//     console.log(savedUser);
//     response.status(201).json(savedUser);
//   } catch (err) {
//     console.error(err);
//     response.status(500).json(err);
//   }
// });

// LOGIN
router.post("/login", authController.login);

// LOGOUT

export default router;
