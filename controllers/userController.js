import User from "../models/User.js";
import CryptoJS from "crypto-js";

const getAllUsers = async (request, response) => {
  try {
    const query = request.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    response.status(200).json({
      status: "success",
      message: "Get all users",
      data: users,
    });
  } catch (err) {
    response.status(500).json({
      status: "failed",
      message: err,
      data: null,
    });
  }
};

const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    // console.log(user);
    const { password, ...others } = user._doc;

    response.status(200).json({
      status: "success",
      message: "User has been  founded",
      data: others,
    });
  } catch (err) {
    response.status(500).json({
      status: "failed",
      message: "something went wrong",
      data: null,
    });
  }
};

const userStats = async (request, response) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear,
          },
        },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    response.status(200).json({
      status: "success",
      message: "get all user status",
      data,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: err,
      data: null,
    });
  }
};

const updateUser = async (request, response) => {
  if (request.body.password) {
    request.body.password = CryptoJS.AES.encrypt(
      request.body.password,
      process.env.APP_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );

    response.status(200).json({
      status: "success",
      message: "User has been successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    response.status(500).json({
      status: "failed",
      message: err,
      data: null,
    });
  }
};

const deleteUser = async (request, response) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    reponse.status(200).json({
      status: "success",
      message: "User has been successfully deleted",
      data: null,
    });
  } catch (err) {
    response.status(500).json({
      status: "failed",
      message: err,
      data: null,
    });
  }
};

export default {
  getAllUsers,
  getUser,
  userStats,
  updateUser,
  deleteUser,
};
