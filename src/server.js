import app from "./app.js";
import { PORT } from "./config/index.js";
import { connectDB } from "./config/index.js";
import { Server as WebSocketServer } from "socket.io";
import sockets from "./sockets.js";

// Connect to the database
connectDB();

// Create an HTTP server using the "app" and listen on the specified port
const httpServer = app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}. 
    bat ${new Date().toLocaleString()}`.yellow
    );
});

// Create a WebSocket server instance using the "httpServer"
export const socket = new WebSocketServer(httpServer);

// Initialize WebSocket connections using the "sockets" module, from "sockets.js"
sockets(socket);
