import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
