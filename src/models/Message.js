import { Schema, model } from "mongoose";

// Define the message schema
export const MessageSchema = new Schema({
    user: String,
    message: String,
});

// Create the message model using "model" directly
export const messageModel = model("messages", MessageSchema);
