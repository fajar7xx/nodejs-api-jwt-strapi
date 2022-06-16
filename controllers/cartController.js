import { response } from "express";
import Cart from "../models/Cart.js";

const getAllCarts = async (request, response) => {
  try {
    const cart = await Cart.find();
    response.status(200).json({
      status: "success",
      message: "cart has been successgully gotten",
      data: cart,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed get all user carts, something went wrong",
      data: null,
    });
  }
};

const getUserCart = async (request, response) => {
  try {
    const cart = Cart.findOne({
      userId: request.params.userId,
    });
    response.status(200).json({
      status: "success",
      message: "get user cart",
      data: cart,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed get user cart. something went wrong",
    });
  }
};

const createCart = async (request, response) => {
  const newCart = new Cart(request.body);

  try {
    const savedCart = await newCart.save();
    response.status(201).json({
      status: "success",
      message: "Cart successfully created",
      data: savedCart,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "Error save cart, something went wrong",
      data: null,
    });
  }
};

const updateCart = async (request, response) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      {
        new: true,
      }
    );
    response.status(200).json({
      status: "success",
      message: "Cart has been successfully updated",
      data: updatedCart,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "Error update cart, something went wrong",
      data: null,
    });
  }
};

const deleteCart = async (request, response) => {
  try {
    const deletedCart = await Product.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: "success",
      message: "Cart has been successfully deleted",
      data: deletedCart,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "Error delete cart, something went wrong",
      data: null,
    });
  }
};

export default {
  getAllCarts,
  getUserCart,
  createCart,
  updateCart,
  deleteCart,
};
