import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define the product schema
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: false,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: [String],
        default: [""],
        required: false,
    },
});

ProductSchema.plugin(mongoosePaginate);

// Create the product model using "model" directly
export const productModel = model("products", ProductSchema);
