import ChatService from "./services/chat.service.js";
import CartService from "./services/cart.service.js";
const manager = new ChatService();

//Cart Service
const CM = new CartService();
// Export a function that handles WebSocket connections
export default (io) => {
    io.on("connection", (socket) => {
        console.log("👤 New connection: ", socket.id);
        /* ★━━━━━━━━━━━★ Products View ★━━━━━━━━━━━★ */
        // Manejar la creación de un nuevo carrito si no existe
        socket.on("notExistsCartId", async () => {
            const newCart = await CM.createCart();
            console.log("socket notExistsCartId", newCart);
            // Emitir el nuevo _id del carrito al cliente
            io.emit("sendCartId", newCart._id);
        });

        // Manejar la adición de un producto al carrito
        socket.on("addToCart", async ({ productId, cartId }) => {
            try {
                await CM.addProductToCart(cartId, productId);
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        });
    });

    // Chat LOGIC
    io.on("connection", async (socket) => {
        socket.on("newUser", async (data) => {
            // Handling User Connections
            const connectStatus = "has connected";
            const messages = await manager.message(data, connectStatus);

            io.emit("messageEmit", messages);

            socket.on("message", async (messageData) => {
                const messages = await manager.newMessage(data, messageData);

                io.emit("messageEmit", messages);
            });

            // Handling User Disconnections
            socket.on("disconnect", async () => {
                const connectStatus = "has disconnected";
                const messages = await manager.message(data, connectStatus);

                io.emit("messageEmit", messages);
            });
        });
        // Loading all of Messages
        const messages = await manager.getAllMessages();

        io.emit("messageEmit", messages);
    });
};
