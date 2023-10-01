import { Schema, model } from "mongoose";

// Define the user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "carts",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

// Create the user model using "model" directly
export const userModel = model("users", UserSchema);
