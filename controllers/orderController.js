import Order from "../models/Order.js";

const getAllOrders = async (request, response) => {
  try {
    const orders = await Order.find();
    response.status(200).json({
      status: "success",
      message: "successfully get all orders",
      data: orders,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed get all orders, something went wrong",
      data: null,
    });
  }
};

const getOrderIncomeForMonth = async (request, response) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(
    new Date().setMonth(lasthMonth.getMonth() - 1)
  );

  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      response.status(200).json({
        status: "success",
        message: "success get order income",
        data: income,
      }),
    ]);
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "error get income, something went wrong",
      data: null,
    });
  }
};

const getUserOrders = async (request, response) => {
  try {
    const order = await Order.find({
      userId: request.params.id,
    });
    response.status(200).json({
      status: "success",
      message: "successfully get user order",
      data: order,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed get user order, something went wrong",
      data: null,
    });
  }
};

const createOrder = async (request, response) => {
  const newOrder = new Order(request.body);

  try {
    const savedOrder = await newOrder.save();
    response.status(201).json({
      status: "success",
      message: "Order has benn successfully created",
      data: savedOrder,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed create order, something wen wrong",
      data: null,
    });
  }
};

const updateOrder = async (request, response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
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
      message: "Order has been successfully updated",
      data: updatedOrder,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed update order, something went wrong",
      data: null,
    });
  }
};

const deleteOrder = async (request, response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: "success",
      message: "Order has been successfully deleted",
      data: deletedOrder,
    });
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "faieled delete order, something went wrong",
      data: null,
    });
  }
};

export default {
  getAllOrders,
  getOrderIncomeForMonth,
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
