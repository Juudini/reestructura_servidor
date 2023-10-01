import { Schema, model } from "mongoose";

// Define the cart schema
const CartSchema = new Schema({
    products: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: Number,
        },
    ],
});

// Create the cart model using "model" directly
export const cartModel = model("carts", CartSchema);
