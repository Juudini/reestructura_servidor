import { config } from "dotenv";

config();

// Set the server's port: use the value of PORT environment variable if defined, else default to 8080
export const PORT = process.env.PORT || 8080;

// Set the MongoDB URI: use the value of MONGODB_URI environment variable
export const MONGODB_URI = process.env.MONGODB_URI;

// JWT SECRET_KEY
export const SECRET_KEY = process.env.SECRET_KEY;
