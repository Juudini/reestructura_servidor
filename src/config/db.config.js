// Import the MongoDB URI from the .env file in config.js
import { MONGODB_URI } from "./index.js";
import { connect } from "mongoose";
import { ConnectToMongoDBError } from "../errors/errors.js";

const connectDB = async () => {
    try {
        await connect(MONGODB_URI);
        console.log("🔌", "DB connected".rainbow);
    } catch (error) {
        throw new ConnectToMongoDBError(
            "Failed to connect to MongoDB".red,
            error
        );
    }
};

export default connectDB;
