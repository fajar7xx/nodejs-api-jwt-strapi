import Product from "../models/Product.js";

const getAllProducts = async (request, response) => {
  const queryNew = request.query.new;
  const queryCategory = request.query.category;

  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    response.status(200).json({
      status: "success",
      message: "get all products",
      data: products,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "Something went wrong, cannot get all products",
      data: null,
    });
  }
};

const getProduct = async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);
    response.status(200).json({
      status: "success",
      message: "Get product detail",
      data: product,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed, cannot get product",
      data: null,
    });
  }
};

const createProduct = async (request, response) => {
  const newProduct = new Product(request.body);

  try {
    const savedProduct = await newProduct.save();
    response.status(201).json({
      status: "success",
      message: "product has been successfully created",
      data: savedProduct,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: err,
      data: null,
    });
  }
};

const updateProduct = async (request, response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );

    response.status(200).json({
      status: "success",
      message: "Product has been successfully updated",
      data: updatedProduct,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: err,
      data: null,
    });
  }
};

const deleteProduct = async (request, response) => {
  try {
    await Product.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: "success",
      message: "Product has been deleted",
      data: null,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed. something went wrong",
      data: null,
    });
  }
};

export default {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
