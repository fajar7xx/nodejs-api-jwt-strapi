import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const register = async (request, response) => {
  const newUser = new User({
    username: request.body.username,
    email: request.body.email,
    password: CryptoJS.AES.encrypt(
      request.body.password,
      process.env.APP_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    response.status(201).json({
      message: "User has been successfully registered",
      data: savedUser,
    });
  } catch (err) {
    console.error(err);
    return response.status(500).json(err);
  }
};

const login = async (request, response) => {
  try {
    const user = await User.findOne({
      username: request.body.username,
    });
    !user && response.status(401).json("Wrong credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.APP_SECRET
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== request.body.password &&
      response.status(401).json("Wrong credentials");

    //create json web token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password, ...loginUser } = user._doc;

    response.status(200).json({
      status: "success",
      message: "User has been successfully loged in",
      data: { ...loginUser, accessToken }, //untuk menyatukan variable lain dalam satu object
      token: accessToken,
    });
  } catch (err) {
    return response.status(500).json(err);
  }
};

export default {
  register,
  login,
};
